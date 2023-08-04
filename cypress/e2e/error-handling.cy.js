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
  it('Should show error image and message when user goes to the wrong route/url', () => {
    cy.visit("http://localhost:3000/nonexistingpage")
      .get('.error-icon').should('be.visible')
      .get('nav').should('be.visible')
      .get('.home-button').click()
      .url("http://localhost:3000/")
  })
  it('Should show an error image and message on home page when a fetch issue occurs', () => {
    cy.visit("http://localhost:3000/")
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall*', {
      statusCode: 404,
      fixture: "latLongData.json"
      }).as('fetchFail')
      .get('.fetch-failed-image, .fetch-failed-response').should('be.visible')
  })
  it('Should show an error image and message on daily page when a fetch issue occurs', () => {
    cy.visit("http://localhost:3000/dailyforecast")
    cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall*', {
      statusCode: 404,
      fixture: "latLongData.json"
      }).as('fetchFail')
      .get('.fetch-failed-image, .fetch-failed-response').should('be.visible')
  })
})

