const express = require('express')
const Book = require('../models/product')

// Criando instância das rotas via express
const router = express.Router()

router.use(function (req, res, next) {
  console.log('Algo esta acontecendo aqui...')
  next()
})

// Rota de exemplo
router.get('/', function (req, res) {
  res.json({ message: 'Bem vindo' })
})

// API´s:
// Rotas que terminarem com '/books' (GET ALL & POST)

router.route('/books')

// Cadastras livro
  .post(function (req, res) {
    const book = new Book()
    book.titulo = req.body.titulo
    book.autor = req.body.autor
    book.paginas = req.body.paginas
    book.descricao = req.body.descricao

    book.save(function (error) {
      if (error) { res.send('Erro ao tentar salvar o livro' + error) }
      res.json({ message: 'Livro cadastrado com sucesso!' })
    })
  })

// Selecionar todos os livros
  .get(function (req, res) {
    Book.find(function (error, books) {
      if (error) { res.send('Erro ao tentar selecionar todos os livros' + error) }
      res.json(books)
    })
  })

// Rotas que terminarem com '/books/:book_id' (GET, PUT & DELETE)

router.route('/books/:book_id')

// Selecionar livro por ID
  .get(function (req, res) {
    Book.findById(req.params.book_id, function (error, book) {
      if (error) { res.send('ID do livro não encontrado.' + error) }
      res.json(book)
    })
  })

// Atualizar livro por ID
  .put(function (req, res) {
    Book.findById(req.params.book_id, function (error, book) {
      if (error) { res.send('ID do livro não encontrado.' + error) }

      book.titulo = req.body.titulo
      book.autor = req.body.autor
      book.paginas = req.body.paginas
      book.descricao = req.body.descricao

      book.save(function (error) {
        if (error) { res.send('Erro ao atualizar o livro.' + error) }
        res.json({ message: 'Produto atualizado com sucesso!' })
      })
    })
  })

// Deletar livro por ID
  .delete(function (req, res) {
    Book.remove({
      _id: req.params.book_id
    }, function (error) {
      if (error) { res.send('ID do livro não encontrado' + error) }
      res.json({ message: 'Livro deletado com sucesso!' })
    })
  })

// Definindo um padrão das rotas prefixadas: '/api'
module.exports = app => app.use('/api', router)
