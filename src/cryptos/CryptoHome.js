import React from 'react'
import axios from 'axios'

import CryptoCard from './CryptoCard'
import Header from '../common/Header'
import Spinner from '../common/Spinner'

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
    const regex = new RegExp(`${e.target.value}`, 'i')
    const newCryptos = this.allCryptocurrencies.filter( crypto => regex.test(crypto.name) || regex.test(crypto.symbol) )
    this.setState({ cryptocurrencies: newCryptos })
  }

  render() {

    return (
      <>
        <Header />
        <main className="container">
          <div>
            <span>Filter</span> <input onChange={this.onChangeHandler} placeholder="BTC or Bitcoin" />
          </div>
          {/* conditional rendering ... */}
          {!this.state.cryptocurrencies && <Spinner/>}
          {this.state.cryptocurrencies && 
            <div className="crypto-container">
              {this.state.cryptocurrencies && this.state.cryptocurrencies.map(crypto => (
                <CryptoCard key={crypto.id} {...crypto} hr24={crypto['1d']}/>
              ))}
            </div>
          }
        </main>
      </>

    )
  }
}

export default CryptoHome
