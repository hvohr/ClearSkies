import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import { fetchCityName } from '../apiCall'
import { useState, useEffect } from 'react'


function App() {
  const [currentLat, setCurrentLat] = useState('')
  const [currentLong, setCurrentLong] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [currentState, setCurrentState] = useState('')

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
    if (!currentLong || !currentLat) {
      //figure out how to make below work
      return <h2 className='loading-data'>Loading Location Data...</h2>
    } else
      fetchCityName(currentLat, currentLong).then(
        data => (setCurrentCity(data[0].name), setCurrentState(data[0].state))
      )
  }

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
          <Route path='/' element={<Home currentCity={currentCity} currentState={currentState} currentLat={currentLat} currentLong={currentLong} />} />
          <Route path='/home' element={<Home currentCity={currentCity} currentState={currentState} />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
