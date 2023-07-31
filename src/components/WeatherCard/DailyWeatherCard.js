import '../../pages/pages.css'
import { useState } from 'react'

function DailyWeatherCard(props) {
  const [moreDailyInfo, setMoreDailyInfo] = useState(true)
  let moreDailyInformation = <section>
    {(props.changedState === "...") === false && <h3>Feels Like: &nbsp;&nbsp;  {props.currentFeelsLike} F</h3>}
    {(props.changedState === "...") === false && <h3>Cloud Cover:  &nbsp;&nbsp; {props.currentCloudCover}%</h3>}
    {(props.changedState === "...") === false && <h3>UV Index:  &nbsp;&nbsp; {props.currentUVI}</h3>}
    {(props.changedState === "...") === false && <h3>Wind Speed:  &nbsp;&nbsp; {props.currentWindSpeed} mph</h3>}
  </section>

  function clickedButtonMoreInfo() {
    setMoreDailyInfo(false)
  }

  function clickedButtonLessInfo() {
    setMoreDailyInfo(true)
  }

  let filterDays = props.daily.map((day) => {
    var dayname = new Date(day.dt * 1000).toLocaleDateString()
    return (
      <section className='daily-small-container'>
        <h1 className='daily-titles'>{props.changedCity}, {props.changedState}</h1>
        <h3>{dayname}</h3>
        <img className='weather-icons' src={(`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)}></img>
        <h3>{day.temp.day} F</h3>
        <h3 className='daily-summary'>{day.weather[0].description}</h3>
        {!moreDailyInfo && moreDailyInformation}
        {moreDailyInfo && <button className='more-info-buttons' onClick={clickedButtonMoreInfo}>More Info</button>}
        {!moreDailyInfo && <button className='more-info-buttons' onClick={clickedButtonLessInfo}>Less Info</button>}
      </section>
    )
  })
  return (
    <div className='daily-card-container'>
      {filterDays}
    </div>
  )
}

export default DailyWeatherCard
