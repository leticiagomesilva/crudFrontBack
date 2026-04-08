const API_URL = "http://127.0.0.1:8000/registros";

const form = document.getElementById("registroForm");
const registroId = document.getElementById("registroId");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const categoria = document.getElementById("categoria");
const tabelaRegistros = document.getElementById("tabelaRegistros");
const btnCancelar = document.getElementById("btnCancelar");
const btnRecarregar = document.getElementById("btnRecarregar");

function limparErros() {
  document.getElementById("erroNome").textContent = "";
  document.getElementById("erroDescricao").textContent = "";
  document.getElementById("erroCategoria").textContent = "";
  document.getElementById("erroStatus").textContent = "";
}

function obterStatusSelecionado() {
  const selecionado = document.querySelector('input[name="status"]:checked');
  return selecionado ? selecionado.value : "";
}

function validarFormulario() {
  limparErros();
  let valido = true;

  if (nome.value.trim().length < 3) {
    document.getElementById("erroNome").textContent = "Nome deve ter no mínimo 3 caracteres.";
    valido = false;
  }

  if (descricao.value.trim() === "") {
    document.getElementById("erroDescricao").textContent = "Descrição é obrigatória.";
    valido = false;
  }

  if (categoria.value === "") {
    document.getElementById("erroCategoria").textContent = "Selecione uma categoria.";
    valido = false;
  }

  if (obterStatusSelecionado() === "") {
    document.getElementById("erroStatus").textContent = "Selecione um status.";
    valido = false;
  }

  return valido;
}

function limparFormulario() {
  registroId.value = "";
  nome.value = "";
  descricao.value = "";
  categoria.value = "";
  document.querySelectorAll('input[name="status"]').forEach(radio => radio.checked = false);
  limparErros();
}

async function listarRegistros() {
  try {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();

    tabelaRegistros.innerHTML = "";

    dados.forEach(registro => {
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${registro.id}</td>
        <td>${registro.nome}</td>
        <td>${registro.descricao}</td>
        <td>${registro.categoria}</td>
        <td>${registro.status}</td>
        <td>
          <button class="editar" onclick="editarRegistro(${registro.id})">Editar</button>
          <button class="excluir" onclick="excluirRegistro(${registro.id})">Excluir</button>
        </td>
      `;

      tabelaRegistros.appendChild(linha);
    });
  } catch (erro) {
    alert("Erro ao listar registros.");
    console.error(erro);
  }
}

async function editarRegistro(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`);
    const registro = await resposta.json();

    registroId.value = registro.id;
    nome.value = registro.nome;
    descricao.value = registro.descricao;
    categoria.value = registro.categoria;

    document.querySelectorAll('input[name="status"]').forEach(radio => {
      radio.checked = radio.value === registro.status;
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (erro) {
    alert("Erro ao buscar registro.");
    console.error(erro);
  }
}

async function excluirRegistro(id) {
  const confirmar = confirm("Deseja realmente excluir este registro?");
  if (!confirmar) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.detail || "Erro ao excluir.");
    }

    await listarRegistros();
  } catch (erro) {
    alert(erro.message);
    console.error(erro);
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!validarFormulario()) return;

  const dados = {
    nome: nome.value.trim(),
    descricao: descricao.value.trim(),
    categoria: categoria.value,
    status: obterStatusSelecionado()
  };

  const id = registroId.value;
  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.detail || "Erro ao salvar registro.");
    }

    limparFormulario();
    await listarRegistros();
  } catch (erro) {
    alert(erro.message);
    console.error(erro);
  }
});

btnCancelar.addEventListener("click", limparFormulario);
btnRecarregar.addEventListener("click", listarRegistros);

listarRegistros();