import { useState } from 'react'
import '../../pages/pages.css'

function Form(props) {
  const [city, setCity] = useState('')
  const [empty, setEmpty] = useState(false)

  function submitCity(event) {
    event.preventDefault()
    const newCity = {
      id: Date.now(),
      city
    }
    props.submitCity(newCity)
    props.setAlertMessageOff(false)
    setEmpty(false)
    clearInput()
  }
  function clearInput() {
    setCity('')
  }
  return (
    <form className='front-form'>
      <div className='form-section'>
        <input className='form-input' type='text' placeholder='Enter a city name' name='current-forecast' value={city} onChange={event => {
          if (!event.target.value.includes(',')) {
            setCity(event.target.value)
            setEmpty(false)
          }
        }} />
        <button className='form-button' onClick={event => {
          if (city !== '') {
            submitCity(event)
            setEmpty(false)
            props.checkChange()
          } else {
            event.preventDefault()
            setEmpty(true)
          }
        }
        }>Change City</button>
      </div>
      <div className='error-section'>
        {empty && <h2 className='empty-error'>Please enter a city name</h2>}
      </div>
    </form>
  )
}

export default Form