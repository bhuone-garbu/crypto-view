# CryptoView

CryptoView is a simple public web app to view the top 100 crytocurrency in the current market and their trending prices. No more than 2 days were spent on building this app. All the contents such as the coin symbol and data are queried from the public APIs and rendered dynamically.

As someone who is very into cryptocurrency and blockchain space, I wanted to keep it simple and make it like a listing page in order to share knowledge with public about the cryptocurrencies and increase awareness. 

# Technologies/Tools/API used

* React and Webpack
* CSS with Flexbox
* Highcharts - to display the price data on the show page
* [Nomics](https://nomics.com) and [Coingecko](https://www.coingecko.com/en/api) public API - Nomics for getting the **current top 100** coins in the market and Coingecko for price data. (_I later realised there was not really a need to use two different providers. Oh well_)
* Heroku - for deploying

# Screenshots

## Home page

![Crypto view homepage](https://raw.githubusercontent.com/bhuone-garbu/crypto-view/master/screenshots/home-page-screenshot.png)

## Show page

![Crypt view showpage](https://raw.githubusercontent.com/bhuone-garbu/crypto-view/master/screenshots/show-page-screenshot.png)
