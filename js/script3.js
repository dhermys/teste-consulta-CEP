var cidades = [];
var estados = [];

function compararEstados() {
    let ceps = ['cep-origem', 'cep-destino']
    ceps.forEach(pesquisarCep)
    console.log(estados)
    console.log(cidades)
    let origem = cidades[0];
    let destino = cidades[1];
    const myTimeout = setTimeout(calcularRota(origem, destino), 500);
}

// function myGreeting() {
//     let origem = cidades[0];
//     let destino = cidades[1];
//     console.log(origem)
//     console.log(destino)
//     calcularRota(origem, destino)
// }

async function pesquisarCep(cep) {
    let cepConsultado = document.getElementById(cep).value;
    var validacep = /^[0-9]{8}$/;
    if (!validacep.test(cepConsultado)) {
        document.getElementById('resposta').innerHTML = `<h5>Formato do CEP inválido</h5>`
    } else {
        await fetch(`https://viacep.com.br/ws/${cepConsultado}/json/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        }).then((conteudo) => {
            if ("erro" in conteudo) {
                document.getElementById('resposta').innerHTML = `<h5>CEP não encontrado</h5>`
            } else {
                cidades.unshift(conteudo.localidade)
                estados.unshift(conteudo.uf)
                
                //     document.getElementById('resposta').innerHTML =
                //         `<div class="card" style="width: 18rem;">                
                //     <div class="card-body">
                //       <h5 class="card-title">${conteudo.cep}</h5>
                //     </div>
                //     <ul class="list-group list-group-flush">
                //         <li class="list-group-item">Lougradouro: ${conteudo.logradouro}</li>
                //         <li class="list-group-item">Localidade: ${conteudo.localidade}</li>
                //         <li class="list-group-item">UF: ${conteudo.uf}</li>
                //         <li class="list-group-item">A TruckLog atende na sua região</li>
                //     </ul>                  
                //     </div>
                //   </div> <hr/>`
            }
        })
    }
}

async function calcularRota(orig, dest) {
    await fetch(`http://dev.virtualearth.net/REST/v1/Routes?wp.0=${orig},Ceara&wp.1=${dest},Bahia&key=AjhiccnPfgp0nSj_Cs-kKMMB74LWNPDpiwNiRrjM6LTkClBkpGfffR3AvGq0MGdG`, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    }).then((conteudo) => {
        console.log(conteudo.resourceSets[0].resources[0].travelDistance)
    })

}
