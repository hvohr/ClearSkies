import '../../pages/pages.css'

function DailyWeatherCard(props) {
  let filterDays = props.daily.map((day) => {
    var dayname = new Date(day.dt * 1000).toLocaleDateString()
    return (
      <section key={Date.now() + props.daily.indexOf(day)} className='daily-small-container'>
        <h1 className='daily-titles'>{props.changedCity}, {props.changedState}</h1>
        <h3>{dayname}</h3>
        <img className='weather-icons' alt ={`small current weather icon of ${day.weather[0].description}`} src={(`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)}></img>
        <h3>{day.temp.day} F</h3>
        <h3 className='daily-summary'>{day.weather[0].description}</h3>
        <div className='extra-daily-info'>
          <h5>H: {day.temp.max}</h5>
          <h5>L: {day.temp.min}</h5>
        </div>
      </section>
    )
  })
  return (
    <div className='daily-card-container'>
      {props.changedState !== "..." && filterDays}
    </div>
  )
}

export default DailyWeatherCard
