exports.genHomePage = function(date) {
    var page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" href="style.css">
                    <title>About People...</title>
                </head>
                <body>
                    <div class="w3-card-4">

                        <header class="w3-container w3-orange">
                            <h1>EngWeb-TPC3</h1>
                        </header>
                        <ul class="w3-ul w3-border w3-xlarge">
                            <li style="padding:0">
                                <a class="w3-button w3-block w3-padding-16" href="/pessoas">Lista de pessoas</a>
                            </li>
                            <li style="padding:0">
                                <a class="w3-button w3-block w3-padding-16" href="/pessoasOrdenadas">Lista de pessoas ordenadas</a>
                            </li>
                            <li style="padding:0">
                                <a class="w3-button w3-block w3-padding-16" href="/distr/sexo">Distribuicoes por sexo</a>
                            </li>
                            <li style="padding:0">
                                <a class="w3-button w3-block w3-padding-16" href="/distr/desporto">Distribuicoes por desporto</a>
                            </li>
                            <li style="padding:0">
                                <a class="w3-button w3-block w3-padding-16" href="/top/profissao">Top 10 profissoes</a>
                            </li>
                        </ul>
                        <footer class="w3-container w3-orange">
                            <address>Generated in EngWeb2023 ${date}</address>
                        </footer>
                    </div>
                </body>
                </html>                       
            `
    return page
}

exports.genListPage = function(pessoas, date) {
    var page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" href="style.css">
                    <title>About People...</title>
                </head>
                <body>
                    <div class="w3-card-4">

                        <header class="w3-container w3-orange">
                            <h1>
                            <a class="w3-button w3-indigo" href="/">Home</a>
                            Lista de pessoas
                            </h1>
                        </header>

                        <div class="w3-container">
                            <table class="w3-table-all w3-centered">
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Sexo</th>
                                    <th>Cidade</th>
                                </tr>
                        `
    pessoas.forEach(p => {
        if (p.morada == undefined) p.morada = {'cidade': "Undefined"}
        page += `
                                <tr>
                                    <td>${p.id}</td>
                                    <td>
                                        <a href="/pessoas/${p.id}">${p.nome}</a>
                                    </td>
                                    <td>${p.idade}</td>
                                    <td>${p.sexo}</td>
                                    <td>${p.morada.cidade}</td>
                                </tr>
        `
    });
    page += `
                            </table>
                        </div>
                        
                        <footer class="w3-container w3-orange">
                            <address>Generated in EngWeb2023 ${date}</address>
                        </footer>
                    </div>
                </body>
                </html>
                `
    return page
}


exports.genPessoaPage = function(pessoa, date) {
    var page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" href="style.css">
                    <title>Person page</title>
                </head>
                <body>
                    <div class="w3-card-4">

                        <header class="w3-container w3-orange">
                            <h1>
                            <a class="w3-button w3-indigo" href="/">Home</a>
                            ${pessoa.nome}</h1>
                        </header>

                        <div class="w3-container">
                        ${JSON.stringify(pessoa)}
                            
                        `
    page += `
                        </div>
                        
                        <footer class="w3-container w3-orange">
                            <address>Generated in EngWeb2023 ${date}</address>
                        </footer>
                    </div>
                </body>
                </html>
                `
    return page
}

exports.genDistrPage = function(distribution, total, field, date) {
    var items = Object.keys(distribution).map((key) => { return [key, distribution[key]] });
    items.sort((first, second) => { return first[1] - second[1] });
    var page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" href="style.css">
                    <title>Distr - ${field}</title>
                </head>
                <body>
                    <div class="w3-card-4">

                        <header class="w3-container w3-orange">
                            <h1>
                            <a class="w3-button w3-indigo" href="/">Home</a>
                            Distribuicao de ${field}</h1>
                        </header>
                        <ul class="w3-ul w3-border w3-xlarge">
`
    items.forEach(element => {
            page += `
                            <li style="padding:0">
                                <a class="w3-button w3-block w3-padding-16" href="/pessoas?field=${field}&value=${element[0]}">${element[0]}: ${100*element[1]/total}%</a>
                            </li>
        `
    })
    page += `
                            </ul>
                        <footer class="w3-container w3-orange">
                            <address>Generated in EngWeb2023 ${date}</address>
                        </footer>
                    </div>
                </body>
                </html>                       
            `
    return page
}

exports.genTopPage = function(distribution, field, date) {
    var items = Object.keys(distribution).map((key) => { return [key, distribution[key]] });
    items.sort((first, second) => { return first[1] - second[1] });
    var page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" href="style.css">
                    <title>Top - ${field}</title>
                </head>
                <body>
                    <div class="w3-card-4">

                        <header class="w3-container w3-orange">
                            <h1>
                            <a class="w3-button w3-indigo" href="/">Home</a>
                            Top 10 de ${field}</h1>
                        </header>
                        <ul class="w3-ul w3-border w3-xlarge">
`
    items.forEach(element => {
            page += `
                            <li style="padding:0">
                                <a class="w3-button w3-block w3-padding-16" href="/pessoas?field=${field}&value=${element[1]}">${parseInt(element[0]) + 1}: ${element[1]}</a>
                            </li>
        `
    })
    page += `
                            </ul>
                        <footer class="w3-container w3-orange">
                            <address>Generated in EngWeb2023 ${date}</address>
                        </footer>
                    </div>
                </body>
                </html>                       
            `
    return page
}