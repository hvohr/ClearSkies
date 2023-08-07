import NavBar from './NavBar'
import './pages.css'
import { useEffect, useState } from 'react'
import { fetchEvents, fetchLongLat } from '../components/apiCall'
import {PropTypes} from 'prop-types'


function CityEvents(props) {
  const [lowercase, setLowercase] = useState('concerts,sports,community,expos,festivals,performing-arts')
  const [fetchError, setFetchError] = useState({ error: false, response: '' })
  const [events, setEvents] = useState([])

function googleSearch(query) {
  return window.open('http://google.com/search?q='+ query)
}

  let filteredEvents = events.map((list) => {
    let d = new Date(list.start)
    return (
      <section key={Date.now() + events.indexOf(list)} className='event-information-container'>
        <div className='event-title-container'>
          <h2 className='event-list-title'>{list.category} : {list.title} </h2>
          <h3 className='event-date'>{d.toDateString()}</h3>
        </div>
        <div>
          {list.entities.length === 0 && <h3>No Available Information</h3>}
          {list.entities.map((l) => <div key={Date.now() + list.entities.indexOf(l)}><h3>{l.type}: {l.name}</h3><h3>{l.formatted_address}</h3></div>)}
          <button className='learn-more-button' onClick={() => googleSearch(`${list.title}`)}>Learn More</button>
        </div>
      </section >
    )
  })

  useEffect(() => {
    fetchAllEvents()
  }, [props.currentLat, props.newLat, lowercase])

  function fetchAllEvents() {
    if (props.newLat !== '') {
      fetchEvents(props.newLat, props.newLong, lowercase).then(
        data => {
          console.log(data)
          setEvents(data.results)
        }
      ).catch(error => setFetchError({ error: true, response: error }))
    } else if (props.currentLat !== '') {
      fetchEvents(props.currentLat, props.currentLong, lowercase).then(
        data => {
          setEvents(data.results)
        }
      ).catch(error => setFetchError({ error: true, response: error }))
    }
  }

  function onChangeValue(event) {
    let lowercase = event.target.value.toLowerCase()
    setLowercase(lowercase)
  }

  return (
    <section className='event-whole-container'>
      <NavBar />
      {!fetchError.error && <section>
        <h1 className='event-title'>Upcoming Events</h1>
        <div className='radio-container'>
          <div className='radio-background-container' onChange={event => onChangeValue(event)}>
            <label><input className='radio' type="radio" value="Concerts" name="category" /> Concerts</label>
            <label><input className='radio' type="radio" value="Community" name="category" /> Community</label>
            <label><input className='radio' type="radio" value="Expos" name="category" /> Expos</label>
            <label><input className='radio' type="radio" value="Festivals" name="category" /> Festivals</label>
            <label><input className='radio' type="radio" value="Sports" name="category" /> Sports</label>
            <label><input className='radio' type="radio" value="Performing-Arts" name="category" /> Performing Arts</label></div>
        </div>
        {!events && <h1 className='loading-events'>Loading Events....</h1>}
        <section className='filtered-events'>
          {filteredEvents}
        </section>
      </section>}
      {fetchError.error && <div className='fetch-failed-container'><h1 className='fetch-failed-response'>{`${fetchError.response}`}</h1><img alt="sad cloud raining inside a blue box" className='fetch-failed-image' src={require('../components/images/sad_cloud.png')}></img></div>}
    </section>
  )
}

CityEvents.propTypes = {
  currentLat: PropTypes.any,
  currentLong: PropTypes.any,
  newLong: PropTypes.any,
  newLat: PropTypes.any
}

export default CityEvents