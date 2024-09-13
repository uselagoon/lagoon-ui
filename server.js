import express from 'express';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const port = dev ? 3003 : 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/favicon.ico', (req, res) =>
    res.status(200).sendFile('favicon.ico', {
      root: process.cwd() + '/src/app/',
    })
  );

  server.get('/:projectSlug/:envSlug', (req, res) => {

    const { projectSlug, envSlug } = req.params;
    
    // Combine URL parameters and query parameters
    const queryParams = {
      first: projectSlug,
      second: envSlug,
      ...req.query 
    };

    app.render(req, res, "/", queryParams );
  });

  // Default handler for all other routes
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(
      `> Ready on http://localhost:${port} - ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    );
  });
});