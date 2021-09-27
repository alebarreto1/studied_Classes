const express = require('express'); //importação do express

const server = express();

//agora vou criar uma função para o framework express reconhecer informações json:
server.use(express.json());

const cursos = ['Lógica de Programação', 'JavaScript', 'Design de Interação'];

//agora inicia-se o crud - começando pelo GET, que serve para retornar alguma info(curso):

//Retorna um curso:
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;

    return res.json(cursos[index]);
});

//Retornar todos os cursos:
server.get('/cursos', (req, res) => {

    return res.json(cursos);
});

//POST - cria um novo curso:
server.post('/cursos', (req, res) => {
    const { name } = req.body; //requisição no corpo
    cursos.push(name);

    return res.json(cursos);
});

//PUT - atualiza um curso (vai precisar passar o id do curso):
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

//DELETE - deletar um curso:
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.json({message: "O curso foi deletado com sucesso!"});
});

//para a aplicação rodar ela precisa de uma porta:
server.listen(3000);
