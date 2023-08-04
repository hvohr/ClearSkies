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

  cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall*', {
    statusCode: 200,
    fixture: "newLatLongData.json"
  }).as('newLatLongData')

  cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/direct*', {
    statusCode: 200,
    fixture: "NewCityData.json"
  }).as('NewCityData')

  cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/reverse*', {
    statusCode: 200,
    fixture: "newLocationData.json"
  }).as('newLocationData')
})

describe('User should see a functioning daily page with proper elements', () => {
  it('Should take a user from home to daily forecast page on dailyforecast button click', () => {
    cy.visit("http://localhost:3000/")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.daily-button').click()
      .url('/dailyforecast')
  })
  it('Should have proper header elements', () => {
    cy.visit("http://localhost:3000/dailyforecast")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get(".conditional-container")
      .contains("ClearSkies")
      .get(".conditional")
      .contains("( Only Available for US States )")
      .get('.nav-bar > :nth-child(2)')
      .contains('Home')
  })
  it('Should contain all proper page elements', () => {
    cy.visit("http://localhost:3000/dailyforecast")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.daily-top-container').invoke('text')
      .should('contain', "Next 8 Day Forecast")
      .get('.form-input, .form-button').should('be.visible')
      .get('.daily-card-container').children().should('have.lengthOf', 8)
  })
  it('Should contain proper specific daily card elements for each day', () => {
    cy.visit("http://localhost:3000/dailyforecast")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.daily-card-container').children().should('contain', "Denver, Colorado")
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let todayDate = `${month}/${day}/${year}`
    const date2 = new Date();
    let day2 = date2.getDate() + 1;
    let month2 = date2.getMonth() + 1;
    let year2 = date2.getFullYear();
    let tomorrowDate = `${month2}/${day2}/${year2}`
    cy.get('.daily-card-container > :nth-child(1) > :nth-child(2)').invoke('text').should('contain', todayDate)
      .get('.daily-card-container > :nth-child(2) > :nth-child(2)').invoke('text').should('contain', tomorrowDate)
      .get(':nth-child(1) > .weather-icons, .daily-card-container > :nth-child(1) > :nth-child(4), :nth-child(1) > .daily-summary,:nth-child(1) > .extra-daily-info').should('be.visible')
  })
  it('Should display updated information when a new city is entered in the form', () => {
    cy.visit("http://localhost:3000/dailyforecast")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.form-input').type('Denver')
      .get('.form-button').click()
      .get('.city-options-container').should('be.visible')
      .get('.city-options-container').children().should('have.lengthOf', 4)
      .get('.city-options-container > :nth-child(2)').click()
      .get('.city-options-container').should('not.exist')
      .get('.daily-titles').invoke('text').should('contain', "Denver, Iowa")
      .get(':nth-child(1) > .weather-icons, .daily-card-container > :nth-child(1) > :nth-child(4), :nth-child(1) > .daily-summary,:nth-child(1) > .extra-daily-info').should('be.visible')
  })
})