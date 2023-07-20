import './HomeWeatherCard.css'
import { useState } from 'react'

function HomeWeatherCard(props) {
  const [moreInfo, setMoreInfo] = useState(true)
  let moreInformation = <section>
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
       {(props.currentWeatherIcon && (props.changedState === "...") === false) && <img src={(`https://openweathermap.org/img/wn/${props.currentWeatherIcon}@2x.png`)}></img>}
       {props.changedState === "..." && <img className='loading-icon' src={require('../images/loading.png')}></img>}
       {(props.changedState === "...") === false && <h3>{props.currentTemp} F</h3>}
       {(props.changedState === "...") === false &&  <h3>{props.currentDescription}</h3>}
      </section>
      <section className='more-information'>
        {!moreInfo && moreInformation}
        {moreInfo && <button className='more-info-buttons' onClick={clickedButtonMoreInfo}>More Info</button>}
        {!moreInfo && <button className='more-info-buttons' onClick={clickedButtonLessInfo}>Less Info</button>}
      </section>
    </div>
  )
}

export default HomeWeatherCard
