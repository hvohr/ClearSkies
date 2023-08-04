import './WeatherCard.css'
import { useState } from 'react'
import { PropTypes } from 'prop-types'

function HomeWeatherCard(props) {
  const [moreInfo, setMoreInfo] = useState(true)
  let moreInformation = <section className='more-information-container'>
    {(props.changedState === "...") === false && <h3>Feels Like: &nbsp;&nbsp;  {props.currentFeelsLike} F</h3>}
    {(props.changedState === "...") === false && <h3>Cloud Cover:  &nbsp;&nbsp; {props.currentCloudCover}%</h3>}
    {(props.changedState === "...") === false && <h3>UV Index:  &nbsp;&nbsp; {props.currentUVI}</h3>}
    {(props.changedState === "...") === false && <h3>Wind Speed:  &nbsp;&nbsp; {props.currentWindSpeed} mph</h3>}
  </section>

  function clickedButtonMoreInfo() {
    setMoreInfo(false)
  }

  function clickedButtonLessInfo() {
    setMoreInfo(true)
  }
  return (
    <div>
      <section className='current-weather-card'>
        {(props.currentWeatherIcon && (props.changedState === "...") === false) && <img alt={`small current weather icon of ${props.currentDescription}`} className='weather-icons' src={(`https://openweathermap.org/img/wn/${props.currentWeatherIcon}@2x.png`)}></img>}
        {props.changedState === "..." && <img className='loading-icon' alt="loading circle icon dashed design" src={require('../images/loading.png')}></img>}
        {(props.changedState === "...") === false && <h3>{props.currentTemp} F</h3>}
        {(props.changedState === "...") === false && <h3>{props.currentDescription}</h3>}
      </section>
      <section className='more-information'>
        {(!moreInfo) && moreInformation}
        {(!props.showButtons && !props.invalid && moreInfo) && <button className='more-info-buttons' onClick={clickedButtonMoreInfo}>More Info</button>}
        {!moreInfo && <button className='more-info-buttons' onClick={clickedButtonLessInfo}>Less Info</button>}
      </section>
    </div>
  )
}

HomeWeatherCard.propTypes = {
  changedState: PropTypes.string,
  currentWeatherIcon: PropTypes.string,
  currentTemp: PropTypes.any,
  currentDescription: PropTypes.string,
  currentWindSpeed: PropTypes.any,
  currentCloudCover: PropTypes.any,
  currentUVI: PropTypes.any,
  currentFeelsLike: PropTypes.any
}

export default HomeWeatherCard
