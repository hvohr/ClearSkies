import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../pages/Home'
import { fetchCityName } from '../apiCall'
import { useState, useEffect } from 'react'
import DailyForecast from '../../pages/DailyForecast';
import CityEvents from '../../pages/CityEvents'
import Error from '../../pages/Error'

function App() {
  const [currentLat, setCurrentLat] = useState('')
  const [currentLong, setCurrentLong] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [currentState, setCurrentState] = useState('')
  const [events, setEvents] = useState([])
  const [reload, setReload] = useState(sessionStorage.getItem('reload'))
  const [category, setCategory] = useState('concerts,sports,community,expos,festivals,performing-arts')
  const [newLat, setNewLat] = useState('')
  const [newLong, setNewLong] = useState('')
  const [fetchError, setFetchError] = useState({error: false, response:''})

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLat(latitude)
    setCurrentLong(longitude)
  }
  function fetchCity() {
    setReload(false)
    if (!currentLong || !currentLat) {
      return false
    } else
      fetchCityName(currentLat, currentLong).then(
        data => (setCurrentCity(data[0].name), setCurrentState(data[0].state))
      ).catch(error => setFetchError({error: true, response: error}))
  }

  const lowercase = () => {
    let newCategory = category.toLowerCase()
    setCategory(newCategory)
  }

  // function reloadPage() {
  //   setReload((current) => !current)
  //   sessionStorage.setItem('reload', reload)
  // }

  useEffect(() => {
    lowercase()
  }, [category])

  useEffect(() => {
    fetchCity()
  }, [currentLat, currentLong])

  function error() {
    alert("Unable to retrieve your location, please allow location services");
  }
  return (
    <div>
      <section>
        <Routes>
          <Route path='/' element={<Home fetchError={fetchError} currentCity={currentCity} currentState={currentState} currentLat={currentLat} currentLong={currentLong} setEvents={setEvents} category={category} setNewLat={setNewLat} setNewLong={setNewLong} />} />
          <Route path='/dailyforecast' element={<DailyForecast currentCity={currentCity} currentState={currentState} currentLat={currentLat} currentLong={currentLong}/>} />
          <Route path='/cityevents' element={<CityEvents events={events} setEvents={setEvents} newLong={newLong} newLat={newLat}/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
        {/* {reload && <Navigate to='/home' />} */}
      </section>
    </div>
  );
}

export default App;
