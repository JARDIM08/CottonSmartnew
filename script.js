/* =====================================
   COTTONSMART - SCRIPT PRINCIPAL
   ===================================== */


/* Toggle sidebar mobile */
function toggleSidebar(){
    document.getElementById('sidebar').classList.toggle('open');
}

function showSection(id){
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    const sec=document.getElementById(id);
    if(sec) sec.classList.add('active');
    const link=document.querySelector(`.nav-link[href="#${id}"]`);
    if(link) link.classList.add('active');
    const titles={
        dashboard:'Dashboard Geral',talhoes:'Controle de Talhões',ciclo:'Ciclo da Lavoura',
        diario:'Diário da Lavoura',pragas:'Pragas e Doenças',clima:'Clima e Tempo',
        custos:'Gestão de Custos',lucro:'Calculadora de Lucro',estoque:'Controle de Estoque',
        mercado:'Mercado & Cotação',venda:'Painel de Vendas',contratos:'Contratos',
        maquinas:'Máquinas e Manutenção',documentos:'Documentos',relatorios:'Relatórios',ia:'IA Agrícola'
    };
    const tb=document.getElementById('topbarTitle');
    if(tb&&titles[id]) tb.textContent=titles[id];
}


/* ==============================
   CARREGAMENTO DO BANCO
============================== */


window.onload = function(){


    carregarDados();


};





/* ==============================
   PUXAR DADOS DO DATABASE
============================== */


function carregarDados(){



// Fazenda

const fazenda =
document.querySelector("#fazenda");


if(fazenda){

fazenda.innerHTML =
database.produtor.fazenda;

}



// Área

const area =
document.querySelector("#area");


if(area){

area.innerHTML =
database.produtor.hectaresAlgodao + " ha";

}



// Produtividade

const produtividade =
document.querySelector("#produtividade");


if(produtividade){

produtividade.innerHTML =
database.talhoes[0].produtividade +
" kg/ha";

}



// Estoque

const estoque =
document.querySelector("#estoque");


if(estoque){

estoque.innerHTML =
database.estoque.algodaoArmazenado;

}




criarTabelaTalhoes();

criarPragas();

criarCustos();

}




/* ==============================
   TABELA DE TALHÕES
============================== */


function criarTabelaTalhoes(){


let tabela =
document.querySelector("#tabelaTalhoes");



if(!tabela)return;



tabela.innerHTML="";



database.talhoes.forEach(t=>{


tabela.innerHTML += `

<tr>

<td>${t.id}</td>

<td>${t.area} ha</td>

<td>${t.produtividade} kg/ha</td>

<td>${t.umidade}</td>

<td>
<span class="badge badge-green">
${t.status}
</span>
</td>

</tr>

`;


});



}






/* ==============================
   PRAGAS
============================== */


function criarPragas(){


let area =
document.querySelector("#listaPragas");


if(!area)return;



area.innerHTML="";



database.pragas.forEach(p=>{


area.innerHTML += `


<div class="alert yellow-alerta">


<div>

<h3>${p.nome}</h3>


<p>
Área: ${p.area}
</p>


<p>
Nível: ${p.nivel}
</p>


<p>
Ação: ${p.acao}
</p>


</div>


</div>



`;



});



}





/* ==============================
   CUSTOS
============================== */


function criarCustos(){


let custo =
document.querySelector("#custos");


if(!custo)return;



custo.innerHTML = `


<p>Sementes:
R$ ${database.custos.sementes.toLocaleString()}</p>


<p>Fertilizantes:
R$ ${database.custos.fertilizantes.toLocaleString()}</p>


<p>Defensivos:
R$ ${database.custos.defensivos.toLocaleString()}</p>


<hr>


<h2>
Total:
R$ ${database.custos.total.toLocaleString()}
</h2>


`;



}





/* ==============================
   NAVEGAÇÃO
============================== */



const links =
document.querySelectorAll(".nav-link");



const sections =
document.querySelectorAll(".section");



links.forEach(link=>{


link.onclick=function(e){


e.preventDefault();



links.forEach(l=>
l.classList.remove("active")
);



link.classList.add("active");



let destino =
link.getAttribute("href");



sections.forEach(sec=>{


sec.classList.remove("active");



if("#"+sec.id === destino){

sec.classList.add("active");

}


});


};



});








/* ==============================
   PARTÍCULAS
============================== */



const canvas =
document.createElement("canvas");


document.body.appendChild(canvas);



const ctx =
canvas.getContext("2d");



canvas.style.position="fixed";

canvas.style.top=0;

canvas.style.left=0;

canvas.style.zIndex="-1";



function ajustar(){


canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;


}



ajustar();


window.onresize=ajustar;



let particulas=[];



for(let i=0;i<80;i++){


particulas.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*3,

speed:.4+Math.random()

});


}




function animar(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particulas.forEach(p=>{


ctx.beginPath();


ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);


ctx.fillStyle="#5cb85c";


ctx.fill();



p.y-=p.speed;



if(p.y<0){

p.y=canvas.height;

}


});



requestAnimationFrame(animar);


}


animar();







/* ==============================
   IA AGRÍCOLA SIMULADA
============================== */



const button =
document.querySelector("#aiButton");


if(button){


button.onclick=function(){



let texto =
document.querySelector("#aiInput")
.value
.toLowerCase();



let resposta;



if(texto.includes("folha")){


resposta =
"🌱 Possível deficiência nutricional. Verifique nitrogênio e solo.";


}

else if(texto.includes("praga")){


resposta =
"🐛 Praga identificada. Realize inspeção do talhão.";


}

else if(texto.includes("seca")){


resposta =
"💧 Recomendação: avaliar irrigação e umidade.";


}


else{


resposta =
"✅ Cultura dentro dos padrões monitorados.";

}



document.querySelector("#aiResult")
.innerHTML=resposta;



};



}
// ==============================
// NAVEGAÇÃO ENTRE CATEGORIAS
// ==============================

const menuLinks = document.querySelectorAll(".nav-link");
const paginas = document.querySelectorAll(".section");


menuLinks.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();


        // remove ativo
        menuLinks.forEach(item =>
            item.classList.remove("active")
        );


        this.classList.add("active");


        const destino = this.getAttribute("href").replace("#","");


        paginas.forEach(pagina => {

            pagina.classList.remove("active");


            if(pagina.id === destino){

                pagina.classList.add("active");

            }

        });


    });

});
document.addEventListener("DOMContentLoaded",()=>{


const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");


links.forEach(link=>{


link.addEventListener("click",(e)=>{


e.preventDefault();


const id = link
.getAttribute("href")
.substring(1);



sections.forEach(section=>{

section.style.display="none";

});



document
.getElementById(id)
.style.display="block";



links.forEach(l=>{

l.classList.remove("active");

});


link.classList.add("active");



});


});



});

/* ============================================================
   ASSISTENTE IA (regras simples)
   ============================================================ */
   const baseIA = [
    {k:['mancha','manchas','folha'], r:'Manchas nas folhas podem indicar **Ramulária** (manchas angulares cinza/marrom) ou **Mancha de Alternaria**. Recomendo: aplicar fungicida triazol + estrobilurina e melhorar arejamento da lavoura.'},
    {k:['amarela','amarelo','amarelas'], r:'Folhas amareladas geralmente indicam **deficiência de nitrogênio**, **excesso de água** ou ataque de **pulgão/mosca-branca**. Verifique adubação e presença de insetos sugadores.'},
    {k:['colher','colheita','colhe'], r:'O ponto ideal de colheita é quando **mais de 60% dos capulhos estão abertos** e a fibra apresenta cor branca brilhante. Evite colher com umidade alta para não comprometer a qualidade.'},
    {k:['bicudo'], r:'Bicudo do algodoeiro: monitore com armadilhas de feromônio nas bordas, aplique inseticida sistêmico nos botões florais e destrua restos culturais após a colheita.'},
    {k:['praga'], r:'Faça monitoramento semanal. As principais pragas do algodão são: bicudo, lagarta-da-maçã, percevejo, pulgão, mosca-branca e ácaros. Use manejo integrado (MIP).'},
    {k:['chuva','seca','seco','água'], r:'Em períodos de seca, priorize irrigação na fase de florescimento (mais sensível). Faça plantio direto para reter umidade e considere variedades mais tolerantes.'},
    {k:['preço','vender','venda','mercado'], r:'Acompanhe diariamente a cotação e o dólar. Boas estratégias: vender em lotes parciais, fechar contratos antecipados (hedge) e diversificar compradores.'},
    {k:['adubo','aduba','fertiliza'], r:'Adubação típica: NPK 04-20-20 no plantio + nitrogênio em cobertura aos 30 e 60 dias. Faça análise de solo antes — economiza muito.'},
    {k:['variedade','semente'], r:'Variedades populares no Brasil: FM 985 GLTP, IMA 5675 B2RF, TMG 47 B2RF. Escolha conforme região, ciclo desejado e resistência a pragas.'}
  ];
  
  /* Função para enviar mensagens no chat */
  function enviarChat() {
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const userMessage = chatInput.value.trim();
  
    if (userMessage === "") {
      return; // Não enviar mensagens vazias
    }
  
    // Adicionar a mensagem do usuário ao chat
    addMsg(userMessage, 'user');
  
    // Limpar o campo de entrada
    chatInput.value = "";
  
    // Processar a mensagem do usuário e gerar uma resposta
    const txt = userMessage.toLowerCase();
    let resp = 'Desculpe, ainda estou aprendendo. Não entendi sua pergunta.';
    for (const item of baseIA) {
      if (item.k.some(k => txt.includes(k))) {
        resp = item.r;
        break;
      }
    }
  
    // Adicionar a resposta do bot ao chat
    setTimeout(() => addMsg(resp, 'bot'), 400);
  }
  
  /* Função para adicionar mensagens ao chat */
  function addMsg(text, who) {
    const chatMessages = document.getElementById("chatMessages");
    const msgElement = document.createElement("div");
    msgElement.className = `chat-msg ${who}`;
    msgElement.innerHTML = `<div class="msg-bubble">${text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</div>`;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Rolar para a última mensagem
  }