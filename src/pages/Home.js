import NavBar from './NavBar'
import './pages.css'

function Home(props) {
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
          <h1 className='front-card-title'>Today's Forecast for {props.currentCity}</h1>
        </section>
      </main>
    </div>
  )
}

export default Home