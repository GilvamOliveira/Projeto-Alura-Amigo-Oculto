let amigos = [];
let pool = []; // Lista auxiliar para sorteio sem repetição

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();
  const mensagem = document.getElementById("mensagem");

  if (nome === "") {
    mensagem.textContent = "Digite um nome válido!";
    mensagem.className = "mensagem error";
    return;
  }

  if (amigos.includes(nome)) {
    mensagem.textContent = "Esse nome já foi adicionado!";
    mensagem.className = "mensagem error";
    return;
  }

  amigos.push(nome);
  pool = [...amigos]; // Atualiza o pool
  atualizarLista();

  mensagem.textContent = `✔️ ${nome} foi adicionado com sucesso!`;
  mensagem.className = "mensagem success";

  input.value = "";
  input.focus();
}

function atualizarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");
    li.textContent = amigo;

    const btnRemover = document.createElement("button");
    btnRemover.innerHTML = "❌";
    btnRemover.onclick = () => removerAmigo(index);

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

function removerAmigo(index) {
  amigos.splice(index, 1);
  pool = [...amigos]; // Atualiza o pool
  atualizarLista();
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = "Amigo removido da lista.";
  mensagem.className = "mensagem error";
}

function sortearAmigo() {
  const resultado = document.getElementById("resultado");

  if (amigos.length < 2) {
    resultado.textContent = "Adicione pelo menos 2 amigos para sortear!";
    resultado.style.color = "var(--color-error)";
    return;
  }

  if (pool.length === 0) {
    resultado.textContent = "🎉 Todos os amigos já foram sorteados!";
    resultado.style.color = "var(--color-primary)";
    return;
  }

  const sorteadoIndex = Math.floor(Math.random() * pool.length);
  const sorteado = pool.splice(sorteadoIndex, 1)[0]; // Remove do pool

  resultado.innerHTML = `🎉 O amigo secreto sorteado foi: <strong>${sorteado}</strong>`;
  resultado.style.color = "var(--color-success)";
}