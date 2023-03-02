const pesquisarCep = async () => {
    let cep = document.getElementById('cep').value;

    if (cep.trim() === '') {
        document.getElementById('resposta').innerHTML = `<h5>O campo CEP deve ser preenchido</h5>`
    } else {
        await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
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
            if (conteudo.length !== 0) {
                document.getElementById('resposta').innerHTML = 
                `<div class="card" style="width: 18rem;">                
                <div class="card-body">
                  <h5 class="card-title">${conteudo.cep}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Grupo: ${conteudo.logradouro}</li>
                    <li class="list-group-item">Expectativa de vida: ${conteudo.localidade}</li>
                    <li class="list-group-item">Temperamento: ${conteudo.uf}</li>
                </ul>                  
                </div>
              </div> <hr/>`
            }
        })
    }
};