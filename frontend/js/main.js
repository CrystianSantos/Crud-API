const API_URL = 'http://localhost:3000/api/contatos';

// Elementos DOM
const form = document.getElementById('form-contato');
const tabela = document.getElementById('tabela-contatos');

// Função para listar os contatos
async function carregarContatos() {
  const resposta = await fetch(API_URL);
  const contatos = await resposta.json();

  // Limpa tabela
  tabela.innerHTML = '';

  // Preenche tabela
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
}

// Função para salvar um novo contato
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  const novoContato = { nome, email, telefone };

  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoContato)
  });

  if (resposta.ok) {
    alert('Contato salvo com sucesso!');
    form.reset();
    carregarContatos();
  } else {
    alert('Erro ao salvar contato');
  }
});

// Carregar contatos ao abrir a página
carregarContatos();
