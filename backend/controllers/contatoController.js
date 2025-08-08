const Contato = require('../models/contatoModel');

// Criar novo contato
const criarContato = async (req, res) => {
  try {
    const novoContato = new Contato(req.body);
    await novoContato.save();
    res.status(201).json(novoContato);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar contato', erro: error.message });
  }
};

// Listar todos os contatos
const listarContatos = async (req, res) => {
  try {
    const contatos = await Contato.find();
    res.status(200).json(contatos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar contatos', erro: error.message });
  }
};

// Atualizar contato por ID
const atualizarContato = async (req, res) => {
  try {
    const contatoAtualizado = await Contato.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contatoAtualizado) return res.status(404).json({ mensagem: 'Contato não encontrado' });
    res.status(200).json(contatoAtualizado);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar contato', erro: error.message });
  }
};

// Excluir contato por ID
const deletarContato = async (req, res) => {
  try {
    const contatoExcluido = await Contato.findByIdAndDelete(req.params.id);
    if (!contatoExcluido) return res.status(404).json({ mensagem: 'Contato não encontrado' });
    res.status(200).json({ mensagem: 'Contato excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao excluir contato', erro: error.message });
  }
};

module.exports = {
  criarContato,
  listarContatos,
  atualizarContato,
  deletarContato
};
