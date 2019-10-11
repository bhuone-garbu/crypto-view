import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <h1><span>C</span>rypto<span>M</span>arket<span>I</span>ndex</h1>
      </Link>
    </header>
  )
}

export default Header