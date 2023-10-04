const https = require('https');
const http = require('http');
const { gotScraping } = require('got-scraping');

const defaultLoadPage = (httpAgent) => (url) =>
    gotScraping({ url, agent: { http: httpAgent, https: httpAgent } }).then(
        (res) => res.body
    );

const defaultAgent = new https.Agent();

const defaultConfig = {
    httpAgent: defaultAgent,
    loadPage: defaultLoadPage(defaultAgent),
};

const cheerio = require('cheerio');
const { randomUUID } = require('crypto');

const fetchPage = async (url) => {
    const root = cheerio.load(await
        gotScraping({ url, agent: { http: defaultAgent, https: defaultAgent } }).then(
            (res) => res.body
        )
    );

    const html = root.html();

    if (
        html.includes('error code:') ||
        html.includes('Sorry, you have been blocked') ||
        html.includes('Checking your browser before accessing') ||
        html.includes('Enable JavaScript and cookies to continue')
    ) {
        throw new Error(
            'Access denied | www.hltv.org used Cloudflare to restrict access'
        );
    }

    return root;
};

const generateRandomSuffix = () => {
    return randomUUID();
};

const percentageToDecimalOdd = (odd) =>
    parseFloat(((1 / odd) * 100).toFixed(2));

function getIdAt(index, href) {
    switch (arguments.length) {
        case 1:
            return (href) => getIdAt(index, href);
        default:
            return parseNumber(href.split('/')[index]);
    }
}

const notNull = (x) => x !== null;

const parseNumber = (str) => {
    if (!str) {
        return undefined;
    }

    const num = Number(str);

    return Number.isNaN(num) ? undefined : num;
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
    fetchPage,
    generateRandomSuffix,
    percentageToDecimalOdd,
    getIdAt,
    notNull,
    parseNumber,
    sleep,
};
