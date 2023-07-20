import NavBar from './NavBar'
import './pages.css'
import { fetchWeather, fetchLongLat } from '../components/apiCall'
import { useEffect, useState } from 'react'
import HomeWeatherCard from '../components/WeatherCard/HomeWeatherCard'
import Form from '../components/Form/Form'
import CityOptions from '../components/CityOptions/CityOptions'

function Home(props) {
  const [currentTemp, setCurrentTemp] = useState('')
  const [changedCity, setChangedCity] = useState('')
  const [changedState, setChangedState] = useState('')
  const [changedLat, setChangedLat] = useState('')
  const [changedLong, setChangedLong] = useState('')
  const [changed, setChanged] = useState(false)
  const [buttonList, setButtonList] = useState([])
  const [showButtons, setShowedButtons] = useState(false)
  const [currentDescription, setCurrentDescription] = useState('')
  const [currentUVI, setCurrentUVI] = useState('')
  const [currentWindSpeed, setCurrentWindSpeed] = useState('')
  const [currentFeelsLike, setCurrentFeelsLike] = useState('')
  const [currentCloudCover, setCurrentCloudCover] = useState('')
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('')

  function fetchCityWeather() {
    if (!props.currentLong || !props.currentLat) {
      return false
    } else
      setChangedCity(props.currentCity)
    setChangedState(props.currentState)
    fetchWeather(props.currentLat, props.currentLong).then(
      data => {
        setCurrentTemp(data.current.temp)
        setCurrentDescription(data.current.weather[0].description)
        setCurrentCloudCover(data.current.clouds)
        setCurrentUVI(data.current.uvi)
        setCurrentFeelsLike(data.current.feels_like)
        setCurrentWindSpeed(data.current.wind_speed)
        setCurrentWeatherIcon(data.current.weather[0].icon)
      })
  }
  function findLongLat() {
    if (!changedCity && changed === false) {
      return false
    }
    fetchLongLat(changedCity).then(
      data => {
        let filter = data.filter((d) => d.country === "US")
        setButtonList(filter)
      })
  }

  useEffect(() => {
    findLongLat()
    fetchNewWeather()
  }, [changedCity])

  useEffect(() => {
    console.log(changedLat)
    fetchNewWeather()
  }, [changedLong, changedLat])

  useEffect(() => {
    fetchCityWeather()
  }, [props.currentCity])

  function checkChange() {
    setChanged(true)
    setShowedButtons(true)
  }

  function fetchNewWeather() {
    if (!changedLong || !changedLat) {
      return false
    } else
      fetchWeather(changedLat, changedLong).then(
        data => {
          setCurrentTemp(data.current.temp)
          setCurrentDescription(data.current.weather[0].description)
          setCurrentCloudCover(data.current.clouds)
          setCurrentUVI(data.current.uvi)
          setCurrentFeelsLike(data.current.feels_like)
          setCurrentWindSpeed(data.current.wind_speed)
          setCurrentWeatherIcon(data.current.weather[0].icon)
        })
  }

  function getNewCoordinates(longitude, latitude, state) {
    setChangedLat(latitude)
    setChangedLong(longitude)
    setChangedState(state)
  }

  function submitCity(newCity) {
    setChangedCity(newCity.city)
    setChangedState("...")
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`
  }
  return (
    <div className='home-container'>
      <NavBar />
      <main className='main-container'>
        <section className='user-information'>
          <div className='loading-data-container'>
            <h3 className='current-city'>Your Current Location: {props.currentCity} {props.currentState}</h3>
            {!props.currentCity && <h3 className='loading-data'>Loading Location Data...</h3>}
          </div>
          <h3 className='current-date'>{dateBuilder(new Date())}</h3>
        </section>
        <Form submitCity={submitCity} checkChange={checkChange} />
        {(showButtons) && <CityOptions cityList={buttonList} showedButtons={setShowedButtons} getNewCoordinates={getNewCoordinates} />}
        <section className='current-weather-container'>
          {!changedCity && <h1>Loading...</h1>}
          {changedCity && <h1 style={{ textDecoration: 'underline' }} className='front-card-title'>Current Weather for {changedCity}, {changedState}</h1>}
          <HomeWeatherCard changedState= {changedState} currentWeatherIcon={currentWeatherIcon} currentTemp={currentTemp} currentDescription={currentDescription} currentWindSpeed={currentWindSpeed}
            currentCloudCover={currentCloudCover} currentUVI={currentUVI} currentFeelsLike={currentFeelsLike} />
        </section>
      </main>
    </div>
  )
}

export default Home