import { createServer } from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const port = Number(process.env.PORT || 3117);
const types = {
  ".pdf": "application/pdf",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};
const headers = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
};
createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = resolve(file, "index.html");
  const found = existsSync(file);
  if (!found) file = resolve(root, "404.html");
  try {
    res.writeHead(found ? 200 : 404, {
      ...headers,
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(500);
    res.end("Build the site first.");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}`),
);
