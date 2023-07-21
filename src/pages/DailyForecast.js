import NavBar from '../pages/NavBar'
import Form from '../components/Form/Form'
import { fetchWeather, fetchLongLat } from '../components/apiCall'
import CityOptions from '../components/CityOptions/CityOptions'
import DailyWeatherCard from '../components/WeatherCard/DailyWeatherCard'
import { useState, useEffect } from 'react'

function DailyForecast(props) {
  const [changedCity, setChangedCity] = useState('')
  const [changedState, setChangedState] = useState('')
  const [changedLat, setChangedLat] = useState('')
  const [changedLong, setChangedLong] = useState('')
  const [daily, setDaily] = useState([])

  function fetchCityDailyWeather() {
    if (!props.currentLat || !props.currentLong) {
      return false
    }
    setChangedCity(props.currentCity)
    setChangedState(props.currentState)
    fetchWeather(props.currentLat, props.currentLong).then(
      data => {
        setDaily(data.daily)
        setChangedCity(props.currentCity)
      })
  }

  useEffect(() => {
    fetchCityDailyWeather()
  }, [props.currentCity])

  return (
    <section>
      <NavBar />
      <div className='daily-top-container'>
        <h1 className='daily-forecast-title'>Next 8 Day Forecast</h1>
        <Form />
      </div>
      <div>
        <DailyWeatherCard changedCity={changedCity} changedState={changedState} daily={daily} />
      </div>
    </section>
  )
}


export default DailyForecast