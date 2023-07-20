import NavBar from '../pages/NavBar'
import Form from '../components/Form/Form'
import { fetchWeather, fetchLongLat } from '../components/apiCall'
import CityOptions from '../components/CityOptions/CityOptions'
import HomeWeatherCard from '../components/WeatherCard/HomeWeatherCard'
import { useState, useEffect } from 'react'

function DailyForecast(props) {
  const [changedCity, setChangedCity] = useState('')
  const [changedState, setChangedState] = useState('')
  const [changedLat, setChangedLat] = useState('')
  const [changedLong, setChangedLong] = useState('')
  const [changed, setChanged] = useState(false)
  const [showButtons, setShowedButtons] = useState(false)
  const [buttonList, setButtonList] = useState([])
  const [dailyDescription, setCurrentDescription] = useState('')
  const [dailyUVI, setCurrentUVI] = useState('')
  const [dailyWindSpeed, setCurrentWindSpeed] = useState('')
  const [dailyTemp, setCurrentTemp] = useState('')
  const [dailyFeelsLike, setCurrentFeelsLike] = useState('')
  const [dailyCloudCover, setCurrentCloudCover] = useState('')
  const [dailyWeatherIcon, setCurrentWeatherIcon] = useState('')

  function fetchCityDailyWeather() {
    if (!props.currentLong || !props.currentLat) {
      return false
    }
    setChangedCity(props.currentCity)
    setChangedState(props.currentState)
    fetchWeather(props.currentLat, props.currentLong).then(
      data => {
        console.log(data)
      })
  }

  useEffect(() => {
    fetchCityDailyWeather()
  }, [props.currentCity, props.currentState])

  return (
    <section>
      <NavBar />
      <div className='daily-top-container'>
        <h1 className='daily-forecast-title'>5 Day Forecast For {changedCity}, {changedState}</h1>
        <Form />
      </div>
    </section>
  )
}


export default DailyForecast