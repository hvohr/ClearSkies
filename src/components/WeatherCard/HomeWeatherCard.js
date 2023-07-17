import './HomeWeatherCard.css'
import { useState } from 'react'


function HomeWeatherCard(props) {
const [moreInfo, setMoreInfo] = useState(true)
let moreInformation = <section>
      <h3>Feels Like: {props.currentFeelsLike} F</h3>
      <h3>Cloud Cover: {props.currentCloudCover}%</h3>
      <h3>UV Index: {props.currentUVI}</h3>
      <h3>Wind Speed: {props.currentWindSpeed}mph</h3>
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
        <h3>{props.currentTemp}</h3>
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
