import './WeatherCard.css'


function WeatherCard(props) {
  console.log(props)
  return (
    <section className='weatherCard'>
      <h1>Today's Forecast</h1>
      <h2>{props.currentCity}, {props.currentState}</h2>
    </section>
  )
}

export default WeatherCard
