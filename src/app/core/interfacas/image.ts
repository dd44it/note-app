export interface UnsplashImageApi {
  id: string;
  urls: {
    regular: string;
  };
  user?: {
    name?: string;
  };
  links?: {
    html?: string;
  };
}

export interface InspirationImage {
  id: string;
  url: string;
  author?: string;
  link?: string;
}
