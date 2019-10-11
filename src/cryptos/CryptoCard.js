import React from 'react'
import { Link } from 'react-router-dom'

// this for rendering the cyrpto curreny in the list
const CryptoCard = ({ id, name, symbol, logo_url: logoUrl, price, market_cap: marketCap }) => {
  return (
    <div className="crypto">
      <Link to={`/${id}`}>
        <h2>{name}</h2>
        <h3>({symbol})</h3>
        <img src={logoUrl} />
        <div>
          <p>${parseFloat(price).toFixed(2)}</p>
          <p>Market cap:</p>
          <p>${Number(marketCap).toLocaleString()}</p>
        </div>
      </Link>
    </div>
  )
}

export default CryptoCard