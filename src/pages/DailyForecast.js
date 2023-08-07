import NavBar from '../pages/NavBar'
import '../pages/pages.css'
import '../components/WeatherCard/WeatherCard.css'
import DailyForm from '../components/DailyForm/DailyForm'
import { fetchWeather, fetchLongLat } from '../components/apiCall'
import CityOptions from '../components/CityOptions/CityOptions'
import DailyWeatherCard from '../components/WeatherCard/DailyWeatherCard'
import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'

function DailyForecast(props) {
  const [changedCity, setChangedCity] = useState('')
  const [formCity, setFormCity] = useState('')
  const [changedState, setChangedState] = useState('')
  const [changed, setChanged] = useState(false)
  const [showButtons, setShowedButtons] = useState(false)
  const [buttonList, setButtonList] = useState([])
  const [changedLat, setChangedLat] = useState('')
  const [changedLong, setChangedLong] = useState('')
  const [daily, setDaily] = useState([])
  const [fetchError, setFetchError] = useState({ error: false, response: '' })
  const [invalid, setInvalid] = useState(false)
  const [alertMessageOff, setAlertMessageOff] = useState(true)


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day}, ${month} ${date}`
  }

  function submitDailyCity(newCity) {
    setFormCity(newCity.city)
    setButtonList([])
    setChangedState("...")
  }

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
      }).catch(error => setFetchError({ error: true, response: error }))
  }

  function fetchNewDailyWeather() {
    if (!changedLong || !changedLat) {
      return false
    }
    fetchWeather(changedLat, changedLong).then(
      data => {
        setDaily(data.daily)
      }).catch(error => setFetchError({ error: true, response: error }))
  }

  useEffect(() => {
    findLongLat()
    fetchNewDailyWeather()
  }, [changedCity, changedState, formCity])

  useEffect(() => {
    fetchNewDailyWeather()
  }, [changedLong, changedLat])

  function checkChange() {
    setChanged(true)
    setShowedButtons(true)
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

  function getNewCoordinates(longitude, latitude, city, state) {
    setChangedLat(latitude)
    setChangedLong(longitude)
    setChangedCity(city)
    setChangedState(state)
  }

  useEffect(() => {
    findLongLat()
    fetchCityDailyWeather()
  }, [props.currentCity])

  return (
    <section>
      <NavBar />
      {!fetchError.error && <section>
        <div className='daily-top-container'>
          <h1 className='daily-forecast-title'>Next 8 Day Forecast</h1>
          <DailyForm setAlertMessageOff={setAlertMessageOff} submitDailyCity={submitDailyCity} checkChange={checkChange} />
          {invalid && <h2 className='empty-error'>Please enter a valid city</h2>}
          {((!props.alert && daily.length === 0) || props.changedState === "...") && <h1>Loading...</h1>}
          {(!invalid && showButtons === true && changed === true) && <CityOptions changed={changed} showedButtons={setShowedButtons} cityList={buttonList} getNewCoordinates={getNewCoordinates} />}
          {(alertMessageOff && props.alert) && <section className='user-location-warning'><div className='top-warning'><h1>No current location data available</h1><img className='location-icon' src={require('../components/images/block.png')}></img></div><h1 className='location-instructions'>Turn location services on to view current city weather</h1></section>}
        </div>
        <div>
          <DailyWeatherCard date={dateBuilder(new Date())} changedCity={changedCity} changedState={changedState} daily={daily} />
        </div>
      </section>}
      {fetchError.error && <div className='fetch-failed-container'><h1 className='fetch-failed-response'>{`${fetchError.response}`}</h1><img alt="sad cloud raining inside a blue box" className='fetch-failed-image' src={require('../components/images/sad_cloud.png')}></img></div>}
    </section>
  )
}

DailyForecast.propTypes = {
  currentLat: PropTypes.any,
  currentLong: PropTypes.any,
  currentCity: PropTypes.string,
  currentState: PropTypes.string
}


export default DailyForecast