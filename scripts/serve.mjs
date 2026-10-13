import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpeg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const requestedPath = decodeURIComponent(url.pathname);
    const relative = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\/+/, '');
    const allowed = ['index.html', 'styles.css', 'app.js'].includes(relative) || relative.startsWith('assets/');
    const file = path.resolve(root, relative);
    if (!allowed || !file.startsWith(root) || !(await stat(file)).isFile()) {
      response.writeHead(404); response.end('No encontrado'); return;
    }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404); response.end('No encontrado');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
