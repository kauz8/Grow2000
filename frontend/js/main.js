async function atualizarListaUsuarios() {
  fetch('http://localhost:3330/api/users')
    .then(response => response.json())
    .then(data => {
      const lista = document.querySelector("#listaUsuarios");
      lista.innerHTML = data.map(user => `
        <div class="user-card">
          <h3>${user.nome}</h3>
          <p>${user.email}</p>
        </div>
      `).join('');
    });
}
async function cadastrarUsuario(usuario) {
  try {
    const response = await fetch('http://localhost:3330/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro no servidor');
    }
    return await response.json();
  }
  catch (error) {
    console.error("Erro no cadastro", error);
    throw error;
  }
}
function buscarCep(cep) {
  cep = cep.replace(/\D/g, "");
  if (cep.length !== 8) {
    alert("CEP inválido. Deve ter 8 dígitos.");
    return;
  }
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado");
      } else {
        document.querySelector("#rua").value = data.logradouro;
        document.querySelector("#bairro").value = data.bairro;
        document.querySelector("#cidade").value = data.localidade;
        document.querySelector("#estado").value = data.uf;
      }
    })
    .catch(() => alert("Erro ao buscar CEP"));
}

document.querySelector("#formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const usuario = {
    nome: document.querySelector("#nome").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    cep: document.querySelector("#cep").value,
    rua: document.querySelector("#rua").value,
    bairro: document.querySelector("#bairro").value,
    cidade: document.querySelector("#cidade").value,
    estado: document.querySelector("#estado").value
  };

  try {
    const resultado = await cadastrarUsuario(usuario);
    console.log("Sucesso:", resultado);
    alert("Cadastro realizado com sucesso!");
    atualizarListaUsuarios();
  } catch (error) {
    console.error("Falha:", error);
    alert(`Erro: ${error.message}`);
  }
});

async function carregarBeats() {
  const response = await fetch('http://localhost:3330/api/beats');
  return await response.json();
}