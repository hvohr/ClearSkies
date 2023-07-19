import { useState } from 'react'

function CityOptions(props) {
let filter = props.cityList.filter((city) => city.country === 'US')
console.log(filter)
  return (
    <section className='city-options-container'>
    <button className='city-button'>{props.cityList[0].name}, {props.cityList[0].state}</button>
    <button className='city-button'>{props.cityList[1].name}, {props.cityList[1].state}</button>
    <button className='city-button'>{props.cityList[2].name}, {props.cityList[2].state}</button>
    <button className='city-button'>{props.cityList[3].name}, {props.cityList[3].state}</button>
    <button className='city-button'>{props.cityList[4].name}, {props.cityList[4].state}</button>
    </section>
  )
}

export default CityOptions