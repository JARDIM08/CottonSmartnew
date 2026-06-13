/* =====================================
   COTTONSMART - SCRIPT PRINCIPAL
   ===================================== */

/* Toggle sidebar mobile */
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.classList.remove('sidebar-open');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sidebar) return;
  const willOpen = !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', willOpen);
  if (overlay) overlay.classList.toggle('active', willOpen);
  document.body.classList.toggle('sidebar-open', willOpen);
}

function initMobileNav() {
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 1000) closeSidebar();
    });
  });
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add('active');
  const link = document.querySelector(`.nav-link[href="#${id}"]`);
  if (link) link.classList.add('active');
  const titles = {
    dashboard: 'Dashboard Geral', talhoes: 'Controle de Talhões', ciclo: 'Ciclo da Lavoura',
    diario: 'Diário da Lavoura', pragas: 'Pragas e Doenças', clima: 'Clima e Tempo',
    custos: 'Gestão de Custos', lucro: 'Calculadora de Lucro', estoque: 'Controle de Estoque',
    mercado: 'Mercado & Cotação', venda: 'Painel de Vendas', contratos: 'Contratos',
    maquinas: 'Máquinas e Manutenção', documentos: 'Documentos', relatorios: 'Relatórios', ia: 'IA Agrícola'
  };
  const tb = document.getElementById('topbarTitle');
  if (tb && titles[id]) tb.textContent = titles[id];
  if (window.innerWidth <= 1000) closeSidebar();
}

window.onload = function () {
  initMobileNav();
  carregarDados();
  calcularDiasColheita();
  calcularLucro();
};

function carregarDados() {
  const fazenda = document.querySelector('#fazenda');
  if (fazenda) fazenda.innerHTML = database.produtor.fazenda;

  const area = document.querySelector('#area');
  if (area) area.innerHTML = database.produtor.hectaresAlgodao + ' ha';

  const produtividade = document.querySelector('#produtividade');
  if (produtividade) produtividade.innerHTML = database.talhoes[0].produtividade + ' kg/ha';

  const estoque = document.querySelector('#estoque');
  if (estoque) estoque.innerHTML = database.estoque.algodaoArmazenado;

  criarTabelaTalhoes();
  criarPragas();
  criarCustos();
}

function criarTabelaTalhoes() {
  const tabela = document.querySelector('#tabelaTalhoes');
  if (!tabela) return;
  tabela.innerHTML = '';
  database.talhoes.forEach(t => {
    tabela.innerHTML += `
      <tr>
        <td>${t.id}</td>
        <td>${t.area} ha</td>
        <td>${t.produtividade} kg/ha</td>
        <td>${t.umidade}</td>
        <td><span class="badge badge-green">${t.status}</span></td>
      </tr>`;
  });
}

function criarPragas() {
  const area = document.querySelector('#listaPragas');
  if (!area) return;
  area.innerHTML = '';
  database.pragas.forEach(p => {
    area.innerHTML += `
      <div class="alert yellow-alerta">
        <div>
          <h3>${p.nome}</h3>
          <p>Área: ${p.area}</p>
          <p>Nível: ${p.nivel}</p>
          <p>Ação: ${p.acao}</p>
        </div>
      </div>`;
  });
}

function criarCustos() {
  const custo = document.querySelector('#custos');
  if (!custo) return;
  custo.innerHTML = `
    <p>Sementes: R$ ${database.custos.sementes.toLocaleString('pt-BR')}</p>
    <p>Fertilizantes: R$ ${database.custos.fertilizantes.toLocaleString('pt-BR')}</p>
    <p>Defensivos: R$ ${database.custos.defensivos.toLocaleString('pt-BR')}</p>
    <hr>
    <h2>Total: R$ ${database.custos.total.toLocaleString('pt-BR')}</h2>`;
}

function calcularDiasColheita() {
  const el = document.getElementById('diasColheita');
  if (!el) return;
  const hoje = new Date();
  const colheita = new Date(hoje.getFullYear(), 5, 15);
  if (colheita < hoje) colheita.setFullYear(hoje.getFullYear() + 1);
  const dias = Math.ceil((colheita - hoje) / (1000 * 60 * 60 * 24));
  el.textContent = dias;
}

/* ==============================
   TALHÕES
============================== */
const talhaoData = {
  Norte: { area: '1.200 ha', variedade: 'FM 985 GLTP', plantio: '10/11/2025', fase: 'Capulho Aberto', dias: '8 dias', status: 'Colher em breve' },
  Leste: { area: '980 ha', variedade: 'IMA CD 6001', plantio: '20/11/2025', fase: 'Florescimento', dias: '45 dias', status: 'Em andamento' },
  Centro: { area: '1.100 ha', variedade: 'FM 985 GLTP', plantio: '05/11/2025', fase: 'Capulho Aberto', dias: '5 dias', status: 'Colher urgente' },
  Sul: { area: '640 ha', variedade: 'DP 1536 B3XF', plantio: '01/12/2025', fase: 'Formação Capulho', dias: '28 dias', status: 'Em andamento' },
  Oeste: { area: '360 ha', variedade: 'IMA CD 6001', plantio: '15/12/2025', fase: 'Florescimento', dias: '60 dias', status: 'Em andamento' }
};

function selectTalhao(nome) {
  const info = document.getElementById('talhaoInfo');
  const t = talhaoData[nome];
  if (!info || !t) return;
  document.querySelectorAll('.talhao-poly').forEach(p => p.classList.remove('talhao-active'));
  const polyIndex = { Norte: 0, Leste: 1, Centro: 2, Sul: 3, Oeste: 4 };
  const polys = document.querySelectorAll('.talhao-poly');
  if (polyIndex[nome] !== undefined && polys[polyIndex[nome]]) {
    polys[polyIndex[nome]].classList.add('talhao-active');
  }
  info.innerHTML = `
    <h2>Talhão ${nome}</h2>
    <div class="talhao-detalhes">
      <div class="td-row"><span>Área</span><strong>${t.area}</strong></div>
      <div class="td-row"><span>Variedade</span><strong>${t.variedade}</strong></div>
      <div class="td-row"><span>Plantio</span><strong>${t.plantio}</strong></div>
      <div class="td-row"><span>Fase</span><strong>${t.fase}</strong></div>
      <div class="td-row"><span>Dias p/ Colheita</span><strong>${t.dias}</strong></div>
      <div class="td-row"><span>Status</span><strong>${t.status}</strong></div>
    </div>`;
}

/* ==============================
   CICLO DA LAVOURA
============================== */
function calcularCiclo() {
  const dataInput = document.getElementById('dataCicloPlantio');
  const resultado = document.getElementById('resultadoCiclo');
  if (!dataInput.value) { alert('Informe a data de plantio.'); return; }

  const plantio = new Date(dataInput.value);
  const hoje = new Date();
  const dias = Math.floor((hoje - plantio) / (1000 * 60 * 60 * 24));

  let fase, restante, semaforo;
  if (dias < 15) { fase = '🌱 Emergência'; restante = 170 - dias; semaforo = '●● INÍCIO'; }
  else if (dias < 50) { fase = '🌿 Crescimento Vegetativo'; restante = 170 - dias; semaforo = '●● DESENVOLVIMENTO'; }
  else if (dias < 90) { fase = '🌼 Florescimento'; restante = 170 - dias; semaforo = '●● ATENÇÃO — Fase crítica'; }
  else if (dias < 140) { fase = '☁️ Formação do Capulho'; restante = 170 - dias; semaforo = '●● ENCHIMENTO'; }
  else if (dias < 170) { fase = '🤍 Abertura / Maturação'; restante = 170 - dias; semaforo = '●● PRONTO EM BREVE'; }
  else { fase = '🚜 Colheita'; restante = 0; semaforo = '●● COLHER'; }

  document.getElementById('faseAtualTexto').textContent = fase;
  document.getElementById('diasPlantio').textContent = dias;
  document.getElementById('diasRestantesTexto').textContent = restante > 0 ? `Aproximadamente ${restante} dias para colheita` : 'Lavoura pronta para colheita';
  document.getElementById('semaforoCiclo').textContent = semaforo;
  resultado.classList.remove('hidden');
}

function diagnosticarColheita() {
  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  const q3 = document.querySelector('input[name="q3"]:checked');
  const q4 = document.querySelector('input[name="q4"]:checked');
  const result = document.getElementById('resultDiagnostico');

  if (!q1 || !q2 || !q3 || !q4) { alert('Responda todas as perguntas.'); return; }

  const sims = [q1, q2, q3, q4].filter(q => q.value === 'sim').length;
  let msg;
  if (sims >= 3) msg = '✅ <strong>Pronto para colheita!</strong> A lavoura apresenta sinais de maturidade. Programe a operação com umidade abaixo de 12%.';
  else if (sims >= 2) msg = '⚠️ <strong>Quase pronto.</strong> Aguarde mais alguns dias e monitore abertura dos capulhos.';
  else msg = '🔴 <strong>Aguardar.</strong> A lavoura ainda não atingiu maturidade ideal. Continue monitorando.';

  result.innerHTML = msg;
  result.classList.remove('hidden');
}

/* ==============================
   DIÁRIO
============================== */
function addDiarioEntry() {
  const data = document.getElementById('diarioData').value;
  const talhao = document.getElementById('diarioTalhao').value;
  const tipo = document.getElementById('diarioTipo').value;
  const produto = document.getElementById('diarioProduto').value;
  if (!data || talhao === 'Selecione...' || tipo === 'Selecione...') { alert('Preencha os campos obrigatórios.'); return; }

  const list = document.getElementById('diarioList');
  const dataFmt = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');
  const icon = tipo.includes('Adubação') ? '🌿' : tipo.includes('Defensivos') ? '🧪' : tipo.includes('Irrigação') ? '💧' : tipo.includes('Praga') ? '🐛' : '📝';
  const tipoCurto = tipo.replace(/^[^\s]+\s/, '');

  list.insertAdjacentHTML('afterbegin', `
    <div class="diario-entry" data-tipo="${tipoCurto}">
      <div class="de-date">${dataFmt}</div>
      <div class="de-icon">${icon}</div>
      <div class="de-body"><strong>${tipoCurto} — Talhão ${talhao}</strong><span>${produto || 'Registro adicionado'}</span></div>
      <div class="de-badge badge-blue">${tipoCurto}</div>
    </div>`);

  document.getElementById('diarioData').value = '';
  document.getElementById('diarioProduto').value = '';
  document.getElementById('diarioDesc').value = '';
}

function filterDiario(tipo, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.diario-entry').forEach(entry => {
    if (tipo === 'Todos') { entry.style.display = ''; return; }
    entry.style.display = entry.dataset.tipo.includes(tipo) ? '' : 'none';
  });
}

/* ==============================
   PRAGAS
============================== */
function diagnosticarPraga() {
  const selecionados = [];
  for (let i = 1; i <= 6; i++) {
    if (document.getElementById('s' + i)?.checked) selecionados.push(database.sintomasPragas['s' + i]);
  }
  const result = document.getElementById('resultPraga');
  if (!selecionados.length) { alert('Selecione ao menos um sintoma.'); return; }

  let html = '<strong>🔬 Diagnóstico por Sintomas</strong><br><br>';
  html += '<strong>Sintomas selecionados:</strong> ' + selecionados.map(s => s.nome).join(', ') + '<br><br>';

  const todasCausas = [...new Set(selecionados.flatMap(s => s.causas))];
  const todasDoencas = [...new Set(selecionados.flatMap(s => s.doencas))];

  html += '<strong>Possíveis causas:</strong><ul>';
  todasCausas.forEach(c => { html += '<li>' + c + '</li>'; });
  html += '</ul>';

  html += '<strong>Possíveis doenças/problemas:</strong><ul>';
  todasDoencas.forEach(d => { html += '<li>' + d + '</li>'; });
  html += '</ul>';

  html += '<strong>Recomendações iniciais de manejo:</strong><ul>';
  selecionados.forEach(s => { html += '<li><strong>' + s.nome + ':</strong> ' + s.manejo + '</li>'; });
  html += '</ul>';

  html += '<strong>Orientações para verificar a lavoura:</strong><ul>';
  selecionados.forEach(s => { html += '<li><strong>' + s.nome + ':</strong> ' + s.verificacao + '</li>'; });
  html += '</ul>';

  html += '<br>⚠️ Diagnóstico orientativo. Confirme com vistoria de campo e assistência técnica.';

  result.innerHTML = html;
  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function addPraga() {
  const nome = document.getElementById('pragaNome').value;
  const talhao = document.getElementById('pragaTalhao').value;
  if (!nome || talhao === 'Selecione...') { alert('Preencha praga e talhão.'); return; }
  alert(`Ocorrência "${nome}" registrada no Talhão ${talhao}.`);
  document.getElementById('pragaNome').value = '';
  document.getElementById('pragaObs').value = '';
}

/* ==============================
   CUSTOS / LUCRO / ESTOQUE
============================== */
function addCusto() {
  const cat = document.getElementById('custoCategoria').value;
  const val = document.getElementById('custoValor').value;
  if (cat === 'Selecione...' || !val) { alert('Preencha categoria e valor.'); return; }
  alert(`Despesa registrada: ${cat} — R$ ${parseFloat(val).toLocaleString('pt-BR')}`);
}

function calcularLucro() {
  const area = parseFloat(document.getElementById('lucroArea').value) || 0;
  const prod = parseFloat(document.getElementById('lucroProducao').value) || 0;
  const preco = parseFloat(document.getElementById('lucroPrecoBruto').value) || 0;
  const custo = parseFloat(document.getElementById('lucroCusto').value) || 0;
  const totalArrobas = area * prod;
  const receita = totalArrobas * preco;
  const lucro = receita - custo;
  const margem = receita > 0 ? (lucro / receita * 100) : 0;
  const roi = custo > 0 ? (lucro / custo * 100) : 0;

  document.getElementById('lTotalArrobas').textContent = totalArrobas.toLocaleString('pt-BR') + ' @';
  document.getElementById('lReceita').textContent = 'R$ ' + receita.toLocaleString('pt-BR');
  document.getElementById('lCusto').textContent = 'R$ ' + custo.toLocaleString('pt-BR');
  document.getElementById('lLucro').textContent = 'R$ ' + lucro.toLocaleString('pt-BR');
  document.getElementById('lMargem').textContent = margem.toFixed(1).replace('.', ',') + '%';
  document.getElementById('lRoi').textContent = roi.toFixed(1).replace('.', ',') + '%';
  document.getElementById('barCusto').style.width = (100 - margem) + '%';
  document.getElementById('barLucro').style.width = margem + '%';
}

function addEstoque() {
  const prod = document.getElementById('estProduto').value;
  const qtd = document.getElementById('estQtd').value;
  if (!prod || !qtd) { alert('Preencha produto e quantidade.'); return; }
  const msg = document.getElementById('estMsgResult');
  msg.textContent = `Movimentação registrada: ${document.getElementById('estTipo').value} de ${qtd} — ${prod}`;
  msg.classList.remove('hidden');
}

function simularVenda() {
  const qtd = parseFloat(document.getElementById('simQtd').value) || 0;
  const preco = parseFloat(document.getElementById('simPreco').value) || 0;
  const frete = parseFloat(document.getElementById('simFrete').value) || 0;
  const bruta = qtd * preco;
  const liquida = bruta - frete;
  document.getElementById('simBruta').textContent = 'R$ ' + bruta.toLocaleString('pt-BR');
  document.getElementById('simDesconto').textContent = 'R$ ' + frete.toLocaleString('pt-BR');
  document.getElementById('simLiquida').textContent = 'R$ ' + liquida.toLocaleString('pt-BR');
  document.getElementById('simResult').classList.remove('hidden');
}

function publicarAnuncio() {
  const qtd = document.getElementById('anuQtd').value;
  const preco = document.getElementById('anuPreco').value;
  if (!qtd || !preco) { alert('Preencha quantidade e preço.'); return; }
  const msg = document.getElementById('anuResult');
  msg.textContent = `Anúncio publicado: ${qtd} @ a R$ ${preco}/@`;
  msg.classList.remove('hidden');
}

function addContrato() {
  const comp = document.getElementById('contComprador').value;
  const qtd = document.getElementById('contQtd').value;
  const preco = document.getElementById('contPreco').value;
  if (!comp || !qtd || !preco) { alert('Preencha os campos do contrato.'); return; }
  const total = parseFloat(qtd) * parseFloat(preco);
  const prazo = document.getElementById('contPrazo').value;
  const prazoFmt = prazo ? new Date(prazo + 'T12:00:00').toLocaleDateString('pt-BR') : '—';
  document.getElementById('contratosBody').insertAdjacentHTML('beforeend', `
    <tr><td>${comp}</td><td>${parseFloat(qtd).toLocaleString('pt-BR')}</td><td>R$ ${parseFloat(preco).toFixed(2).replace('.', ',')}</td>
    <td>R$ ${total.toLocaleString('pt-BR')}</td><td>${prazoFmt}</td><td><span class="badge badge-amber">Pendente</span></td></tr>`);
}

function addManut() {
  const msg = document.getElementById('manutMsg');
  msg.textContent = 'Manutenção registrada com sucesso.';
  msg.classList.remove('hidden');
}

function filterDocs(cat, el) {
  document.querySelectorAll('.doc-cat').forEach(c => c.classList.remove('active-doc'));
  el.classList.add('active-doc');
  document.querySelectorAll('.doc-item').forEach(item => {
    item.style.display = (cat === 'Todos' || item.dataset.cat === cat) ? '' : 'none';
  });
}

function addDoc() {
  const nome = document.getElementById('docNome').value;
  if (!nome) { alert('Informe o nome do documento.'); return; }
  const msg = document.getElementById('docMsg');
  msg.textContent = `Documento "${nome}" cadastrado.`;
  msg.classList.remove('hidden');
}

function gerarRelatorio(tipo) {
  const titulos = { produtividade: 'Produtividade por Safra', custos: 'Gastos por Categoria', talhoes: 'Comparativo de Talhões', vendas: 'Histórico de Vendas', maquinas: 'Manutenção de Máquinas', pragas: 'Histórico de Pragas' };
  const conteudos = {
    produtividade: 'Safra 2025/26: 23,4 @/ha projetados em 4.280 ha. Crescimento de 7,3% vs safra anterior.',
    custos: 'Total R$ 8.200.000 — Fertilizantes 28%, Defensivos 22%, Máquinas 18%, Funcionários 15%.',
    talhoes: 'Talhão Centro lidera produtividade. Talhão Oeste com ciclo mais longo (60 dias p/ colheita).',
    vendas: '3 vendas realizadas totalizando R$ 2.261.200. Preço médio R$ 138,50/@.',
    maquinas: 'Colheitadeira Case IH 8250 com manutenção pendente. Demais equipamentos operacionais.',
    pragas: 'Lagarta Rosada crítica no Talhão Leste. Mosca-branca em monitoramento no Norte.'
  };
  document.getElementById('relatTitulo').textContent = titulos[tipo] || 'Relatório';
  document.getElementById('relatConteudo').innerHTML = '<p>' + (conteudos[tipo] || 'Relatório gerado.') + '</p>';
  document.getElementById('relatResult').classList.remove('hidden');
}

/* ==============================
   IA AGRÍCOLA — BASE DE CONHECIMENTO
============================== */
function normalizarTexto(txt) {
  return txt.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ');
}

function buscarRespostaIA(texto) {
  const norm = normalizarTexto(texto);
  const palavras = norm.split(/\s+/).filter(p => p.length > 2);

  let melhor = null;
  let melhorScore = 0;

  database.conhecimentoIA.forEach(item => {
    const perguntaNorm = normalizarTexto(item.pergunta);
    let score = 0;

    if (norm === perguntaNorm) score += 200;
    if (norm.includes(perguntaNorm) || perguntaNorm.includes(norm)) score += 100;

    palavras.forEach(p => {
      if (perguntaNorm.includes(p)) score += 10;
      item.tags.forEach(tag => {
        const tagNorm = normalizarTexto(tag);
        if (tagNorm === p) score += 18;
        else if (tagNorm.includes(p) || p.includes(tagNorm)) score += 12;
      });
    });

    if (score > melhorScore) { melhorScore = score; melhor = item; }
  });

  if (melhor && melhorScore >= 12) return melhor.resposta;

  database.respostasExtrasIA.forEach(extra => {
    let score = 0;
    extra.tags.forEach(tag => {
      const tagNorm = normalizarTexto(tag);
      if (norm.includes(tagNorm)) score += 25;
      palavras.forEach(p => { if (tagNorm.includes(p) || p.includes(tagNorm)) score += 10; });
    });
    if (score > melhorScore) { melhorScore = score; melhor = { resposta: extra.resposta }; }
  });

  if (melhor && melhorScore >= 10) return melhor.resposta;

  const mapaCategorias = {
    plantio: ['plantar', 'plantio', 'semeadura', 'semente', 'epoca', 'variedade', 'cultivar'],
    solo: ['solo', 'ph', 'calcario', 'analise', 'corrigir', 'drenagem'],
    irrigacao: ['irrigacao', 'agua', 'chuva', 'seca', 'pivot', 'lamin'],
    pragas: ['praga', 'inseto', 'lagarta', 'bicudo', 'percevejo', 'pulgao', 'mip'],
    doencas: ['doenca', 'fungo', 'mancha', 'podridao', 'ramularia'],
    adubacao: ['adubo', 'adubacao', 'fertilizante', 'nitrogenio', 'ureia', 'cobertura'],
    colheita: ['colheita', 'colher', 'capulho', 'caroco', 'beneficiamento', 'armazen'],
    qualidade: ['fibra', 'micronaire', 'qualidade', 'hvi', 'comprimento'],
    produtividade: ['produtividade', 'rendimento', 'arroba', 'hectare', 'tonelada'],
    manejo: ['manejo', 'rotacao', 'daninha', 'herbicida', 'pulveriz', 'drone', 'precisao']
  };
  const nomesCategoria = {
    plantio: 'plantio', solo: 'solo', irrigacao: 'irrigação', pragas: 'pragas',
    doencas: 'doenças', adubacao: 'adubação', colheita: 'colheita',
    qualidade: 'qualidade', produtividade: 'produtividade', manejo: 'manejo'
  };

  for (const [cat, keys] of Object.entries(mapaCategorias)) {
    if (keys.some(k => norm.includes(k))) {
      const found = database.conhecimentoIA.find(i => i.categoria === nomesCategoria[cat]);
      if (found) return found.resposta;
    }
  }

  return 'Posso ajudar com **plantio**, **solo**, **irrigação**, **pragas**, **doenças**, **adubação**, **colheita**, **qualidade da fibra**, **produtividade** e **manejo** do algodão. Descreva sua dúvida com mais detalhes ou clique em uma pergunta frequente.';
}

function formatarMsgHtml(texto) {
  return texto
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\n/g, '<br>');
}

function addMsg(text, who) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  const msgElement = document.createElement('div');
  msgElement.className = 'chat-msg ' + who;
  msgElement.innerHTML = '<div class="msg-bubble">' + formatarMsgHtml(text) + '</div>';
  chatMessages.appendChild(msgElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function buscarRespostaExata(pergunta) {
  const norm = normalizarTexto(pergunta);
  const item = database.conhecimentoIA.find(i => normalizarTexto(i.pergunta) === norm);
  return item ? item.resposta : null;
}

function responderIA(texto, delay) {
  setTimeout(function () {
    addMsg(buscarRespostaExata(texto) || buscarRespostaIA(texto), 'bot');
  }, delay || 500);
}

function enviarChat() {
  const chatInput = document.getElementById('chatInput');
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;
  addMsg(userMessage, 'user');
  chatInput.value = '';
  responderIA(userMessage);
}

function perguntarIA(pergunta) {
  showSection('ia');
  addMsg(pergunta, 'user');
  responderIA(pergunta, 400);
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) setTimeout(function () { chatMessages.scrollTop = chatMessages.scrollHeight; }, 100);
}

function montarDiagnosticoSintomas(selecionados) {
  let analise = '🔬 **Diagnóstico por Sintomas**\n\n';
  analise += '**Sintomas observados:** ' + selecionados.map(s => s.nome).join(', ') + '\n\n';

  const todasCausas = [...new Set(selecionados.flatMap(s => s.causas))];
  const todasDoencas = [...new Set(selecionados.flatMap(s => s.doencas))];

  analise += '**Possíveis causas:**\n• ' + todasCausas.join('\n• ') + '\n\n';
  analise += '**Possíveis doenças/problemas:**\n• ' + todasDoencas.join('\n• ') + '\n\n';
  analise += '**Recomendações iniciais de manejo:**\n';
  selecionados.forEach(s => {
    analise += '• **' + s.nome + ':** ' + s.manejo + '\n';
  });
  analise += '\n**Orientações para verificar a lavoura:**\n';
  selecionados.forEach(s => {
    analise += '• **' + s.nome + ':** ' + (s.verificacao || 'Faça vistoria em diferentes pontos do talhão e registre fotos para assistência técnica.') + '\n';
  });
  analise += '\n⚠️ Este diagnóstico é orientativo. Confirme com análise de campo e assistência técnica.';
  return analise;
}

function iaDiagnostico() {
  const selecionados = [];
  for (let i = 1; i <= 6; i++) {
    const cb = document.getElementById('ia_s' + i);
    if (cb && cb.checked) selecionados.push(database.sintomasIA['ia_s' + i]);
  }

  if (!selecionados.length) {
    alert('Selecione ao menos um sintoma para análise.');
    return;
  }

  const analise = montarDiagnosticoSintomas(selecionados);
  const resultDiv = document.getElementById('iaDiagResult');
  if (resultDiv) {
    resultDiv.innerHTML = formatarMsgHtml(analise);
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  addMsg('Análise de sintomas solicitada: ' + selecionados.map(s => s.nome).join(', '), 'user');
  setTimeout(function () {
    addMsg(analise, 'bot');
  }, 600);
}

/* ==============================
   PARTÍCULAS DE FUNDO
============================== */
(function initParticulas() {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;pointer-events:none';

  function ajustar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  ajustar();
  window.addEventListener('resize', ajustar);

  const particulas = [];
  for (let i = 0; i < 80; i++) {
    particulas.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 3, speed: 0.4 + Math.random() });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = '#5cb85c';
      ctx.fill();
      p.y -= p.speed;
      if (p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(animar);
  }
  animar();
})();
