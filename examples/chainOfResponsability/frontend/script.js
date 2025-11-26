/***********************
 * CACHE DO DOM
 ************************/
const DOM = {
  // Select Categorias
  selectCategorias: document.querySelector("#select-categorias"),
  voidOptSelectCategoria: document.querySelector("#void-option-categoria"),

  // Select Produtos
  selectProdutos: document.querySelector("#select-produtos"),
  voidOptSelectProduto: document.querySelector("#void-option-produto"),
  buttonSubmitSolicitacao: document.querySelector("#submit-solicitacao"),

  // Input quantidade
  inputQuantidade: document.querySelector("#input-quantidade"),

  // Lista de solicitações
  solicitacoesList: document.querySelector("#solicitacoes-list"),
};

/***********************
 * FUNÇÕES UTILITÁRIAS
 ************************/

// Cria option para selects
const createOption = (id, nome) => {
  const opt = document.createElement("option");
  opt.value = id;
  opt.innerHTML = nome;
  return opt;
};

const createSolicitacaoItem = (solicitacao) => {
  const container = document.createElement("div");
  container.classList.add("order-item");
  container.classList.add("border-bottom");
  container.classList.add("pb-3");
  container.classList.add("mb-3");
  container.innerHTML = `
        <div class="">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="mb-0">${solicitacao.produto.nome}</h5>
                <span class="badge bg-${
                  solicitacao.status == "Pendente"
                    ? "warning"
                    : solicitacao.status == "Expedido, pronto para retirada!"
                    ? "success"
                    : "danger"
                }">${solicitacao.status}</span>
            </div>
            <p class="text-muted mb-1">ID do Pedido: #${solicitacao.id}</p>
            <p class="text-muted mb-1">Quantidade: ${
              solicitacao.quantidade
            } unidade(s)</p>
            <p class="text-muted mb-0">Data: ${solicitacao.createdAt}</p>
        </div>`;
  return container;
};

/***********************
 * FETCHERS (API)
 ************************/

// Busca categorias
const fetchCategorias = async () => {
  try {
    const response = await fetch("http://localhost:5000/categorias");
    const data = await response.json();
    return data.categorias;
  } catch (error) {
    console.error(error);
  }
};

// Busca categorias
const fetchSolicitacoes = async () => {
  try {
    const response = await fetch("http://localhost:5000/solicitacoes");
    const data = await response.json();
    return data.solicitacoes;
  } catch (error) {
    console.error(error);
  }
};

// Busca produtos por categoria
const fetchProdutos = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/categorias/${id}/produtos`
    );
    const data = await response.json();
    return data.produtos;
  } catch (error) {
    console.error(error);
  }
};

/***********************
 * FILL LIST
 ************************/

const fillListSolicitacoes = async () => {
  DOM.voidOptSelectCategoria.innerHTML = "Carregando categorias...";
  DOM.solicitacoesList.innerHTML = "";

  const solicitacoes = await fetchSolicitacoes();
  if (!solicitacoes) {
    const emptySolicitacoesHTML = "";
    DOM.solicitacoesList.appendChild(emptySolicitacoesHTML);
    return;
  }

  solicitacoes.forEach((solicitacao) => {
    DOM.solicitacoesList.appendChild(createSolicitacaoItem(solicitacao));
  });

  DOM.voidOptSelectCategoria.innerHTML = "Selecione uma categoria.";
};

/***********************
 * FILL SELECTS
 ************************/

// Popula select de categorias
const fillSelectCategorias = async () => {
  DOM.voidOptSelectCategoria.innerHTML = "Carregando categorias...";

  const categorias = await fetchCategorias();
  if (!categorias) {
    DOM.voidOptSelectCategoria.innerHTML = "Falha no carregamento.";
    return;
  }

  categorias.forEach((categoria) => {
    DOM.selectCategorias.appendChild(
      createOption(categoria.id, categoria.nome)
    );
  });

  DOM.voidOptSelectCategoria.innerHTML = "Selecione uma categoria.";
};

// Popula select de produtos ao trocar categoria
const fillSelectProdutos = async (event) => {
  const id = event.target.value;
  if (!id) return;

  // Exibe select de produtos e botão
  DOM.selectProdutos.classList.remove("d-none");
  DOM.buttonSubmitSolicitacao.classList.remove("d-none");
  DOM.inputQuantidade.classList.remove("d-none");

  // Limpa produtos anteriores (mantém void option)
  [...DOM.selectProdutos.options].forEach((option) => {
    if (option !== DOM.voidOptSelectProduto) option.remove();
  });

  DOM.voidOptSelectProduto.innerHTML = "Carregando produtos...";

  const produtos = await fetchProdutos(id);
  if (!produtos) {
    DOM.voidOptSelectProduto.innerHTML = "Falha no carregamento.";
    return;
  }

  produtos.forEach((produto) => {
    DOM.selectProdutos.appendChild(createOption(produto.id, produto.nome));
  });

  DOM.voidOptSelectProduto.innerHTML = "Selecione um produto.";
};

/***********************
 * CONTROLE DO SUBMIT
 ************************/

// Habilita/desabilita botão conforme estado
const handlerSubmitButton = (idCategoria, idProduto) => {
  DOM.buttonSubmitSolicitacao.disabled = !(idCategoria && idProduto);
  DOM.inputQuantidade.disabled = !(idCategoria && idProduto);
};

// Handler compartilhado
const callHandlerSubmitButton = () =>
  handlerSubmitButton(DOM.selectCategorias.value, DOM.selectProdutos.value);

/***********************
 * SUBMIT FUNCTION
 ************************/

const submitSolicitacao = async () => {
  const formData = {
    produto_id: DOM.selectProdutos.value,
    quantidade: DOM.inputQuantidade.value,
  };

  Swal.fire({
    title: "Processando...",
    text: "Sua solicitação está sendo processada",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch("http://localhost:5000/solicitacoes/criar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    Swal.close();

    if (data.error === true) {
      Swal.fire({
        icon: "error",
        title: "Erro na solicitação",
        text: data.message,
        confirmButtonText: "Entendi",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Solicitação realizada!",
      text: "Seu pedido foi processado com sucesso",
      confirmButtonText: "OK",
    });
    return;
  } catch (error) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Erro de conexão",
      text: "Não foi possível conectar ao servidor",
      confirmButtonText: "Tentar novamente",
    });
  } finally {
    DOM.selectCategorias.innerHTML = "";
    DOM.selectProdutos.innerHTML = "";
    DOM.selectProdutos.classList.add("d-none");
    DOM.buttonSubmitSolicitacao.classList.add("d-none");
    DOM.inputQuantidade.classList.add("d-none");
    init();
  }
};

/***********************
 * EVENT LISTENERS
 ************************/

DOM.selectProdutos.addEventListener("change", callHandlerSubmitButton);

DOM.selectCategorias.addEventListener("change", (e) => {
  fillSelectProdutos(e);
  callHandlerSubmitButton();
});
DOM.buttonSubmitSolicitacao.addEventListener("click", submitSolicitacao);

/***********************
 * INIT
 ************************/

const init = () => {
  fillSelectCategorias();
  fillListSolicitacoes();
};

document.addEventListener("DOMContentLoaded", init);
