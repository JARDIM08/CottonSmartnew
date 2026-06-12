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