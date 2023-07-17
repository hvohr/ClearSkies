import { useState } from 'react'

function CityOptions(props) {
const [showButtons, setShowButtons] = useState(true)
  return (
    <div>
    <button>City</button>
    <button>City</button>
    <button>City</button>
    </div>
  )
}

export default CityOptions