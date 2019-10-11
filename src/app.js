import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import './style.scss'

import CryptoHome from './cryptos/CryptoHome'
import CryptoDetail from './cryptos/CryptoDetail'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:cryptoId" component={CryptoDetail} />
        <Route exact path="/" component={CryptoHome} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
