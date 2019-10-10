import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import './style.scss'

import CryptoHome from './cryptos/CryptoHome'
import CryptoShow from './cryptos/CryptoShow'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:cryptoId" component={CryptoShow} />
        <Route exact path="/" component={CryptoHome} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
