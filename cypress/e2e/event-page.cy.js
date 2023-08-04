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

  cy.intercept("GET", 'https://api.predicthq.com/v1/events/*', {
    headers: {
      "Authorization": 'Bearer TW0c0kaokUkgPralTFAAJubb6uep975yPPhUkEZo'
    },
    statusCode: 200,
    fixture: "eventData.json"
  }).as('eventData')
})

describe('User should see a functioning event page with proper elements', () => {
  it('Should direct a user to a new page when the event page is clicked on', () => {
    cy.visit("http://localhost:3000/")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.event-container').click()
      .wait('@eventData')
      .url().should('include', '/cityevents')
  })
  it('Should have the proper header elements on load', () => {
    cy.visit("http://localhost:3000/cityevents")
      .wait('@locationData')
      .wait('@eventData')
      .get(".conditional-container")
      .contains("ClearSkies")
      .get(".conditional")
      .contains("( Only Available for US States )")
      .get('.nav-bar > :nth-child(2)')
      .contains('Home')
  })
  it('Should have the proper result elements on load', () => {
    cy.visit("http://localhost:3000/cityevents")
      .wait('@locationData')
      .wait('@eventData')
      .get('.radio-background-container').children().should('have.lengthOf', '6')
      .get('.radio-background-container').invoke('text').should('contain', 'Concerts Community Expos Festivals Sports Performing Arts')
      .get('.event-title-container, .filtered-event, .event-date').should('be.visible')
  })
  it('Should make sure filtering works properly', () => {
    cy.visit("http://localhost:3000/cityevents")
      .wait('@locationData')
      .wait('@eventData')
      .get('[type="radio"]').first().check()
      .get(':nth-child(2) > .event-title-container > .event-list-title').invoke('text').should('contain', 'concerts')
  })
})