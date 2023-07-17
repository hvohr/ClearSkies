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
      <input type='text' placeholder='Enter a city name' name='current-forecast' value={city} onChange={event => setCity(event.target.value)} />
      <button onClick={event => {
        submitCity(event)
        props.checkChange()
      }
      }>Change City</button>
    </form>
  )
}

export default Form