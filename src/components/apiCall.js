async function fetchWeather(lat, lon, part) {
  let response = await fetch (`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=d8adc478c0760c8921ea232122e47253`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  let data = await response.json()
  return data
}

export default fetchWeather