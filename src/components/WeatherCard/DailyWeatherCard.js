import '../../pages/pages.css'
import { useState } from 'react'

function DailyWeatherCard(props) {
  let filterDays = props.daily.map((day) => {
    return (
      <section className='daily-small-container'>
        <h1>{props.changedCity}, {props.changedState}</h1>
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
