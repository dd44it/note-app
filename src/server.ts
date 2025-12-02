import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import fs from "fs";
import path from "path";

import express from 'express';
import { join } from 'node:path';

const app = express();
const angularApp = new AngularNodeAppEngine();
import 'dotenv/config';

const browserDistFolder = join(import.meta.dirname, '../browser');

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);
app.get('/api/public-notes', (req, res) => {
  const filePath = path.join(process.cwd(), 'dist/note-app/browser/assets/notes.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
})
  .get('/api/public-notes/:id', (req, res) => {
  const id = Number(req.params.id);

  const notes = [
    { id: 1, title: 'Angular SSR Rocks', content: 'Server-side rendering demo...', public: true },
    { id: 2, title: 'Why SSR matters', content: 'SEO, performance, caching hhhh...', public: true }
  ];

  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.json(note);
})
.get('/api/random-images', async (req, res) => {
  try {
    const count = Number(req.query['count'] ?? 8);

    const accessKey = process.env['UNSPLASH_ACCESS_KEY'];

    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          'Accept-Version': 'v1',
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('Unsplash error:', text);
      return res.status(500).json({ error: 'Unsplash failed', details: text });  // <– RETURN ✔
    }

    const data = await response.json();

    const images = data.map((img: any) => ({
      id: img.id,
      url: img.urls.regular,
      author: img.user?.name,
      link: img.links?.html,
    }));

    return res.json(images);
  } catch (err) {
    console.error('Unsplash API failed:', err);
    return res.status(500).json({ error: 'Failed to load images' }); // <– RETURN ✔
  }
});

app.use((req, res) => {
  angularApp.handle(req)
    .then(response => {
      if (!response) {
        res.status(404).send('Not found');
        return;
      }

      writeResponseToNodeResponse(response, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () =>
    console.log(`SSR server running on http://localhost:${port}`)
  );
}

export const reqHandler = createNodeRequestHandler(app);
