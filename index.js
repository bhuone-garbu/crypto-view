const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const port = process.env.PORT || 4000

require('dotenv').config()

app.use(express.static(`${__dirname}/dist`))

// body parser middleware
app.use(bodyParser.json())


// proxy to resolve 'Access-Control-Allow-Origin'
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// just forwarding the response and error back to front end
app.use('/api/nomics/:id', (req, res) => {
  const cryptoSymbol = req.params.id
  axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${cryptoSymbol}&convert=USD`)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err))
})

app.use('/api/nomics', (req, res) => {
  axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&convert=USD`)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err))
})

app.use('/api/coingecko/:id', (req, res) => {
  const coinId = req.params.id
  const duration = req.query.duration
  axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?&vs_currency=usd&days=${duration}`)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err))
})


app.use('/api/coingecko', (req, res) => {
  axios.get('https://api.coingecko.com/api/v3/coins/list')
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err))
})

app.use('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(port, () => console.log(`Express is running on port ${port}`))