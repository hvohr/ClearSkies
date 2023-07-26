import '../../pages/pages.css'
import { useState } from 'react'

function DailyWeatherCard(props) {
  let filterDays = props.daily.map((day) => {
    var dayname = new Date(day.dt * 1000).toLocaleDateString()
    return (
      <section className='daily-small-container'>
        <h1 className='daily-titles'>{props.changedCity}, {props.changedState}</h1>
        <h3>{dayname}</h3>
        <img className='weather-icons' src={(`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)}></img>
        <h3>{day.temp.day} F</h3>
        <h3 className='daily-summary'>{day.weather[0].description}</h3>
        <button className='more-info-buttons'>More Info</button>
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
