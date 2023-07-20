import { useState } from 'react'

function CityOptions(props) {
  return (
    <section className='city-options-container'>
    {props.cityList && props.cityList.map((city) => <button onClick={() => {
      props.showedButtons()
      props.getNewCoordinates(city.lon, city.lat, city.state)
}} className='city-button'>{city.name}, {city.state}</button>)}
    {!props.cityList && <h1>Loading...</h1>}
    </section>
  )
}

export default CityOptions