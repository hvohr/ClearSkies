async function fetchWeather(lat, lon) {
  const response = await fetch(`https://ap.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=d8adc478c0760c8921ea232122e47253`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data
}

async function fetchLongLat(cityname) {
  let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=10&appid=d8adc478c0760c8921ea232122e47253`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  let data = await response.json()
  return data
}

async function fetchCityName(lat, lon) {
  let response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=d8adc478c0760c8921ea232122e47253`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  let data = await response.json()
  return data
}

async function fetchEvents(lat, lon, category) {
  const response = await fetch(`https://api.predicthq.com/v1/events/?location_around.origin=${lat},${lon}&category=${category}&limit=20&active.gte=2023-08-03&within=50mi@${lat},${lon}`, {
    method: "GET",
    headers: {
      "Authorization": 'Bearer TW0c0kaokUkgPralTFAAJubb6uep975yPPhUkEZo'
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  let data = await response.json()
  return data
}


export { fetchWeather, fetchLongLat, fetchCityName, fetchEvents }