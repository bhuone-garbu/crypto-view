import React from 'react'
import axios from 'axios'

import CryptoCard from './CryptoCard'
import CryptoGraph from './CryptoGraph'
import Header from '../common/Header'
import Spinner from '../common/Spinner'

class CryptoDetail extends React.Component {
  
  constructor() {
    super()
    this.state = {
      crypto: null
    }
  }


  componentDidMount() {

    const cryptId = this.props.match.params.cryptoId
    axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${cryptId.toUpperCase()}&convert=USD`)
      .then(res => this.setState({ crypto: res.data[0] }))
      .catch(err => console.log(err))
  }

  render() {

    const { crypto } = this.state
    return (
      <>
        <Header/>
        {!crypto && <Spinner/>}
        {crypto && <div className="crypto-detail">
          {crypto &&
          <>
            <div className="crypt-card-wrapper">
              <CryptoCard {...crypto} />
              {crypto['1d'] && <p>24 hour price change: ${parseFloat(crypto['1d'].price_change).toFixed(2)}</p>}
              {crypto['7d'] && <p>7 day price change: ${parseFloat(crypto['7d'].price_change).toFixed(2)}</p>}
              {crypto['30d'] && <p>30 day price change: ${parseFloat(crypto['30d'].price_change).toFixed(2)}</p>}
              {crypto['365d'] && <p>1 year price change: ${parseFloat(crypto['365d'].price_change).toFixed(2)}</p>}
            </div>
            <CryptoGraph coinName={crypto.name} duration={1} chartTitle={`${crypto.name}/USD`}/>
            <CryptoGraph coinName={crypto.name} duration={7} chartTitle={`${crypto.name}/USD`}/>
            <CryptoGraph coinName={crypto.name} duration={30} chartTitle={`${crypto.name}/USD`}/>
            <CryptoGraph coinName={crypto.name} duration={365} chartTitle={`${crypto.name}/USD`}/>
            </>
          }
        </div>}
      </>
    )
  }

}

export default CryptoDetail