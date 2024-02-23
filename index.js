const enviarEmail = require("./Envia_Email");

// Lista de Emails
let emails_cliente = [
    {email: "cliente1@email.com", comunicacoes_mkt: true},
    {email: "cliente2@email.com", comunicacoes_mkt: false},
    {email: "cliente3@email.com", comunicacoes_mkt: true},
    {email: "cliente4@email.com", comunicacoes_mkt: false},
    {email: "cliente5@email.com", comunicacoes_mkt: true},
    {email: "cliente6@email.com", comunicacoes_mkt: false},
    {email: "cliente7@email.com", comunicacoes_mkt: true}
];

// Lista de novos Carros
let carros = [
    {modelo: "Celta", marca: "Chevrolet", ano: 2010},
    {modelo: "Gol", marca: "Volkswagen", ano: 2012},
    {modelo: "Corsa", marca: "Chevrolet", ano: 2015},
    {modelo: "Fiesta", marca: "Ford", ano: 2014},
    {modelo: "Uno", marca: "Fiat", ano: 2011},
    {modelo: "Onix", marca: "Chevrolet", ano: 2018},
    {modelo: "Palio", marca: "Fiat", ano: 2013}
];

// Lista dos Carros Mais Vendidos
let mais_vendidos = [
    {modelo: "Mercedes-Benz S-Class", marca: "Mercedes-Benz", ano: 2022},
    {modelo: "BMW 7 Series", marca: "BMW", ano: 2023},
    {modelo: "Audi A8", marca: "Audi", ano: 2021},
];

// 1. Verifica o Dia da Semana
function dia_semana() {
    // Array com os dias da Semana
    const semana = ["Domingo", "Segunda-Feira", "Terca-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    // Cria um objeto Date que representa a data atual
    const hoje = new Date();
    // obtem todos os dias da semana de 0 a 6, onde 0 é Domingo e 6 é Sábado
    const dia_semana = hoje.getDay();
    // Retorna o nome do dia da semana com base no numero obtido na função acima
    return semana[dia_semana];
};

// 2. Monta o Corpo do Email
function monta_email() {
    let body = "";
    // Novos Carrros
    body += "   - Novos Carros: \n";
    // For para interar sobre os carros e imprimir os resultados
    carros.forEach(carro => {
        //Imprime os dados de cada veiculo
        body += `
        Modelo: ${carro.modelo} 
        Marca: ${carro.marca} 
        Ano: ${carro.ano} 
        \n`;
    });
    // Mais Vendidos
    body += "   - Mais Vendidos:\n";
    mais_vendidos.forEach(vendido => {
        //Imprime os dados de cada veiculo
        body += `
        Modelo: ${vendido.modelo} 
        Marca: ${vendido.marca} 
        Ano: ${vendido.ano} 
        \n`;
    });
    return body;
};

// 3. Envia o Email
async function enviar_email() {
    // Chama a função que monta o body do email 
    let body_email = monta_email();

    for (const email of emails_cliente) {
        if (email.comunicacoes_mkt) {
            try {
                const result = await enviarEmail(email.email, "Atualizações da CarStore", body_email)
                console.log(`E-mail enviado para ${email.email} com sucesso.`, result);
            } catch (error){
                console.error(`Erro ao enviar e-mail para ${email.email}: ${error.message}`);
            } 
        }else {
            console.log(`E-mail não enviado para ${email.email}. Cliente optou por não receber comunicações de marketing.`);
        }
    }
}

// Execução
enviar_email();