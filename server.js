import fs from 'node:fs/promises'
import express from 'express'
import http from 'http'

import { WebSocketServer } from 'ws';

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server

const app = express()

const server = http.createServer(app);
// Websocket server

const wss = new WebSocketServer({ server,  path: '/ws_recall' });


// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML *all
app.use('*all', async (req, res) => {
  console.log('app.use called')
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.js').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})


wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      // Handle ping messages separately
      // Forward the audio data to OpenAI Realtime API
      // Implement your logic to interact with OpenAI here
      if (message.toString() === 'ping') {
        console.log('Ping received')
        ws.send('pong');
        return;
      }

      const data = JSON.parse(message);
      console.log('Received:', data);

      // Echo the message back to client
      ws.send(JSON.stringify({
        type: 'response',
        data: data
      }));

    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Failed to process message'
      }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

import open from 'open'

// Start http server
// app.listen(port, () => {
//   var url = `http://localhost:${port}`
//   console.log(`Server started at ${url}`)
//   console.log(`WebSocket server started at ${url}/ws_recall`)
//   open(url)
// })

// Start http server (instead of app.listen) IMPORTANT: this is the only way to get the websocket server to work
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})