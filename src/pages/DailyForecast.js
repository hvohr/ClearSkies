import NavBar from '../pages/NavBar'
import DailyForm from '../components/DailyForm/DailyForm'
import { fetchWeather, fetchLongLat } from '../components/apiCall'
import CityOptions from '../components/CityOptions/CityOptions'
import DailyWeatherCard from '../components/WeatherCard/DailyWeatherCard'
import { useState, useEffect } from 'react'

function DailyForecast(props) {
  const [changedCity, setChangedCity] = useState('')
  const [changedState, setChangedState] = useState('')
  const [changed, setChanged] = useState(false)
  const [showButtons, setShowedButtons] = useState(false)
  const [buttonList, setButtonList] = useState([])
  const [changedLat, setChangedLat] = useState('')
  const [changedLong, setChangedLong] = useState('')
  const [daily, setDaily] = useState([])
  const [fetchError, setFetchError] = useState({ error: false, response: '' })

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day}, ${month} ${date}`
  }

  useEffect(() => {
    window.onbeforeunload = function() {
      return props.reload()
    }
  })

  function submitDailyCity(newCity) {
    setChangedCity(newCity.city)
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
  }, [changedCity, changedState])

  useEffect(() => {
    fetchNewDailyWeather()
  }, [changedLong, changedLat])

  function checkChange() {
    setChanged(true)
    setShowedButtons(true)
  }

  function findLongLat() {
    if ((!changedCity && changed === false)) {
      return false
    }
    fetchLongLat(changedCity).then(
      data => {
        let filter = data.filter((d) => d.country === "US")
        if (changed === true) {
          setButtonList(filter)
        }
      }).catch(error => setFetchError({ error: true, response: error }))
  }

  function getNewCoordinates(longitude, latitude, state) {
    setChangedLat(latitude)
    setChangedLong(longitude)
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
          <DailyForm submitDailyCity={submitDailyCity} checkChange={checkChange} />
          {(daily.length === 0 && props.changedState === "...") && <h1>Loading...</h1>}
          {(showButtons === true && changed === true) && <CityOptions changed={changed} setButtonList={setButtonList} showedButtons={setShowedButtons} cityList={buttonList} getNewCoordinates={getNewCoordinates} />}
        </div>
        <div>
          <DailyWeatherCard date={dateBuilder(new Date())} changedCity={changedCity} changedState={changedState} daily={daily} />
        </div>
      </section>}
      {fetchError.error && <div className='fetch-failed-container'><h1 className='fetch-failed-response'>{`${fetchError.response}`}</h1><img alt="sad cloud raining inside a blue box" className='fetch-failed-image' src={require('../components/images/sad_cloud.png')}></img></div>}
    </section>
  )
}


export default DailyForecast