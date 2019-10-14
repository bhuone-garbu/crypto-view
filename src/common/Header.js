import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <h1><span>C</span>rypto<span>M</span>arket<span>I</span>ndex</h1>
      </Link>
      <p>Top 100 crypto currencies - powered by <a href="https://nomics.com/">nomics.com</a> and <a href="https://www.coingecko.com">coingecko</a></p>
    </header>
  )
}

export default Header