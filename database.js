// =====================================
// COTTONSMART - BANCO DE DADOS FICTÍCIO
// =====================================


const database = {

    produtor:{
        nome:"Carlos Mendes",
        fazenda:"Fazenda Santa Aurora",
        cidade:"Campo Verde - MT",
        areaTotal:2450,
        hectaresAlgodao:1200
    },


    safra:{
        atual:"2025/2026",
        variedade:"BRS 500 B2RF",
        plantio:"15/11/2025",
        previsaoColheita:"Agosto/2026",
        produtividadePrevista:4200
    },


    talhoes:[

        {
            id:"T-01",
            area:320,
            status:"Excelente",
            produtividade:4350,
            umidade:"68%",
            risco:"Baixo"
        },

        {
            id:"T-02",
            area:280,
            status:"Atenção",
            produtividade:3900,
            umidade:"51%",
            risco:"Médio"
        },


        {
            id:"T-03",
            area:600,
            status:"Excelente",
            produtividade:4480,
            umidade:"72%",
            risco:"Baixo"
        }

    ],



    clima:{


        temperatura:"28°C",
        umidade:"74%",
        chuvaHoje:"12mm",
        previsao:[
            "Sexta: Chuva leve",
            "Sábado: Sol",
            "Domingo: Chuva moderada"
        ]

    },



    pragas:[


        {
            nome:"Lagarta Helicoverpa",
            area:"Talhão T-02",
            nivel:"Médio",
            acao:"Monitoramento"
        },


        {
            nome:"Pulgão",
            area:"Talhão T-01",
            nivel:"Baixo",
            acao:"Controle preventivo"
        }

    ],




    custos:{


        sementes:85000,
        fertilizantes:132000,
        defensivos:98000,
        maquinas:75000,
        funcionarios:56000,


        total:446000

    },




    estoque:{


        algodaoArmazenado:"380 toneladas",
        sementes:"420 sacas",
        fertilizante:"85 toneladas",
        defensivo:"1.240 litros"

    },



    vendas:{


        comprador:"AgroBrasil Export",
        quantidade:"250 toneladas",
        preco:"R$ 7,85/kg",
        status:"Contrato fechado"
    },

    // Base de conhecimento interno da assistente CottonBot (não exposto no HTML)
    conhecimentoIA: [
    { id: 1, pergunta: "Qual a melhor época para plantar algodão?", resposta: "Depende da região, mas o plantio deve ocorrer na janela recomendada pelo zoneamento agrícola, buscando boa distribuição de chuvas e temperatura adequada.", tags: ["plantio", "época", "plantar", "janela", "zoneamento", "semeadura"], categoria: "plantio" },
    { id: 2, pergunta: "Qual tipo de solo é ideal para o algodão?", resposta: "Solos profundos, bem drenados, férteis e com boa estrutura favorecem o desenvolvimento das raízes e maior produtividade.", tags: ["solo", "tipo", "drenagem", "estrutura", "fertilidade"], categoria: "solo" },
    { id: 3, pergunta: "Qual o pH ideal do solo para algodão?", resposta: "Geralmente entre 5,5 e 6,5, podendo variar conforme a recomendação da análise de solo.", tags: ["ph", "solo", "acidez", "alcalinidade"], categoria: "solo" },
    { id: 4, pergunta: "Como saber se preciso corrigir o solo?", resposta: "Pela análise química do solo, que indica necessidade de calcário, gesso e nutrientes.", tags: ["corrigir", "solo", "calcário", "gesso", "correção"], categoria: "solo" },
    { id: 5, pergunta: "Qual a importância da análise de solo?", resposta: "Ela mostra os níveis de nutrientes e ajuda a definir uma adubação mais eficiente, evitando desperdícios.", tags: ["análise", "solo", "nutrientes", "adubação"], categoria: "solo" },
    { id: 6, pergunta: "Quanto tempo o algodão leva até a colheita?", resposta: "Em média de 150 a 220 dias após o plantio, dependendo da variedade e condições climáticas.", tags: ["tempo", "colheita", "ciclo", "dias", "duracao"], categoria: "plantio" },
    { id: 7, pergunta: "Quantas plantas de algodão por hectare são recomendadas?", resposta: "Depende da cultivar e sistema de cultivo, mas normalmente fica entre 80 mil e 120 mil plantas/ha.", tags: ["plantas", "hectare", "população", "densidade"], categoria: "plantio" },
    { id: 8, pergunta: "Qual a quantidade de sementes usada por hectare?", resposta: "Varia conforme espaçamento, cultivar e população desejada, definida pelo planejamento da lavoura.", tags: ["sementes", "hectare", "quantidade", "espaçamento"], categoria: "plantio" },
    { id: 9, pergunta: "O algodão precisa de muita água?", resposta: "Sim, principalmente nas fases de florescimento e enchimento das maçãs.", tags: ["água", "irrigação", "necessidade", "hídrica"], categoria: "irrigação" },
    { id: 10, pergunta: "Qual fase do algodão é mais sensível à falta de água?", resposta: "Florescimento e formação das maçãs são fases críticas para produtividade.", tags: ["fase", "água", "seca", "estresse", "florescimento"], categoria: "irrigação" },
    { id: 11, pergunta: "Excesso de chuva prejudica o algodão?", resposta: "Sim. Pode causar doenças, queda de flores, apodrecimento de maçãs e dificuldades na colheita.", tags: ["chuva", "excesso", "precipitação", "colheita"], categoria: "irrigação" },
    { id: 12, pergunta: "Qual adubo é mais usado no algodão?", resposta: "Normalmente são usados nitrogênio, fósforo, potássio e micronutrientes conforme análise do solo.", tags: ["adubo", "fertilizante", "npk", "nutrientes"], categoria: "adubação" },
    { id: 13, pergunta: "Por que o nitrogênio é importante?", resposta: "Ajuda no crescimento vegetativo, formação de estruturas reprodutivas e produtividade.", tags: ["nitrogênio", "ureia", "adubação", "crescimento"], categoria: "adubação" },
    { id: 14, pergunta: "Excesso de nitrogênio faz mal?", resposta: "Sim. Pode estimular muito crescimento vegetativo e atrasar a abertura das maçãs.", tags: ["excesso", "nitrogênio", "vegetativo", "maçãs"], categoria: "adubação" },
    { id: 15, pergunta: "Quando fazer a adubação de cobertura?", resposta: "Geralmente durante o desenvolvimento da planta, conforme recomendação técnica.", tags: ["cobertura", "adubação", "época", "aplicação"], categoria: "adubação" },
    { id: 16, pergunta: "Quais são as principais pragas do algodão?", resposta: "Lagarta-do-cartucho, bicudo-do-algodoeiro, percevejos e pulgões estão entre as principais.", tags: ["pragas", "principais", "insetos", "lagarta", "bicudo"], categoria: "pragas" },
    { id: 17, pergunta: "O que é o bicudo-do-algodoeiro?", resposta: "É uma das principais pragas do algodão, que ataca botões florais e pode causar grandes perdas.", tags: ["bicudo", "praga", "botões", "florais"], categoria: "pragas" },
    { id: 18, pergunta: "Como controlar o bicudo?", resposta: "Com monitoramento, manejo integrado, controle químico quando necessário e eliminação de restos culturais.", tags: ["bicudo", "controle", "manejo", "inseticida"], categoria: "pragas" },
    { id: 19, pergunta: "O que é MIP (Manejo Integrado de Pragas)?", resposta: "É o uso combinado de monitoramento, controle biológico, cultural e químico para reduzir perdas.", tags: ["mip", "manejo", "integrado", "pragas"], categoria: "pragas" },
    { id: 20, pergunta: "Como identificar uma planta doente?", resposta: "Observando manchas, murchas, podridões, deformações e queda anormal de estruturas.", tags: ["doente", "identificar", "sintomas", "doença"], categoria: "doenças" },
    { id: 21, pergunta: "Quais doenças atacam o algodão?", resposta: "Ramulose, mancha-alvo, ramulária e podridão de raízes são exemplos importantes.", tags: ["doenças", "ramulose", "mancha", "fungos"], categoria: "doenças" },
    { id: 22, pergunta: "Como prevenir doenças?", resposta: "Usando sementes de qualidade, rotação de culturas, manejo adequado e controle quando necessário.", tags: ["prevenir", "doenças", "prevenção", "fungicida"], categoria: "doenças" },
    { id: 23, pergunta: "O que é algodão transgênico?", resposta: "É o algodão desenvolvido com características específicas, como resistência a insetos ou tolerância a herbicidas.", tags: ["transgênico", "bt", "ogm", "tecnologia"], categoria: "manejo" },
    { id: 24, pergunta: "O algodão transgênico aumenta a produtividade?", resposta: "Pode ajudar no manejo e reduzir perdas, mas depende das condições da lavoura.", tags: ["transgênico", "produtividade", "tecnologia"], categoria: "produtividade" },
    { id: 25, pergunta: "Como controlar plantas daninhas?", resposta: "Com manejo integrado, envolvendo herbicidas, rotação de culturas e práticas agrícolas.", tags: ["daninhas", "ervas", "herbicida", "capina"], categoria: "manejo" },
    { id: 26, pergunta: "Por que a rotação de culturas é importante?", resposta: "Ajuda a conservar o solo, reduzir pragas e doenças e melhorar a produtividade.", tags: ["rotação", "culturas", "solo", "pragas"], categoria: "manejo" },
    { id: 27, pergunta: "Quais culturas combinam com rotação do algodão?", resposta: "Soja e milho são exemplos comuns em sistemas agrícolas.", tags: ["rotação", "soja", "milho", "culturas"], categoria: "manejo" },
    { id: 28, pergunta: "Como escolher uma variedade de algodão?", resposta: "Considerando clima, solo, resistência a doenças, ciclo e objetivo de produção.", tags: ["variedade", "cultivar", "semente", "escolha"], categoria: "plantio" },
    { id: 29, pergunta: "O que influencia a qualidade da fibra?", resposta: "Genética, clima, nutrição, manejo, colheita e armazenamento.", tags: ["qualidade", "fibra", "hvi", "micronaire"], categoria: "qualidade" },
    { id: 30, pergunta: "O que é comprimento da fibra?", resposta: "É uma característica que indica o tamanho das fibras, influenciando o valor comercial.", tags: ["comprimento", "fibra", "uhml", "qualidade"], categoria: "qualidade" },
    { id: 31, pergunta: "O que é micronaire?", resposta: "É uma medida relacionada à finura e maturidade da fibra do algodão.", tags: ["micronaire", "fibra", "finura", "maturidade"], categoria: "qualidade" },
    { id: 32, pergunta: "Por que a colheita é uma etapa importante?", resposta: "Porque erros nessa fase podem reduzir qualidade e valor do produto.", tags: ["colheita", "importância", "qualidade"], categoria: "colheita" },
    { id: 33, pergunta: "Como saber o momento certo de colher?", resposta: "Quando a maioria das maçãs está aberta e a fibra apresenta boa maturidade.", tags: ["colher", "momento", "colheita", "maturação", "capulho"], categoria: "colheita" },
    { id: 34, pergunta: "Colher algodão molhado prejudica?", resposta: "Sim. Pode causar perda de qualidade e problemas no armazenamento.", tags: ["molhado", "umidade", "colheita", "chuva"], categoria: "colheita" },
    { id: 35, pergunta: "O que é algodão em caroço?", resposta: "É o algodão colhido com fibra e sementes antes do beneficiamento.", tags: ["caroço", "pluma", "beneficiamento"], categoria: "colheita" },
    { id: 36, pergunta: "O que é beneficiamento do algodão?", resposta: "Processo que separa fibra, caroço e impurezas após a colheita.", tags: ["beneficiamento", "ginning", "fibra", "caroço"], categoria: "colheita" },
    { id: 37, pergunta: "Como armazenar algodão corretamente?", resposta: "Em local protegido de umidade, sujeira e contaminações.", tags: ["armazenar", "armazenamento", "umidade", "estoque"], categoria: "colheita" },
    { id: 38, pergunta: "O que reduz o preço do algodão?", resposta: "Baixa qualidade da fibra, excesso de oferta, mercado e problemas de comercialização.", tags: ["preço", "mercado", "cotação", "valor"], categoria: "manejo" },
    { id: 39, pergunta: "Como aumentar a produtividade do algodão?", resposta: "Com bom planejamento, sementes adequadas, manejo correto e monitoramento constante.", tags: ["aumentar", "produtividade", "rendimento", "arroba"], categoria: "produtividade" },
    { id: 40, pergunta: "Qual a produtividade média do algodão?", resposta: "Varia muito conforme região e tecnologia, podendo passar de várias toneladas por hectare em sistemas eficientes.", tags: ["produtividade", "média", "rendimento", "hectare"], categoria: "produtividade" },
    { id: 41, pergunta: "Como reduzir custos na lavoura?", resposta: "Planejamento de insumos, agricultura de precisão e manejo eficiente ajudam.", tags: ["custos", "reduzir", "economia", "despesas"], categoria: "manejo" },
    { id: 42, pergunta: "O que é agricultura de precisão no algodão?", resposta: "Uso de tecnologias para aplicar insumos e tomar decisões de forma mais eficiente.", tags: ["precisão", "tecnologia", "gps", "drones"], categoria: "manejo" },
    { id: 43, pergunta: "Drones ajudam no cultivo?", resposta: "Sim. Podem auxiliar no monitoramento, identificação de problemas e aplicação em algumas situações.", tags: ["drones", "monitoramento", "tecnologia"], categoria: "manejo" },
    { id: 44, pergunta: "Quando fazer pulverizações?", resposta: "Conforme monitoramento da lavoura e recomendação técnica, não apenas por calendário.", tags: ["pulverização", "aplicação", "defensivo", "calendário"], categoria: "manejo" },
    { id: 45, pergunta: "O que é dessecação do algodão?", resposta: "É uma prática usada para auxiliar na uniformidade e facilitar a colheita em alguns sistemas.", tags: ["dessecação", "colheita", "regulador"], categoria: "colheita" },
    { id: 46, pergunta: "Como proteger o solo no cultivo?", resposta: "Com cobertura vegetal, plantio direto e boas práticas agrícolas.", tags: ["proteger", "solo", "plantio direto", "cobertura"], categoria: "solo" },
    { id: 47, pergunta: "O algodão pode ser cultivado todo ano na mesma área?", resposta: "Não é recomendado sem planejamento, pois aumenta riscos de pragas e doenças.", tags: ["mesma área", "sucessão", "monocultura", "rotação"], categoria: "manejo" },
    { id: 48, pergunta: "Como melhorar a eficiência da irrigação?", resposta: "Ajustando lâmina de água, época e frequência conforme necessidade da cultura.", tags: ["irrigação", "eficiência", "lâmina", "pivot"], categoria: "irrigação" },
    { id: 49, pergunta: "Qual a importância da assistência técnica?", resposta: "Ajuda a tomar decisões melhores e reduzir riscos na produção.", tags: ["assistência", "técnica", "consultoria", "engenheiro"], categoria: "manejo" },
    { id: 50, pergunta: "Como aumentar o lucro com algodão?", resposta: "Melhorando produtividade, qualidade da fibra, controle de custos e estratégias de venda.", tags: ["lucro", "rentabilidade", "margem", "venda"], categoria: "manejo" }
],

// Respostas complementares por tema (não expostas no site)
respostasExtrasIA: [
    { tags: ["mancha", "manchas", "folha amarela", "amareladas"], resposta: "Manchas nas folhas podem indicar **Ramulária**, **Mancha-alvo** ou **deficiência nutricional**. Recomendo: inspecionar padrão das manchas, aplicar fungicida triazol + estrobilurina se confirmado fungo, e verificar adubação nitrogenada." },
    { tags: ["lagarta rosada", "lagarta", "helicoverpa"], resposta: "Para lagarta rosada: monitore semanalmente, use **Bacillus thuringiensis** ou inseticidas específicos quando atingir nível de controle. Prefira aplicar no início da infestação e respeite o MIP." },
    { tags: ["ureia", "dose ureia", "adubação nitrogenada"], resposta: "A adubação nitrogenada varia conforme análise de solo. Em média, aplica-se ureia em cobertura aos 30 e 60 dias. Faça análise de solo antes — doses típicas ficam entre 80–120 kg N/ha, ajustadas tecnicamente." },
    { tags: ["chuva forte", "chuva colheita"], resposta: "Chuva forte na colheita pode **escurecer a fibra**, aumentar umidade e reduzir qualidade comercial. Antecipe colheita em áreas maduras e evite armazenar algodão molhado." },
    { tags: ["variedades produtivas", "melhores variedades", "maior produtividade variedade"], resposta: "Variedades populares no Brasil: **FM 985 GLTP**, **IMA CD 6001**, **DP 1536 B3XF**. Escolha conforme ciclo, região, resistência a pragas e objetivo de fibra." },
    { tags: ["percevejo", "percevejos"], resposta: "Percevejos atacam maçãs e capulhos, causando abortamento e má formação da fibra. Monitore com pano de batida e aplique inseticida quando ultrapassar nível de controle." },
    { tags: ["mosca branca", "mosca-branca"], resposta: "Mosca-branca sugadoras reduzem vigor e favorecem fuligem. Use óleo mineral, monitoramento com armadilhas e inseticidas sistêmicos se necessário." },
    { tags: ["ácaro", "acaro", "rajado"], resposta: "Ácaro-rajado causa pontuações nas folhas e bronzamento. Aumente umidade relativa se possível e aplique acaricida específico ao detectar infestação." },
    { tags: ["geada", "frio"], resposta: "Geada danifica flores e capulhos em formação. Evite plantio fora da janela e monitore previsão meteorológica. Em risco iminente, irrigação por aspersão pode ajudar em alguns casos." },
    { tags: ["capulho", "maçã", "maca"], resposta: "O capulho (maçã) é a estrutura frutífera do algodão. Fases críticas: formação, enchimento e abertura. Estresse hídrico nessas fases reduz produtividade e qualidade da fibra." }
],

// Mapeamento de sintomas para diagnóstico automático
sintomasIA: {
    ia_s1: { nome: "Folhas amareladas", causas: ["Deficiência de nitrogênio", "Excesso de umidade no solo", "Ataque de pulgões ou mosca-branca"], doencas: ["Clorose nutricional", "Podridão radicular inicial"], manejo: "Realize análise foliar e de solo. Verifique drenagem, adubação nitrogenada e presença de insetos sugadores. Ajuste irrigação se necessário.", verificacao: "Caminhe a lavoura observando se o amarelamento começa nas folhas mais velhas ou novas, se há padrão uniforme ou manchas isoladas, e confira a parte inferior das folhas em busca de insetos." },
    ia_s2: { nome: "Manchas escuras", causas: ["Alta umidade e temperatura", "Respingo de solo em folhas baixas", "Esporulação fúngica"], doencas: ["Ramulária", "Mancha-alvo", "Alternaria"], manejo: "Aplique fungicida multissítio ou triazol + estrobilurina. Melhore arejamento, evite irrigação por aspersão no dossel e rotacione princípios ativos.", verificacao: "Observe formato e cor das manchas (circular, angular, com halo), se aparecem primeiro nas folhas baixas ou no topo, e se há esporulação visível após período úmido." },
    ia_s3: { nome: "Plantas murchas", causas: ["Déficit hídrico", "Compactação do solo", "Ataque de nematoides ou podridão de raiz"], doencas: ["Podridão de raiz (Rhizoctonia/Fusarium)", "Murcha vascular"], manejo: "Verifique umidade do solo e sistema radicular. Corrija irrigação, evite excesso de água e considere tratamento de sementes/fungicida de solo.", verificacao: "Escave plantas em diferentes pontos do talhão, avalie cor e integridade das raízes, teste umidade do solo com palma da mão e compare plantas murchas com vizinhas saudáveis." },
    ia_s4: { nome: "Fibra danificada", causas: ["Colheita tardia ou precoce", "Chuva na colheita", "Ataque de pragas no capulho"], doencas: ["Podridão de capulho (Phytophthora)", "Mancha de ramulose no capulho"], manejo: "Colha no ponto ideal (60%+ capulhos abertos). Proteja da chuva e controle bicudo/percevejos na fase reprodutiva.", verificacao: "Abra capulhos em vários pontos da lavoura, verifique cor e brilho da fibra, presença de manchas ou podridão, e percentual de capulhos abertos no talhão." },
    ia_s5: { nome: "Insetos visíveis", causas: ["Infestação de lagartas, bicudo, percevejos ou pulgões", "Falha no monitoramento"], doencas: ["Danos mecânicos — não confundir com doença"], manejo: "Identifique a praga, use MIP com nível de controle. Aplique biológico ou químico conforme recomendação técnica e respeite carência.", verificacao: "Faça amostragem com pano de batida ou inspeção visual em 10 pontos do talhão, conte insetos por planta e registre estágio (ovo, larva, adulto) para definir a ação." },
    ia_s6: { nome: "Capulhos fechados tardiamente", causas: ["Excesso de nitrogênio", "Temperatura baixa", "Deficiência hídrica na fase reprodutiva"], doencas: ["Abortamento de flores por estresse"], manejo: "Revise adubação nitrogenada, garanta irrigação na floração e avalie reguladores de crescimento conforme orientação agronômica.", verificacao: "Compare talhões com adubações diferentes, verifique histórico de chuvas/temperatura nas últimas semanas e conte flores abortadas e capulhos em formação." }
},

sintomasPragas: {
    s1: { nome: "Manchas amarelas nas folhas", causas: ["Alta umidade", "Deficiência nutricional", "Infestação inicial de fungos"], doencas: ["Ramulária", "Mancha-alvo", "Clorose por deficiência de N/Mg"], manejo: "Aplicar fungicida conforme diagnóstico e revisar adubação nitrogenada e magnésio.", verificacao: "Observe se manchas são circulares ou irregulares, se há esporulação e se começam nas folhas mais velhas." },
    s2: { nome: "Folhas com furos", causas: ["Ataque de lagartas mastigadoras", "Alta população de insetos desfolhadores"], doencas: ["Danos por Helicoverpa ou Spodoptera (não fúngico)"], manejo: "Monitorar semanalmente e aplicar Bt ou inseticida específico no início da infestação.", verificacao: "Procure fezes de lagarta, ovos na face inferior das folhas e conte lagartas por metro linear." },
    s3: { nome: "Fibra escurecida", causas: ["Chuva na colheita", "Umidade elevada no armazenamento", "Podridão no capulho"], doencas: ["Podridão de capulho (Phytophthora)", "Ramulose no capulho"], manejo: "Melhorar drenagem, aplicar fungicida preventivo e colher no ponto seco.", verificacao: "Abra capulhos afetados, avalie odor e textura da fibra, e verifique previsão de chuva antes da colheita." },
    s4: { nome: "Larvas no capulho", causas: ["Infestação de lagarta-da-maçã ou Helicoverpa", "Falha no monitoramento na fase reprodutiva"], doencas: ["Danos mecânicos no capulho e fibra"], manejo: "Inseticida biológico ou químico no início da infestação, respeitando MIP e carência.", verificacao: "Inspecione capulhos em diferentes áreas do talhão, conte larvas por planta e registre tamanho das lagartas." },
    s5: { nome: "Murcha repentina", causas: ["Excesso ou falta de água", "Compactação do solo", "Ataque de nematoides"], doencas: ["Podridão de raiz", "Fusariose", "Reniforme ou galha"], manejo: "Analisar raízes, ajustar irrigação e tratar sementes na próxima safra.", verificacao: "Escave plantas murchas e saudáveis lado a lado, observe raízes escuras ou nodulações, e teste umidade do solo." },
    s6: { nome: "Presença de teia", causas: ["Lagarta-do-cartucho em alta população", "Ácaros em condições secas"], doencas: ["Danos foliares por lagarta ou ácaro-rajado"], manejo: "Aplicar inseticida/acaricida específico e destruir restos culturais após colheita.", verificacao: "Identifique se há lagartas dentro das teias ou apenas pontuações (ácaros), e avalie extensão do dano no talhão." }
    }

};
