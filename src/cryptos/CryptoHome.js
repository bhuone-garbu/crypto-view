import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import CryptoCard from './CryptoCard'

class CryptoHome extends React.Component {
  constructor() {
    super()
    this.state = {
      cryptocurrencies: null
    }
    this.allCryptocurrencies = null
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentDidMount() {

    // &ids=BTC,ETH,XRP,LTC,ADA
    axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&convert=USD`)
      .then(res => {
        const filteredCryptos = res.data.slice(0, 100)
        this.allCryptocurrencies = filteredCryptos
        this.setState({ cryptocurrencies: filteredCryptos })
      })
      .catch(err => console.log(err))
  }

  onChangeHandler(e) {
    console.log(e.target.value)
    const regex = new RegExp(`^${e.target.value}`, 'i')
    const newCryptos = this.allCryptocurrencies.filter( crypto => regex.test(crypto.name) || regex.test(crypto.symbol) )
    this.setState({ cryptocurrencies: newCryptos })
  }

  render() {

    return (
      <main className="container">
        <div>
          <input onChange={this.onChangeHandler} name="searchTerm" placeholder="BTC,LTC" />
        </div>
        {/* conditional rendering ... */}
        {!this.state.cryptocurrencies && <h2>Loading</h2>}

        <div className="crypto-container">
          {this.state.cryptocurrencies && this.state.cryptocurrencies.map(crypto => (
            <CryptoCard key={crypto.id} {...crypto}/>
          ))}
        </div>
      </main>

    )
  }
}

export default CryptoHome
