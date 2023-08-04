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

describe('Should have proper error handling in forms and fetch functions', () => {
  it('Should not let a user enter wrong information into home form', () => {
    cy.visit("http://localhost:3000/")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.form-button').click()
      .get('.empty-error').should('be.visible')
    cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/direct*', {
      statusCode: 200,
      fixture: "newCityData.json"
    }).as('newCityData')
      .get('.form-input').type('noexistingcity').get('.form-button').click()
      .get('.empty-error').should('be.visible')
  })
  it('Should not let a user enter wrong information into daily form', () => {
    cy.visit("http://localhost:3000/dailyforecast")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.form-button').click()
      .get('.empty-error').should('be.visible')
    cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/direct*', {
      statusCode: 200,
      fixture: "newCityData.json"
    }).as('newCityData')
      .get('.form-input').type('noexistingcity').get('.form-button').click()
      .get('.empty-error').should('be.visible')
  })
})

