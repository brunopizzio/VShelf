// Chama pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/product') 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/vshelf', {useNewUrlParser: true});

// Configuração app para usar o 'bodyParser()'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Definindo porta onde a API será executada
const port = process.env.port || 3000;

// Criando instância das rotas via express
const router = express.Router();

router.use(function(req, res, next) {
    console.log('Algo esta acontecendo aqui...');
    next();
});

// Rota de exemplo
router.get('/' , function(req, res) {
    res.json({ message: 'Bem vindo'})
});

// API´s:
// Rotas que terminarem com '/books' (GET ALL & POST)

router.route('/books')
.post(function(req, res) {
    const book = new Book();
    book.titulo = req.body.titulo;
    book.autor = req.body.autor;
    book.paginas = req.body.paginas;
    book.descricao = req.body.descricao;

    book.save(function(error){
       if(error)
            res.send('Erro ao tentar salvar o livro'+error);
        res.json({message: 'Livro cadastrado com sucesso!'}); 
    });
})

// Definindo um padrão das rotas prefixadas: '/api'
app.use('/api', router);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log('Para derrubar o servidor: ctrl + c');
});

