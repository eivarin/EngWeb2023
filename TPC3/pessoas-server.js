var http = require('http');
var meta = require('./aux');
var url = require('url');
var fs = require('fs');
const axios = require("axios")
var mypages = require('./mypages')

function parseQuery(query, dataset) {
    console.log(query)
    if(query.field !== undefined) {
        dataset = dataset.filter(f => f[query.field] === query.value)
    }
    return dataset
}

function makeDistr(field, dataset) {
    var result = {};
    dataset.forEach(element => {
        value = element[field]
        if (result[value]) result[value]++;
        else result[value] = 1;
    });
    return result;
}

function makeTop(field, dataset) {
    var distr = makeDistr(field, dataset);
    var items = Object.keys(distr).map((key) => { return [key, distr[key]] });
    items.sort((first, second) => { return first[1] - second[1] });
    items.reverse();
    var keys = items.map((e) => { return e[0] });
    return keys.slice(0,10);
}

var mySrv = http.createServer(function (req, res) {
    meta.logger(req);
    var pedido = url.parse(req.url, true)
    if (pedido.pathname == "/"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(mypages.genHomePage(meta.myDateTime()));
        res.end();
    }
    else if (/\/style.css$/.test(pedido.pathname)) {
        fs.readFile("./public/style.css", function(err,data) {
            res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
            if(err){
                res.write("ERRO: Na leitura do ficheiro ::" + err);
            }
            else{
                res.write(data);
            }
            res.end();
        })
    }
    else if (pedido.pathname == "/pessoas") {
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp) {
                var pessoas = resp.data;
                pessoas = parseQuery(pedido.query, pessoas);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(mypages.genListPage(pessoas, meta.myDateTime()));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>$Erro na operacao de dados: ${erro}</p>`);
                console.log(`ERRO: ${erro}`);z
            })
    }
    else if (pedido.pathname == "/pessoasOrdenadas"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp) {
                var pessoas = resp.data;
                pessoas = parseQuery(pedido.query, pessoas);
                pessoas.sort(function (a,b) {
                    if (a.nome > b.nome) {
                        return 1;
                    }
                    if (a.nome < b.nome) {
                        return -1;
                    }
                    return 0;
                })
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(mypages.genListPage(pessoas, meta.myDateTime()));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>$Erro na operacao de dados: ${erro}</p>`);
                console.log(`ERRO: ${erro}`);z
            })
    }
    else if (p = pedido.pathname.match(/\/pessoas\/p(\d+)/)){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp) {
                var pessoas = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(mypages.genPessoaPage(pessoas[parseInt(p[1])], meta.myDateTime()));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>$Erro na operacao de dados: ${erro}</p>`);
                console.log(`ERRO: ${erro}`);
            })
    }
    else if (p = pedido.pathname.match(/\/distr\/(\w+)/)){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp) {
                console.log("aaa")
                var pessoas = resp.data;
                var field = p[1];
                var distributions = makeDistr(field, pessoas);
                console.log(distributions);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(mypages.genDistrPage(distributions, pessoas.length, field, meta.myDateTime()));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>$Erro na operacao de dados: ${erro}</p>`);
                console.log(`ERRO: ${erro}`);
            })
    }
    else if (p = pedido.pathname.match(/\/top\/(\w+)/)){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp) {
                var pessoas = resp.data;
                var field = p[1];
                var top = makeTop(field, pessoas);
                console.log(top);
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(mypages.genTopPage(top, field, meta.myDateTime()));
                res.end();
            })
            .catch(erro => {
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<p>$Erro na operacao de dados: ${erro}</p>`);
                console.log(`ERRO: ${erro}`);
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<p>Operacao nao suportada:GET ${pedido.pathname}</p>`);
    }
}).listen(7777);

console.log("Servidor a oubire");