import { useState } from 'react'


function Form(props) {
  const [city, setCity] = useState('')

  function submitCity(event) {
    event.preventDefault()
    const newCity = {
      id: Date.now(),
      city
    }
    props.addNewCity(newCity)
    clearInput()
  }
  function clearInput() {
    setCity('')
  }
  return (
    <form>
      <input type='text' placeholder='Enter a city name' name='current-forecast' value= {city} onChange={event => setCity(event.target.value)}/>
      <button onClick={event => submitCity(event)}>Change City</button>
    </form>
  )
}

export default Form