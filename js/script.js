var estados = []

function compararEstados() {
    let ceps = ['cep-origem', 'cep-destino']
    ceps.forEach(pesquisarCep)
    console.log(estados)
    if (estados[0] === estados[1]){
        console.log('estados iguais')
    } else {
        console.log('estados diferentes')
    }
}

async function pesquisarCep() {
    let cepConsultado = document.getElementById('cep-origem').value;
    var validacep = /^[0-9]{8}$/;
    if (cepConsultado.trim() === "" || !validacep.test(cepConsultado)) {
        document.getElementById('resposta').innerHTML = `<h5>O formato do CEP é inválido</h5>`
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
                //estados.unshift(conteudo.uf)
                

                document.getElementById('resposta').innerHTML =
                    `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${conteudo.cep}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Logradouro:</b> ${conteudo.logradouro}</li>
                            <li class="list-group-item"><b>Localidade:</b> ${conteudo.localidade}</li>
                            <li class="list-group-item"><b>UF:</b> ${conteudo.uf}</li>
                        </ul>
                    </div><br>`
            }
        })
    }
};
