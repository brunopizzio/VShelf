var mongoose = require('mongoose')
var Schema = mongoose.Schema

/*      Livro:
 * -> Id: int
 * -> Titulo: String
 * -> Autor: String
 * -> Paginas: Number
 * -> Descricao: String
 */

var BookSchema = new Schema({
  titulo: String,
  autor: String,
  paginas: Number,
  descricao: String
})

module.exports = mongoose.model('Book', BookSchema)
