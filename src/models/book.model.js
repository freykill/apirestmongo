const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: String,
  authot: String,
  genero: String,
  publication_date: String,
  original_languaje: String,
});


module.exports = mongoose.model('book',bookSchema)
