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
  return (
    <section>
      <NavBar />
      <h1 className='event-title'>Upcoming Events</h1>
      <section>
        {filteredEvents}
      </section>
    </section>
  )
}

export default CityEvents