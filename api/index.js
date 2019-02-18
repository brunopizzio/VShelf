// Chama pacotes
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/vshelf', { useNewUrlParser: true })

// Configuração app para usar o 'bodyParser()'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Definindo porta onde a API será executada
const port = process.env.port || 3000

require('./controllers/index')(app)

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
  console.log('Para derrubar o servidor: ctrl + c')
})
