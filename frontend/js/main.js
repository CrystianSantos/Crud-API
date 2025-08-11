const API_URL = 'https://crud-api-rfl7.onrender.com/api';

// Elementos DOM
const form = document.getElementById('form-contato');
const tabela = document.getElementById('tabela-contatos');

let idEditando = null; // Para controlar se está editando

// Carregar contatos
async function carregarContatos() {
  try {
    const resposta = await fetch(`${API_BASE_URL}/contatos`);
    const contatos = await resposta.json();

    tabela.innerHTML = '';

    contatos.forEach(contato => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${contato.nome}</td>
        <td>${contato.email || ''}</td>
        <td>${contato.telefone || ''}</td>
        <td>
          <button class="editar" onclick="editarContato('${contato._id}')">Editar</button>
          <button class="excluir" onclick="excluirContato('${contato._id}')">Excluir</button>
        </td>
      `;

      tabela.appendChild(linha);
    });
  } catch (error) {
    alert('Erro ao carregar contatos: ' + error.message);
  }
}

// Enviar formulário (criar ou atualizar)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (!nome) {
    alert('O nome é obrigatório');
    return;
  }

  const contato = { nome, email, telefone };

  try {
    let resposta;
    if (idEditando) {
      resposta = await fetch(`${API_BASE_URL}/contatos/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
      });
    } else {
      resposta = await fetch(`${API_BASE_URL}/contatos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
      });
    }

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem || 'Erro desconhecido');
    }

    alert(idEditando ? 'Contato atualizado!' : 'Contato criado!');
    idEditando = null;
    form.reset();
    carregarContatos();

  } catch (error) {
    alert('Erro ao salvar contato: ' + error.message);
  }
});

// Excluir contato
async function excluirContato(id) {
  if (!confirm('Deseja realmente excluir este contato?')) return;

  try {
    const resposta = await fetch(`${API_BASE_URL}/contatos/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) throw new Error('Falha ao excluir');

    alert('Contato excluído!');
    carregarContatos();
  } catch (error) {
    alert('Erro ao excluir contato: ' + error.message);
  }
}

// Editar contato
async function editarContato(id) {
  try {
    const resposta = await fetch(`${API_BASE_URL}/contatos`);
    const contatos = await resposta.json();

    const contato = contatos.find(c => c._id === id);
    if (!contato) {
      alert('Contato não encontrado');
      return;
    }

    document.getElementById('nome').value = contato.nome;
    document.getElementById('email').value = contato.email;
    document.getElementById('telefone').value = contato.telefone;

    idEditando = id;

  } catch (error) {
    alert('Erro ao buscar contato para editar: ' + error.message);
  }
}
window.editarContato = editarContato;
window.excluirContato = excluirContato;
// Inicializar lista
carregarContatos();
