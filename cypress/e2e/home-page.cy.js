beforeEach(() => {
  cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall*', {
      statusCode: 200,
      fixture: "weatherData.json"
    }).as('allweather')

    cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/direct*', {
      statusCode: 200,
      fixture: "weatherData.json"
    }).as('citynameweather')

    cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/reverse*', {
      statusCode: 200,
      fixture: "weatherData.json"
    }).as('longlatweather')
})

describe('User should see a home page with proper navigation elements', () => {
  it('Should have a title', () => {
    cy.visit("http://localhost:3000/?delay=500")
    cy.wait('@longlatweather')
    cy.get(".nav-title")
    cy.contains("ClearSkies")
  })
})