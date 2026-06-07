let usuariosValidos = ["teste@empresa.com"];
let codigoSeguranca = "";
let lucroTotal = 0;
let gastoTotal = 0;
let dadosGrafico = [0];
let meuGrafico;

// 1. Alternar Formulários
function alternarForm(tipo) {
    document.getElementById('formLogin').style.display = tipo === 'login' ? 'block' : 'none';
    document.getElementById('formCadastro').style.display = tipo === 'cadastro' ? 'block' : 'none';
    document.getElementById('tab-login').classList.toggle('active', tipo === 'login');
    document.getElementById('tab-cadastro').classList.toggle('active', tipo === 'cadastro');
    document.getElementById('erroEmail').style.display = 'none';
}

// 2. Lógica de Login e Código
document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;

    if (!usuariosValidos.includes(email)) {
        document.getElementById('erroEmail').style.display = 'block';
        return;
    }

    codigoSeguranca = Math.floor(100000 + Math.random() * 900000).toString();
    alert("🔐 SEGURANÇA EMPRESAR: Seu código de acesso é " + codigoSeguranca);
    
    document.getElementById('formLogin').style.display = 'none';
    document.getElementById('abas').style.display = 'none';
    document.getElementById('telaCodigo').style.display = 'block';
});

// 3. Validar Código e Entrar no Dashboard
function validarCodigo() {
    const cod = document.getElementById('inputCodigo').value;
    if (cod === codigoSeguranca) {
        document.getElementById('tela-acesso').style.display = 'none';
        document.getElementById('area-logada').style.display = 'block';
        inicializarGrafico();
    } else {
        alert("Código inválido!");
    }
}

// 4. Lógica Financeira (O Retângulo Laranja/Azul)
function adicionarRegistro() {
    const valor = parseFloat(document.getElementById('valorInput').value);
    const tipo = document.getElementById('tipoInput').value;
    const boxTotal = document.getElementById('status-total');

    if (isNaN(valor) || valor <= 0) return alert("Insira um valor válido.");

    if (tipo === 'lucro') {
        lucroTotal += valor;
    } else {
        gastoTotal += valor;
    }

    const saldo = lucroTotal - gastoTotal;

    // Atualizar Números
    document.getElementById('card-lucro').innerText = "R$ " + lucroTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2});
    document.getElementById('card-gasto').innerText = "R$ " + gastoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2});
    document.getElementById('card-total').innerText = "R$ " + saldo.toLocaleString('pt-BR', {minimumFractionDigits: 2});

    // Mudar cor do Retângulo: Azul (Positivo) ou Laranja (Negativo)
    boxTotal.className = saldo >= 0 ? "total-box azul" : "total-box laranja";

    // Atualizar Gráfico
    dadosGrafico.push(saldo);
    meuGrafico.data.labels.push("");
    meuGrafico.update();
    
    document.getElementById('valorInput').value = "";
}

// 5. Gráfico de Evolução
function inicializarGrafico() {
    const ctx = document.getElementById('graficoEvolucao').getContext('2d');
    meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Início'],
            datasets: [{
                label: 'Fluxo de Caixa',
                data: dadosGrafico,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 4,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { display: false }, x: { display: false } },
            plugins: { legend: { display: false } }
        }
    });
}

// 6. Funcionários
function abrirModal() { document.getElementById('modalFunc').style.display = 'flex'; }
function fecharModal() { document.getElementById('modalFunc').style.display = 'none'; }
function salvarFuncionario() {
    const nome = document.getElementById('funcNome').value;
    const cargo = document.getElementById('funcCargo').value;
    const tel = document.getElementById('funcTel').value;
    const sal = document.getElementById('funcSalario').value;

    if (!nome || !cargo) return alert("Preencha os dados básicos.");

    const tabela = document.getElementById('tabelaFuncionarios').querySelector('tbody');
    const row = tabela.insertRow();
    row.innerHTML = `<td>${nome}</td><td>${cargo}</td><td>${tel}</td><td>R$ ${parseFloat(sal).toFixed(2)}</td>`;
    
    fecharModal();
    document.getElementById('funcNome').value = "";
    document.getElementById('funcCargo').value = "";
}

// 7. Cadastro Simulado
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    usuariosValidos.push(document.getElementById('cadEmail').value);
    alert("Empresa cadastrada! Agora você já pode entrar.");
    alternarForm('login');
});