import '../../pages/pages.css'
import { useState } from 'react'

function DailyWeatherCard(props) {
  let filterDays = props.daily.map((day, index) => {
    var dayname = new Date(day.dt * 1000).toLocaleDateString()
    return (
      <section className='daily-small-container'>
        <h1>{props.changedCity}, {props.changedState}</h1>
        <h3>{dayname}</h3>
        <img src={(`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)}></img>
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
