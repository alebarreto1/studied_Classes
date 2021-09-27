'use strict';

const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
    //aquele elemento de Id endereco vai receber como value o logradouro do json
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const isNumber = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && isNumber(cep);

const pesquisarCep = async () => {
    limparFormulario();
    /* Variável cep que vai no documento e pega o elemento 
     cujo Id é cep e pega seu atributo chamado value! */
    const cep = document.getElementById('cep').value;
    /* Temos a url do viacep, mas como pegar os dados?
       resposta: com o fetch!
       O fetch retorna uma PROMESSA
       (algo que pode acontecer ou não). Logo, é um retorno assíncrono!
       Por isso temos que usar métodos (then) para obter dados de retorno.
        O Response tem um json, o qual podemos adequar ao formato desejado 
        O json tbm retorna uma PROMESSA, logo, tenho que usar then para acessar
        os dados:
       fetch(url).then(response => response.json()).then(console.log); */
    const url = `http://viacep.com.br/ws/${cep}/json/`

    if (cepValido(cep)) {

        const dados = await fetch(url); //recebendo resultados do fetch

        const endereco = await dados.json();//pegando os dados e aplicando a função json

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado'
        } else {
            preencherFormulario(endereco);
        }

    } else {
        document.getElementById('endereco').value = 'CEP incorreto!'
    }
}

/* Vá no documento e pegue um elemento cujo Id é cep. 
Nesse elemento adicione um addEventListener para 
"escutar" quando sair do foco acionando a FUNÇÃO pesquisarCep! */
document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);