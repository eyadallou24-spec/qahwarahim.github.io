const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let p=req.url.split('?')[0];
  if(p==='/') p='/index.html';
  let fp=path.join(root,p);
  fs.readFile(fp,(e,d)=>{
    if(e){ res.writeHead(404,{'Content-Type':'text/html'}); res.end('404'); return; }
    let ext=path.extname(fp);
    res.writeHead(200,{'Content-Type':mime[ext]||'text/plain'});
    res.end(d);
  });
}).listen(3000,()=>console.log('Serving on http://localhost:3000'));
