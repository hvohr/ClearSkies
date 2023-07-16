import NavBar from './NavBar'
import './pages.css'
import { fetchWeather } from '../components/apiCall'
import { useEffect, useState } from 'react'
import HomeWeatherCard from '../components/WeatherCard/HomeWeatherCard'

function Home(props) {
  const [currentTemp, setCurrentTemp] = useState('')
  const [currentDescription, setCurrentDescription] = useState('')
  const [currentUVI, setCurrentUVI] = useState('')
  const [currentWindSpeed, setCurrentWindSpeed] = useState('')
  const [currentFeelsLike,setCurrentFeelsLike] = useState('')
  const [currentCloudCover, setCurrentCloudCover] = useState('')
  const [currentWeatherIcon,setCurrentWeatherIcon] = useState('')

  // function weatherIcon(id) {
  //   return <img src={require(`https://openweathermap.org/img/wn/${id}@2x.png`)}></img>
  // }

  function fetchCityWeather() {
    if (!props.currentLong || !props.currentLat) {
      //figure out how to make below work
      return <h2 className='loading-data'>Loading Location Data...</h2>
    } else
      fetchWeather(props.currentLat, props.currentLong).then(
        data => {
          setCurrentTemp(data.current.temp)
        }
      )
  }

  useEffect(() => {
    fetchCityWeather()
  })

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
          {!props.currentCity && <h3 className='loading-data'>Loading Location Data...</h3>}
          <h3 className='current-city'>Your Current Location: {props.currentCity} {props.currentState}</h3>
          <h3 className='current-date'>{dateBuilder(new Date())}</h3>
        </section>
        <section className='current-weather-container'>
          <h1 className='front-card-title'>Current Weather for {props.currentCity}</h1>
          <HomeWeatherCard currentTemp={currentTemp}/>
        </section>
      </main>
    </div>
  )
}

export default Home