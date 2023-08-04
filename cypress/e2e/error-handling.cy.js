beforeEach(() => {
  cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall*', {
    statusCode: 200,
    fixture: "latLongData.json"
  }).as('latLongData')

  cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/direct*', {
    statusCode: 200,
    fixture: "cityData.json"
  }).as('cityData')

  cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/reverse*', {
    statusCode: 200,
    fixture: "locationData.json"
  }).as('locationData')
})

