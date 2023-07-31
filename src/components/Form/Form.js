import { useState } from 'react'
import '../../pages/pages.css'


function Form(props) {
  const [city, setCity] = useState('')

  function submitCity(event) {
    event.preventDefault()
    const newCity = {
      id: Date.now(),
      city
    }
    props.submitCity(newCity)
    clearInput()
  }
  function clearInput() {
    setCity('')
  }
  return (
    <form>
      <input className='form-input' type='text' placeholder='Enter a city name' name='current-forecast' value={city} onChange={event => {
        if (!event.target.value.includes(',')) {
          setCity(event.target.value)
        }
      }} />
      <button className='form-button' onClick={event => {
        console.log(city)
        if (city === '') {
          return <h1 className='empty-input-error'>Please enter a city name</h1>
        } else {
          submitCity(event)
          props.checkChange()
        }
      }
      }>Change City</button>

    </form>
  )
}

export default Form