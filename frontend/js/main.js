const API_BASE_URL = 'https://crud-api-rfl7.onrender.com/api';

// Elementos DOM
const form = document.getElementById('form-contato');
const tabela = document.getElementById('tabela-contatos');

let idEditando = null; // Para controlar se está editando

// Carregar contatos
async function carregarContatos() {
  try {
    const resposta = await fetch(`${API_BASE_URL}/contatos`);
    if (!resposta.ok) throw new Error('Erro ao buscar contatos');
    const contatos = await resposta.json();

    tabela.innerHTML = ''; // limpa só o tbody, mantendo o thead

    contatos.forEach(contato => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${contato.nome}</td>
        <td>${contato.email || ''}</td>
        <td>${contato.telefone || ''}</td>
        <td>
          <button class="editar">Editar</button>
          <button class="excluir">Excluir</button>
        </td>
      `;

      // Adiciona eventos nos botões
      linha.querySelector('.editar').addEventListener('click', () => editarContato(contato._id));
      linha.querySelector('.excluir').addEventListener('click', () => excluirContato(contato._id));

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
      let erroMsg = 'Erro desconhecido';
      try {
        const erro = await resposta.json();
        erroMsg = erro.mensagem || erroMsg;
      } catch {}
      throw new Error(erroMsg);
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
    const resposta = await fetch(`${API_BASE_URL}/contatos/${id}`);
    if (!resposta.ok) {
      alert('Contato não encontrado');
      return;
    }
    const contato = await resposta.json();

    document.getElementById('nome').value = contato.nome || '';
    document.getElementById('email').value = contato.email || '';
    document.getElementById('telefone').value = contato.telefone || '';

    idEditando = id;

  } catch (error) {
    alert('Erro ao buscar contato para editar: ' + error.message);
  }
}

window.editarContato = editarContato;
window.excluirContato = excluirContato;

// Inicializar lista
carregarContatos();
