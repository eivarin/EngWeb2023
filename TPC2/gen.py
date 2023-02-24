import json

f = open("mapa.json")

mapa = json.load(f)
for c in mapa["cidades"]:
    c["ligacoes"] = {}

cidades = {c["id"]:c for c in mapa["cidades"]}

ligacoes = mapa["ligações"]

for l in ligacoes:
    origem = l["origem"]
    destino = l["destino"]
    cidades[origem]["ligacoes"][destino] = l
    cidades[destino]["ligacoes"][origem] = l

cidades = [c for (id,c) in cidades.items()]

distritos_dict = {}

for c in cidades:
    d = c["distrito"]
    distritos_dict[d] = distritos_dict.get(d, [])
    distritos_dict[d].append(c)

distritos = list(distritos_dict.keys())
distritos.sort()

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8">
    </head>
    <body style="all:unset;width:100vw; height:100vh;">
        <center><h2 style="margin-block:14px;">Mapa Virtual</h2></center>
        <ul style="display:flex; flex-direction: column; flex-wrap: wrap; height: 85vh; margin:0; box-sizing: border-box;">
"""

for d in distritos:
    pagHTML += f"""
            <li style="width:250px">
                <h3 style="margin-block:10px;">{d}:</h3>
                <ul>
                """
    distritos_dict[d].sort(key=lambda x: x["nome"])
    for c in distritos_dict[d]:
        pagHTML += f"""
                    <li>
                        <a href="{c["id"]}">{c["nome"]}</a>
                    </li>
    """
    pagHTML +=  """
                </ul>
            </li>
    """
pagHTML += """
        </ul>
    </body>
</html>
"""

f = open("pages/index.html", "w+")
f.write(pagHTML)
f.close()

def genPageStr(c, cidades) -> str:
    pagHTML = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>{c["nome"]}</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <center>{c["nome"]}</center>
        <p><b>população:</b> {c["população"]}</p>
        <p><b>descrição:</b> {c["descrição"]}</p>
        <p><b>distrito:</b> {c["distrito"]}</p>
        <center>
            <hr width="80%">
        </center>
        Ligacoes:
        <ul style="display:flex; flex-direction: column; flex-wrap: wrap; height: 60vh">
    """
    for (l, link) in c["ligacoes"].items():
        pagHTML += f"""
            <li style="width:250px"> 
                <a href="{l}">{cidades[l]["nome"]}</a> - {link["distância"]}km
            </li>
        """
    pagHTML += """
            <li style="width:250px">
                <a href="/">Voltar ao Indice</a>
            </li>
        </ul>
    </body>
</html>
    """
    return pagHTML

c_dict = {c["id"]:c for c in mapa["cidades"]}

for c in cidades:
    pagHTML = genPageStr(c, c_dict)
    f = open(f"pages/{c['id']}.html", "w+")
    f.write(pagHTML)
    f.close()