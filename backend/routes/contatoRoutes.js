const express = require('express');
const router = express.Router();
const {
  criarContato,
  listarContatos,
  atualizarContato,
  deletarContato
} = require('../controllers/contatoController');

// Rota POST - Criar contato
router.post('/contatos', criarContato);

// Rota GET - Listar todos os contatos
router.get('/contatos', listarContatos);

// Rota PUT - Atualizar contato por ID
router.put('/contatos/:id', atualizarContato);

// Rota DELETE - Excluir contato por ID
router.delete('/contatos/:id', deletarContato);

module.exports = router;

