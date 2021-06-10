# Update:

A new dashboard have been designed here: https://cryptompare.vercel.app (WIP)

Goodbye heroku


# CryptoView

CryptoView is a simple public web app to view the top 100 crytocurrency in the current market and their trending prices. No more than 2 days were spent on building this app. All the contents such as the coin symbol and data are queried from the public APIs and rendered dynamically.

As someone who is very into cryptocurrency and blockchain space, I wanted to keep it simple and make it like a listing page in order to share knowledge with public about the cryptocurrencies and increase awareness. 

# Technologies/Tools/API used

* React and Webpack
* CSS with Flexbox
* Highcharts - to display the price data on the show page
* [Nomics](https://nomics.com) and [Coingecko](https://www.coingecko.com/en/api) public API - Nomics for getting the **current top 100** coins in the market and Coingecko for price data. (_I later realised there was not really a need to use two different providers. Oh well_)
* Heroku - for deploying
* Node.js with Express - check the notes below

# Notes
Node.js with Express was added later after realising the issue with CORS policy. To fix it, I created a simple express server with Node.js and used it as a local server to proxy all the requests from the React to external APIs. 👍

Webpack config for proxy:
```javascript

devServer: {
    contentBase: path.resolve('src'),
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false,
        changeOrigin: true
      }
    }
  }
```

and then on the express, I added the following proxy routes:
```javascript

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
```

This allowed me to simply make `GET` request like this.
```javascript
axios.get('/api/nomics')
  .then(res => {
    const top100cryptos = res.data.slice(0, 100)
    this.setState({ top100cryptos })
    return res
  })
  .then(() => {
    axios.get('/api/coingecko')
    ...
  })
```


# Screenshots

## Home page

![Crypto view homepage](https://raw.githubusercontent.com/bhuone-garbu/crypto-view/master/screenshots/home-page-screenshot.png)

## Show page

![Crypt view showpage](https://raw.githubusercontent.com/bhuone-garbu/crypto-view/master/screenshots/show-page-screenshot.png)


