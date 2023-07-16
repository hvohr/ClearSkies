import './HomeWeatherCard.css'


function HomeWeatherCard(props) {
  return (
    <div>
    <section className='current-weather-card'>
      <h3>{props.currentTemp}</h3>
    </section>
    <section className='more-information'>
      <button>Click to see more information</button>
    </section>
    </div>
  )
}

export default HomeWeatherCard
