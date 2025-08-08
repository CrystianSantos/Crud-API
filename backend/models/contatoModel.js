const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: String,
  telefone: String
});

module.exports = mongoose.model('Contato', ContatoSchema);
