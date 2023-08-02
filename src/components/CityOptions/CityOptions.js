import { useState } from 'react'

function CityOptions(props) {
  return (
    <section className='city-options-container'>
      {(props.cityList.length !== 0 && props.changed === true) && props.cityList.map((city) => <button onClick={() => {
          props.showedButtons()
          props.getNewCoordinates(city.lon, city.lat, city.state)
          props.setButtonList([])
      }} key={Date.now() + props.cityList.indexOf(city)} className='city-button'>{city.name}, {city.state}</button>)}
      {(props.cityList.length === 0) && <h1>Loading...</h1>}
    </section>
  )
}

export default CityOptions