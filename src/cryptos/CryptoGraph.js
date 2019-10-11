import React from 'react'
import axios from 'axios'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const options = {
  chart: {
    zoomType: 'x',
    backgroundColor: null
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      second: '%H:%M:%S',
      minute: '%H:%M',
      hour: '%H:%M',
      day: '%e. %b',
      week: '%e. %b',
      month: '%b \'%y',
      year: '%Y'
    },
    title: {
      text: 'Datetime'
    },
    labels: {
      format: '{value:%Y-%m-%e}'
    }
  },
  yAxis: {
    title: {
      text: 'Prices (USD)'
    }
  }
}

class CryptoGraph extends React.Component{

  constructor(){
    super()

    this.state = {
      data: null
    }
  }

  componentDidMount() {

    const { coinName, duration } = this.props

    axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?id=${coinName.toLowerCase()}&vs_currency=usd&days=${duration}`)
      .then(res => {
        // this.prices = res.data.prices
        // const data = this.prices.map(price => )
        // const data = this.prices.reduce((acc, price) => {
        //   acc.push(price)
        //   return acc
        // }, [])

        this.setState({ data: res.data.prices })

      })
  }

  render(){
    if (!this.state.data) return null

    const { chartTitle, duration } = this.props
    options.series = [{
      name: chartTitle,
      data: this.state.data
    }]
    const periodTitle = duration === 1 ? '24 hours' : `${duration} days`
    options.title = {
      text: `${chartTitle} - ${periodTitle}`
    }
    return (
      <div className="cryto-chart">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>)
  }
}

export default CryptoGraph