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


    }

};




// exporta para outros arquivos

console.log(database);