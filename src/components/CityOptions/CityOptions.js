import { useState } from 'react'

function CityOptions(props) {
  const [invalid, setInvalid] = useState(false)
  return (
    <section className='city-options-container'>
      {(props.cityList.length !== 0 && props.changed === true) && props.cityList.map((city) => <button onClick={() => {
          props.showedButtons()
          props.getNewCoordinates(city.lon, city.lat, city.state)
          props.setButtonList([])
      }} className='city-button'>{city.name}, {city.state}</button>)}
      {(props.cityList.length === 0) && <h1>Loading...</h1>}
    </section>
  )
}

export default CityOptions