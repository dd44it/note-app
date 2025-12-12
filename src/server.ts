import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import fs from 'node:fs/promises';
import path from 'node:path';

import express from 'express';
import type { Request, Response } from 'express';

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
app
  .get('/api/public-notes',  async (req: Request, res: Response) => {
    const filePath = path.join(
      process.cwd(),
      'dist',
      'note-app',
      'browser',
      'assets',
      'notes.json'
    );
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);
    res.json(data);
})
app.get('/api/public-notes/:id', async (req: Request, res: Response) => {
  const id = Number(req.params['id']);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid note id' });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'dist',
      'note-app',
      'browser',
      'assets',
      'notes.json'
    );

    const raw = await fs.readFile(filePath, 'utf-8');
    const notes: Array<{ id: number }> = JSON.parse(raw);

    const note = notes.find(n => n.id === id);

    if (!note) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.json(note);
  } catch (error) {
    console.error('Failed to load notes', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
.get('/api/random-images', async (req: Request, res: Response) => {
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

app.use((req: Request, res: Response) => {
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
