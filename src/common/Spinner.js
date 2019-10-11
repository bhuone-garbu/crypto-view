import React from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// Third party library
class Spinner extends React.Component {

  render(){
    return (
      <Loader type='Bars'
        color='#000'
        height={150}
        width={150}
        timeout={3000} //3 secs
      />
    )
  }
}

export default Spinner