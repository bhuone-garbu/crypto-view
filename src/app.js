import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import axios from 'axios'

import './style.scss'

import CryptoHome from './cryptos/CryptoHome'
import CryptoDetail from './cryptos/CryptoDetail'
import Header from './common/Header'
import Spinner from './common/Spinner'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      top100cryptos: null, // nomics automatically gives all the crypto sorted by rank
      coingeckoMap: null, // this is another free API to get histories but we need to map the names with their version of id
      loaded: false
    }
  }


  componentDidMount(){
    
    axios.get('/api/nomics')
      .then(res => {
        const top100cryptos = res.data.slice(0, 100)
        this.setState({ top100cryptos })
        return res
      })
      .then(() => {
        axios.get('/api/coingecko')
          .then(res => {
            // this is the response from Coingecko
            // [{ "id": "01coin", "symbol": "zoc", "name": "01coin" }, {}, ... ]
            const coingeckoMap = res.data.reduce((acc,coingecoko) => {
              acc[coingecoko.symbol.toLowerCase()] = { id: coingecoko.id, name: coingecoko.name }
              return acc
            }, {})
            this.setState({ coingeckoMap, loaded: true })
          })
      })
      .catch(err => console.error(err))

  }

  render(){

    const { top100cryptos, coingeckoMap, loaded } = this.state

    return (
      <BrowserRouter>
        <Header/>
        {!loaded && <><Spinner/></>}
        {loaded && 
          <Switch>
            <Route exact path="/" component={() => <CryptoHome top100cryptos={top100cryptos}/>}/>
            <Route path="/:cryptoId" component={(props) => <CryptoDetail { ...props} coingeckoMap={coingeckoMap}/>}/>
          </Switch>
        }
      </BrowserRouter>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
