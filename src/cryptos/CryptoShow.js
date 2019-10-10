import React from 'react'
import axios from 'axios'

class CryptoShow extends React.Component {
  constructor(){
    super()
    this.state = {
      crypto: null
    }
  }

  componentDidMount(){

    const cryptId = this.props.match.params.cryptoId

    axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${cryptId.toUpperCase()}&convert=USD`)
      .then( res => this.setState({ crypto: res.data[0] }))
      .catch( err => console.log(err))
  }

  render(){

    const { crypto } = this.state
    // const crypto = this.state.crypto
    return (
      <div>
        {!crypto && <h2>Loading...</h2>}

        {crypto &&
        <>
          <h2>{crypto.name} ({crypto.symbol})</h2>
          <img src={crypto.logo_url}/>
          <h3>${parseFloat(crypto.price).toFixed(2)}</h3>
          {crypto['1d'] && <p>24hour price change: {parseFloat(crypto['1d'].price_change).toFixed(2)}%</p>}
          {crypto['7d'] && <p>7day price change: {parseFloat(crypto['7d'].price_change).toFixed(2)}%</p>}
          {crypto['30d'] && <p>30day price change: {parseFloat(crypto['30d'].price_change).toFixed(2)}%</p>}
          {crypto['365d'] && <p>1 year price change: {parseFloat(crypto['365d'].price_change).toFixed(2)}%</p>}
        </>}
      </div>
    )
  }

}

export default CryptoShow