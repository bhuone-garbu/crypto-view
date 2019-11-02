import React from 'react'

import CryptoCard from './CryptoCard'

class CryptoHome extends React.Component {
  constructor() {
    super()
    this.state = {
      top100cryptos: null
    }
    this.allCryptocurrencies = null
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentDidMount() {

    const { top100cryptos } = this.props
    this.allCryptocurrencies = top100cryptos
    this.setState({ top100cryptos })
  }

  onChangeHandler(e) {
    const regex = new RegExp(`${e.target.value}`, 'i')
    const filteredCryptos = this.allCryptocurrencies.filter( crypto => regex.test(crypto.name) || regex.test(crypto.symbol) )
    this.setState({ top100cryptos: filteredCryptos })
  }

  render() {

    const { top100cryptos } = this.state

    return (
      <main className="container">
        <div>
          <span>Filter</span> <input onChange={this.onChangeHandler} placeholder="BTC or Bitcoin" />
        </div>
        <div className="crypto-container">
          {top100cryptos && top100cryptos.map(crypto => (
            <CryptoCard key={crypto.id} {...crypto} hr24={crypto['1d']}/>
          ))}
        </div>
      </main>
    )
  }
}

export default CryptoHome
