import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain'};
http.createServer((req,res)=>{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end();return}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');fs.createReadStream(file).pipe(res)}).listen(5173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:5173'));
