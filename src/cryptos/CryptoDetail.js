import React from 'react'
import axios from 'axios'

import CryptoCard from './CryptoCard'
import CryptoGraph from './CryptoGraph'
import Spinner from '../common/Spinner'

class CryptoDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      crypto: null,
      cryptoSymbol: null
    }
  }


  componentDidMount() {
    const cryptoSymbol = this.props.match.params.cryptoId
    axios.get(`/api/nomics/${cryptoSymbol}`)
      .then(res => this.setState({ crypto: res.data[0], cryptoSymbol }))
      .catch(err => console.log(err))
  }

  render() {

    const { crypto, cryptoSymbol } = this.state
    if (!crypto || !cryptoSymbol ) return <Spinner/>

    const { coingeckoMap } = this.props
    const coingecko = coingeckoMap[cryptoSymbol.toLowerCase()]
    return (
      <>
        
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
            <CryptoGraph coin={coingecko} duration={1} chartTitle={`${crypto.name}/USD`}/>
            <CryptoGraph coin={coingecko} duration={7} chartTitle={`${crypto.name}/USD`}/>
            <CryptoGraph coin={coingecko} duration={30} chartTitle={`${crypto.name}/USD`}/>
            <CryptoGraph coin={coingecko} duration={365} chartTitle={`${crypto.name}/USD`}/>
            </>
          }
        </div>}
      </>
    )
  }

}

export default CryptoDetail