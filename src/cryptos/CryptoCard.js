import React from 'react'

// this for rendering the cyrpto curreny in the list
const CryptoCard = ({ name, symbol, logo_url: logoUrl, price }) => {
  return (
    <div className="crypto">
      <h2>{name} ({symbol})</h2>
      <img src={logoUrl} />
      <h3>${parseFloat(price).toFixed(2)}</h3>
    </div>
  )
}

export default CryptoCard