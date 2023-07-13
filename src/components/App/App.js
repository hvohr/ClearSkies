import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import { fetchWeather, fetchLongLat, fetchCityName } from '../apiCall'
import { useState, useEffect } from 'react'

function App() {
  const [currentLat, setCurrentLat] = useState('')
  const [currentLong, setCurrentLong] = useState('')
  const [currentCity, setCurrentCity] = useState('')

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
  useEffect(() => {
    console.log(currentLat)
    fetchCityName(currentLat, currentLong).then(
      data => setCurrentCity(data[0].name)
    )
  }, [currentLat, currentLong])
  function error() {
    console.log("Unable to retrieve your location, please allow location services");
  }
  return (
    <section>
      <Routes>
        <Route path='/' element={<Home currentCity={currentCity} />} />
        <Route path='/home' element={<Home currentCity={currentCity} />} />
      </Routes>
    </section>
  );
}

export default App;
