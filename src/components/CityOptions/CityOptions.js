function CityOptions(props) {
  return (
    <section className='city-options-container'>
      {(props.cityList && props.changed === true) && props.cityList.map((city) => <button onClick={() => {
        props.showedButtons()
        props.getNewCoordinates(city.lon, city.lat, city.state)
      }} className='city-button'>{city.name}, {city.state}</button>)}
      {(!props.cityList) && <h1>Please enter a valid US City</h1>}
    </section>
  )
}

export default CityOptions