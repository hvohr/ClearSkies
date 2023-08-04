import NavBar from './NavBar'
import { useEffect, useState } from 'react'
import { fetchEvents } from '../components/apiCall'

function CityEvents(props) {
  const [lowercase, setLowercase] = useState('concerts,sports,community,expos,festivals,performing-arts')
  const [fetchError, setFetchError] = useState({ error: false, response: '' })

  // useEffect(() => {
  //   window.onbeforeunload = function() {
  //     return props.reload()
  //   }
  // })

  let filteredEvents = props.events.map((list) => {
    let d = new Date(list.start)
    return (
      <section key={Date.now() + props.events.indexOf(list)} className='event-information-container'>
        <div className='event-title-container'>
          <h2 className='event-list-title'>{list.category} : {list.title} </h2>
          <h3 className='event-date'>{d.toDateString()}</h3>
        </div>
        <div>
          {list.entities.length === 0 && <h3>No Available Information</h3>}
          {list.entities.map((l) => <div key={Date.now() + list.entities.indexOf(l)}><h3>{l.type}: {l.name}</h3><h3>{l.formatted_address}</h3></div>)}
        </div>
      </section >
    )
  })

  function fetchFilteredCityEvents() {
    if (!props.newLat || !props.newLong || !lowercase) {
      return false
    } else {
      fetchEvents(props.newLat, props.newLong, lowercase).then(
        data => {
          console.log(data.results)
          props.setEvents(data.results)
        }
      ).catch(error => setFetchError({ error: true, response: error }))
    }
  }

  useEffect(() => {
    fetchFilteredCityEvents()
  }, [lowercase])

  function onChangeValue(event) {
    let lowercase = event.target.value.toLowerCase()
    setLowercase(lowercase)
  }

  return (
    <section>
      {!fetchError.error && <section>
        <NavBar />
        <h1 className='event-title'>Upcoming Events</h1>
        <div className='radio-container'>
          <div className='radio-background-container' onChange={event => onChangeValue(event)}>
            <input type="radio" value="Concerts" name="category" /> Concerts
            <input type="radio" value="Community" name="category" /> Community
            <input type="radio" value="Expos" name="category" /> Expos
            <input type="radio" value="Festivals" name="category" /> Festivals
            <input type="radio" value="Sports" name="category" /> Sports
            <input type="radio" value="Performing-Arts" name="category" /> Performing Arts</div>
        </div>
        {!props.events.length && <h1 className='loading-events'>Loading Events....</h1>}
        <section className='filtered-events'>
          {filteredEvents}
        </section>
      </section>}
      {fetchError.error && <div className='fetch-failed-container'><h1 className='fetch-failed-response'>{`${fetchError.response}`}</h1><img alt="sad cloud raining inside a blue box" className='fetch-failed-image' src={require('../components/images/sad_cloud.png')}></img></div>}
    </section>
  )
}

export default CityEvents