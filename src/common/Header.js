import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Link to='/' className="hover-color">
        <h1><span>C</span>rypto<span>M</span>arket<span>I</span>ndex</h1>
      </Link>
      <p>Top 100 crypto currencies - powered by <a rel="noopener noreferrer" target="_blank" href="https://nomics.com/">nomics.com</a> and <a rel="noopener noreferrer" target="_blank" href="https://www.coingecko.com">coingecko</a></p>
      <p><a rel="noopener noreferrer" target="_blank" href="https://github.com/bhuone-garbu/crypto-view"><i className="fab fa-2x fa-github"></i></a>{'<>\''}ed by a crypto fanatic <span style={{ 'fontSize': '2rem' }}>😉</span></p>
    </header>
  )
}

export default Header