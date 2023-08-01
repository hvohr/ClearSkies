import NavBar from './NavBar'

function CityEvents(props) {
  let filteredEvents = props.events.map((list) => {
    let d = new Date(list.start)
    return (
      <section className='event-information-container'>
        <div className='event-title-container'>
          <h2>{list.category} : {list.title} </h2>
          <h3>{d.toDateString()}</h3>
        </div>
        <div>
          {list.entities.map((l) => <div><h3>{l.type}: {l.name}</h3><h3>{l.formatted_address}</h3></div>)}
        </div>
      </section >
    )
  })
  function onChangeValue(event) {
    props.setCategory(event.target.value)
  }
  return (
    <section>
      <NavBar />
      <h1 className='event-title'>Upcoming Events</h1>
      <div className='radio-container'>
        <div onChange={event => onChangeValue(event)}>
          <input type="radio" value="Concerts" name="category" /> Concerts
          <input type="radio" value="Community" name="category" /> Community
          <input type="radio" value="Expos" name="category" /> Expos
          <input type="radio" value="Festivals" name="category" /> Festivals
          <input type="radio" value="Sports" name="category" /> Sports
          <input type="radio" value="Performing-Arts" name="category" /> Performing Arts
        </div>
      </div>
      <section>
        {filteredEvents}
      </section>
    </section>
  )
}

export default CityEvents