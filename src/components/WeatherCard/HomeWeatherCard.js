import './HomeWeatherCard.css'
import { useState } from 'react'


function HomeWeatherCard(props) {
const [moreInfo, setMoreInfo] = useState('true')
const [lessInfo, setLessInfo] = useState('false')
let moreInformation = <section>
      <h3>Feels Like: {props.currentFeelsLike} F</h3>
      <h3>Cloud Cover: {props.currentCloudCover}%</h3>
      <h3>UV Index: {props.currentUVI}</h3>
      <h3>Wind Speed: {props.currentWindSpeed}mph</h3>
      </section>

  function clickedButtonMoreInfo() {
    setMoreInfo('false')
    setLessInfo('true')
  }

  function clickedButtonLessInfo() {
    setMoreInfo('true')
    setLessInfo('false')
  }

  return (
    <div>
      <section className='current-weather-card'>
        <h3>{props.currentTemp}</h3>
        {!lessInfo && moreInformation}
      </section>
      <section className='more-information'>
       {!moreInfo && <button onClick={clickedButtonMoreInfo}>More Info</button>}
       {moreInfo && <button onClick={clickedButtonLessInfo}>Less Info</button>}
      </section>
    </div>
  )
}

export default HomeWeatherCard
