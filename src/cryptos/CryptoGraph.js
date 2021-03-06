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
    },
    labels: {
      format: '${value}'
    }
  }
}

class CryptoGraph extends React.Component{

  constructor(){
    super()

    this.state = {
      data: null,
      error: null
    }
  }

  componentDidMount() {
    const { coin, duration } = this.props
    if (!coin) return this.setState({ error: 'No market data for this crypto' })

    axios.get(`/api/coingecko/${coin.id}?duration=${duration}`)
      .then(res => {
        this.setState({ data: res.data.prices })
      })
      .catch(err => {
        this.setState({ error: err })
        console.log(err)
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
    if (!this.state.data && !this.state.error) return null

    return (
      <div className="cryto-chart">
        {!this.state.data && this.state.error && <p>Failed to get prices for this cryptocurrency.</p>}
        {this.state.data && <HighchartsReact
          highcharts={Highcharts}
          options={this.populateChartDetails()}
        />}
      </div>)
  }
}

export default CryptoGraph