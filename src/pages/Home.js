import NavBar from './NavBar'
import './pages.css'
import { fetchWeather, fetchLongLat } from '../components/apiCall'
import { useEffect, useState } from 'react'
import HomeWeatherCard from '../components/WeatherCard/HomeWeatherCard'
import Form from '../components/Form/Form'
import CityOptions from '../components/CityOptions/CityOptions'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'


function Home(props) {
  const [currentTemp, setCurrentTemp] = useState('')
  const [changedCity, setChangedCity] = useState('')
  const [changedState, setChangedState] = useState('')
  const [formCity, setFormCity] = useState('')
  const [alert, setAlert] = useState([])
  const [changedLat, setChangedLat] = useState('')
  const [changedLong, setChangedLong] = useState('')
  const [changed, setChanged] = useState(false)
  const [showButtons, setShowedButtons] = useState(false)
  const [buttonList, setButtonList] = useState([])
  const [currentDescription, setCurrentDescription] = useState('')
  const [currentUVI, setCurrentUVI] = useState('')
  const [currentWindSpeed, setCurrentWindSpeed] = useState('')
  const [currentFeelsLike, setCurrentFeelsLike] = useState('')
  const [currentCloudCover, setCurrentCloudCover] = useState('')
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [fetchError, setFetchError] = useState({ error: false, response: '' })
  const [alertMessageOff, setAlertMessageOff] = useState(true)

  function fetchCityWeather() {
    if (!props.currentLong || !props.currentLat) {
      return false
    }
    setChangedCity(props.currentCity)
    setChangedLat(props.currentLat)
    setChangedLong(props.currentLong)
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
      }).catch(error => setFetchError({ error: true, response: error }))
  }
  function findLongLat() {
    if ((!formCity && changed === false)) {
      return false
    }
    fetchLongLat(formCity).then(
      data => {
        let filter = data.filter((d) => d.country === "US")
        if (filter.length === 0) {
          setInvalid(true)
        } else if (changed === true) {
          setButtonList(filter)
          setInvalid(false)
        }
      }).catch(error => setFetchError({ error: true, response: error }))
  }

  useEffect(() => {
    props.setNewLat(changedLat)
    props.setNewLong(changedLong)
  }, [changedLat, changedLong])

  useEffect(() => {
    findLongLat()
    fetchNewWeather()
  }, [changedCity, changedState])

  useEffect(() => {
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
    }
    fetchWeather(changedLat, changedLong).then(
      data => {
        if (data.alerts) {
          setAlert(data)
        } else {
          setAlert([])
        }
        setCurrentTemp(data.current.temp)
        setCurrentDescription(data.current.weather[0].description)
        setCurrentCloudCover(data.current.clouds)
        setCurrentUVI(data.current.uvi)
        setCurrentFeelsLike(data.current.feels_like)
        setCurrentWindSpeed(data.current.wind_speed)
        setCurrentWeatherIcon(data.current.weather[0].icon)
      }).catch(error => setFetchError({ error: true, response: error }))
  }

  function getNewCoordinates(longitude, latitude, city, state) {
    setChangedLat(latitude)
    setChangedLong(longitude)
    setChangedCity(city)
    setChangedState(state)
  }

  function submitCity(newCity) {
    setFormCity(newCity.city)
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
      {!fetchError.error && <main className='main-container'>
        <section className='user-information'>
          <div className='loading-data-container'>
            <h3 className='current-city'>{props.currentCity} {props.currentState}</h3>
            {(!props.alert && !props.currentCity) && <h3 className='current-city'>Loading Location Data...</h3>}
            {props.alert && <h3 className='current-city-loading'>Unable to obtain current location</h3>}
          </div>
          <h3 className='current-date'>{dateBuilder(new Date())}</h3>
        </section>
        <Form setAlertMessageOff={setAlertMessageOff} submitCity={submitCity} checkChange={checkChange} />
        {invalid && <h2 className='empty-error'>Please enter a valid city</h2>}
        {(showButtons === true && changed === true && !invalid) && <CityOptions changed={changed} setButtonList={setButtonList} showedButtons={setShowedButtons} cityList={buttonList} getNewCoordinates={getNewCoordinates} />}
        <section className='event-container'>
          {(changedCity && !showButtons) && <Link to='/cityevents'>
            <img className='event-logo' alt="small map icon" src={require('../components/images/marker.png')} />
            <button className='events-button'>View Events in {changedCity}</button>
          </Link>}
        </section>
        {(!alertMessageOff || !props.alert) && <section className='current-weather-container'>
          {(!alertMessageOff && !props.alert && !changedCity) && <h1>Loading...</h1>}
          <div className='alert-container'>
            {(alert.length !== 0 && !showButtons) && alert.alerts.map((a) => <h3 key={Date.now() + alert.alerts.indexOf(a)} style={{ border: "2px solid red" }} className='weather-alert'>{a.event}</h3>)}
          </div>
          {(changedCity && changedState !== '...') && <h1 className='front-card-title'>Current Weather for {changedCity}, {changedState}</h1>}
          <HomeWeatherCard showButtons={showButtons} invalid={invalid} changedState={changedState} currentWeatherIcon={currentWeatherIcon} currentTemp={currentTemp} currentDescription={currentDescription} currentWindSpeed={currentWindSpeed}
            currentCloudCover={currentCloudCover} currentUVI={currentUVI} currentFeelsLike={currentFeelsLike} />
        </section>}
        {(alertMessageOff && props.alert) && <section className='user-location-warning'><div className='top-warning'><h1>No current location data available</h1><img className='location-icon' src={require('../components/images/block.png')}></img></div><h1 className='location-instructions'>Turn location services on to view current city weather</h1></section>}
      </main>}
      {fetchError.error && <div className='fetch-failed-container'><h1 className='fetch-failed-response'>{`${fetchError.response}`}</h1><img alt="sad cloud raining inside a blue box" className='fetch-failed-image' src={require('../components/images/sad_cloud.png')}></img></div>}
    </div>
  )
}

Home.propTypes = {
  currentLat: PropTypes.any,
  currentLong: PropTypes.any,
  currentCity: PropTypes.string,
  currentState: PropTypes.string,
  category: PropTypes.string
}

export default Home