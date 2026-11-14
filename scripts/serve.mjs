import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
  ".txt": "text/plain",
};

http
  .createServer(async (req, res) => {
    try {
      if (req.method !== "GET" && req.method !== "HEAD") {
        res.writeHead(405);
        res.end();
        return;
      }
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = path.resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      let info = await stat(file).catch(() => null);
      if (info?.isDirectory()) {
        file = path.join(file, "index.html");
        info = await stat(file).catch(() => null);
      }
      if (!info?.isFile()) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        createReadStream(path.join(root, "404.html")).pipe(res);
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Content-Length": info.size,
        "Cache-Control": pathname.startsWith("/_next/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      });
      if (req.method === "HEAD") res.end();
      else createReadStream(file).pipe(res);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
    }
  })
  .listen(port, "0.0.0.0", () =>
    console.log(`AFTER HOURS — http://localhost:${port}`),
  );
