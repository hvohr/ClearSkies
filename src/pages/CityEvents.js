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
      <div>
        <input type="radio" name="radio" id="radio1" />
        <label for="radio1">Concerts</label>
        <input type="radio" name="radio" id="radio2" />
        <label for="radio2">Expos</label>
        <input type="radio" name="radio" id="radio3" />
        <label for="radio3">Preforming Arts</label>
        <input type="radio" name="radio" id="radio4" />
        <label for="radio4">Sports</label>
        <input type="radio" name="radio" id="radio5" />
        <label for="radio5">Community</label>
      </div>
      <section>
        {filteredEvents}
      </section>
    </section>
  )
}

export default CityEvents