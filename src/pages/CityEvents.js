import NavBar from './NavBar'

function CityEvents(props) {
  let filteredEvents = props.events.map((list) => {
    return (
      <div>
        <h2 key={list.id}>{list.category} : {list.title}</h2>
        <h3>{list.entities[0].type} : {list.entities[0].name}</h3>
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