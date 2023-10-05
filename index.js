const express = require('express');
const https = require('https');
const cheerio = require('cheerio');

const { readLogsFromDatabase, writeLogToDatabase, isDuplicateLog } = require('./database.js');

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.get('/test', (req, res) => {
  res.send('This is my test route..... ')
})

module.exports = app