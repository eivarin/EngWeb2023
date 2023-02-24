var http = require('http');
var meta = require('./aux');
var url = require('url');
var fs = require('fs');

var mySrv = http.createServer(function (req, res) {
    meta.logger(req);
    var pedido = url.parse(req.url, true).pathname
    var fileName = (pedido == "/") ? "index.html" : `${pedido.substring(1)}.html`;
    fs.readFile(`pages/${fileName}`, function(err,data) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        if(err){
            res.write("ERRO: Na leitura do ficheiro ::" + err);
        }
        else{
            res.write(data);
        }
        res.end();
    })
}).listen(7777);

console.log("Servidor a oubire");