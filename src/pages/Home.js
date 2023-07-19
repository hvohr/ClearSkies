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
  const [changed, setChanged] = useState(false)
  const [buttonList, setButtonList] = useState([])
  const [showButtons, setShowedButtons] = useState(true)
  const [currentDescription, setCurrentDescription] = useState('')
  const [currentUVI, setCurrentUVI] = useState('')
  const [currentWindSpeed, setCurrentWindSpeed] = useState('')
  const [currentFeelsLike, setCurrentFeelsLike] = useState('')
  const [currentCloudCover, setCurrentCloudCover] = useState('')
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('')

  function fetchCityWeather() {
    if (!props.currentLong || !props.currentLat) {
      //figure out how to make below work
      return <h2 className='loading-data'>Loading Location Data...</h2>
    } else
      setChangedCity(props.currentCity)
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
    console.log(changedCity)
    if (!changedCity && changed === false) {
      return <h1>Loading...</h1>
    }
    fetchLongLat(changedCity).then(
      data => setButtonList(data))
  }

  let buttonDisplay = <CityOptions cityList={buttonList} showedButtons={setShowedButtons}/>

  useEffect(() => {
    findLongLat()
  }, [changedCity])

  useEffect(() => {
    fetchCityWeather()
  }, [props.currentCity])

  function checkChange() {
    setChanged(true)
  }

  // function listCities(city, state) {
  //   setChangedCity(city)
  //   setChangedState(state)
  // }

  function submitCity(newCity) {
    setChangedCity(newCity.city)
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
        {(!showButtons && showButtons) && buttonDisplay}
        <section className='current-weather-container'>
          {!changedCity && <h1>Loading...</h1>}
          {changedCity && <h1 style={{ textDecoration: 'underline' }} className='front-card-title'>Current Weather for {changedCity}</h1>}
          <HomeWeatherCard currentWeatherIcon={currentWeatherIcon} currentTemp={currentTemp} currentDescription={currentDescription} currentWindSpeed={currentWindSpeed}
            currentCloudCover={currentCloudCover} currentUVI={currentUVI} currentFeelsLike={currentFeelsLike} />
        </section>
      </main>
    </div>
  )
}

export default Home