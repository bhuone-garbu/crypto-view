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
    axios.get(`https://api.coingecko.com/api/v3/coins/${coinName.replace(' ', '').toLowerCase()}/market_chart?&vs_currency=usd&days=${duration}`)
      .then(res => {
        this.setState({ data: res.data.prices })
      })
  }

  populateChartDetails(){
    const { chartTitle, duration } = this.props
    options.series = [{
      name: chartTitle,
      data: this.state.data
    }]

    let periodTitle
    if (duration === 1) periodTitle = '24 hours'
    else if (duration === 365) periodTitle = '1 year'
    else periodTitle = `${duration} days`
    options.title = {
      text: `${chartTitle} - ${periodTitle}`
    }

    return options
  }

  render(){
    if (!this.state.data) return null

    return (
      <div className="cryto-chart">
        <HighchartsReact
          highcharts={Highcharts}
          options={this.populateChartDetails()}
        />
      </div>)
  }
}

export default CryptoGraph