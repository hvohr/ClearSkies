import NavBar from './NavBar'

function CityEvents(props) {
  let filteredEvents = props.events.map((list) => {
    console.log(list)
    return (
      <div>
        <h2>{list.category} : {list.title}</h2>
        {list.entities.map((l) => <h3>{l.type}: {l.name}</h3>)}
      </div>
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