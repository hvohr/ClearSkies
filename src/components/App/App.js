import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import { fetchWeather, fetchLongLat, fetchCityName } from '../apiCall'
import { useState, useEffect } from 'react'

function App() {
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
    fetchCityName(currentLat, currentLong).then(
      data => setCurrentCity(data[0].name)
    )
  })
  function error() {
    console.log("Unable to retrieve your location, please allow location services");
  }
  const [currentLat, setCurrentLat] = useState('')
  const [currentLong, setCurrentLong] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  return (
    <section className>
      <Routes>
          <Route path ='/' element={<Home currentCity={currentCity}/>}/>
          <Route path ='/home' element={<Home />}/>
      </Routes>
    </section>
  );
}

export default App;
