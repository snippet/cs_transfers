const axios = require('axios');
const cheerio = require('cheerio');
const { fetchPage } = require('./utils.js');

const HLTVScraper = (root) => {
    const selector = (selector) => {
      return attachMethods(root(selector));
    };
    Object.assign(selector, root);
  
    return selector;
  };


// URL da página de transferências
const url = 'https://www.hltv.org/transfers';

// Função para raspar as informações de transferência
async function scrapeTransfers() {
  try {
    // Fazer a solicitação HTTP para a página
    const response = await fetchPage(url);

    console.log(HLTVScraper(response.data));

    // Carregar o HTML da página com Cheerio
    const $ = cheerio.load(response.data);

    // Selecione todos os elementos com a classe "transfer-row"
    const transferRows = $('.transfer-row');

    // Array para armazenar as informações das transferências
    const transfers = [];

    // Iterar sobre cada elemento "transfer-row"
    transferRows.each((index, element) => {
      const transfer = {};

      // Extrair as informações do jogador e equipe
      const player = $(element).find('.transfer-movement b').text();
      const team = $(element).find('.transfer-team-container:last-child').text().trim();

      // Extrair a data da transferência
      const date = $(element).find('.transfer-date').text().trim();

      // Preencher o objeto de transferência com as informações
      transfer.player = player;
      transfer.team = team;
      transfer.date = date;

      // Adicionar a transferência ao array
      transfers.push(transfer);
    });

    // Retornar o array de transferências
    return transfers;
  } catch (error) {
    console.error('Ocorreu um erro ao raspar as informações:', error);
    throw error;
  }
}

// Chamar a função para raspar as informações de transferência
scrapeTransfers()
  .then((transfers) => {
    // Exibir as transferências
    console.log(transfers);
  })
  .catch((error) => {
    console.error('Erro:', error);
  });
