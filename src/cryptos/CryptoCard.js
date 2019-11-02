import React from 'react'
import { Link } from 'react-router-dom'

// this for rendering the cyrpto curreny in the list
const CryptoCard = ({ id, name, symbol, logo_url: logoUrl, price, market_cap: marketCap, hr24 }) => {
  return (
    <div className="crypto">
      <Link to={`/${id}`}>
        <h2>{name}</h2>
        <h3>({symbol})</h3>
        <img src={logoUrl} />
        <div>
          <p>$ {parseFloat(price).toFixed(2)}</p>
          <p>Market cap:</p>
          <p>$ {Number(marketCap).toLocaleString()}</p>
          {hr24 && <p> 24hr price change:&nbsp;
            <span className={hr24.price_change_pct < 0 ? 'negative' : 'positive'}>{parseFloat(hr24.price_change_pct * 100).toFixed(2)}%
            </span>
          </p>}
          {!hr24 && <p> 24hr price change:&nbsp;</p>}
        </div>
      </Link>
    </div>
  )
}

export default CryptoCard