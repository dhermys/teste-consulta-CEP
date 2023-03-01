const pesquisarCep = async () => {
    let cepConsultado = document.getElementById('cep-consultado').value;

    if (cepConsultado.trim() === "") {
        document.getElementById('resposta').innerHTML = `<h5>O campo CEP deve ser preenchido</h5>`
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
        }).then((cep) => {
            if (cep.length === 0) {
                document.getElementById('resposta').innerHTML = `<h5>CEP não encontrada</h5>`
            } else {
                console.log(cep)
                document.getElementById('resposta').innerHTML =
                    `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${cep.cep}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Logradouro:</b> ${cep.logradouro}</li>
                            <li class="list-group-item"><b>Localidade:</b> ${cep.localidade}</li>
                            <li class="list-group-item"><b>UF:</b> ${cep.uf}</li>
                        </ul>
                    </div><br>`
            }
        })
    }
};