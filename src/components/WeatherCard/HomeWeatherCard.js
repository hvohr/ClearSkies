import './HomeWeatherCard.css'
import { useState } from 'react'


function HomeWeatherCard(props) {
  const [moreInfo, setMoreInfo] = useState(true)
  let moreInformation = <section>
    <h3>Feels Like: &nbsp;&nbsp;  {props.currentFeelsLike} F</h3>
    <h3>Cloud Cover:  &nbsp;&nbsp; {props.currentCloudCover}%</h3>
    <h3>UV Index:  &nbsp;&nbsp; {props.currentUVI}</h3>
    <h3>Wind Speed:  &nbsp;&nbsp; {props.currentWindSpeed} mph</h3>
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
        <img src={(`https://openweathermap.org/img/wn/${props.currentWeatherIcon}@2x.png`)}></img>
        <h3>{props.currentTemp} F</h3>
        <h3>{props.currentDescription}</h3>
      </section>
      <section className='more-information'>
        {!moreInfo && moreInformation}
        {moreInfo && <button onClick={clickedButtonMoreInfo}>More Info</button>}
        {!moreInfo && <button onClick={clickedButtonLessInfo}>Less Info</button>}
      </section>
    </div>
  )
}

export default HomeWeatherCard
