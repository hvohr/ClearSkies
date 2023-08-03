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

describe('User should see a home page proper elements', () => {
  it('Should have proper header elements', () => {
    cy.visit("http://localhost:3000/")
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
  it('Should have updated local information', () => {
    cy.visit("http://localhost:3000/")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
    const d = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let fulldate = `${day}, ${date} ${month}, ${year}`
    cy.get('.current-date')
      .invoke("text")
      .should('contain', fulldate)
      .get('.current-city').invoke("text")
      .should('contain', 'Denver Colorado')
  })
  it('Should contain form elements', () => {
    cy.visit("http://localhost:3000/")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('form').should('be.visible')
      .get('.form-input').should('be.visible')
      .get('.form-button').should('be.visible')
  })
  it('Should contain current weather front-page elements', () => {
    cy.visit("http://localhost:3000/")
      .wait('@locationData')
      .wait('@cityData')
      .wait('@latLongData')
      .get('.current-weather-container').should('be.visible')
      .get('.current-weather-container').invoke('text')
      .should('contain', 'Current Weather for Denver, Colorado')
      .get('.current-weather-card > :nth-child(3), .current-weather-card > :nth-child(2), .current-weather-card > :nth-child(1)').should('be.visible')
      .get('.more-info-buttons').click()
      .get(".more-information > section > :nth-child(1), .more-information > section > :nth-child(2), .more-information > section > :nth-child(3), .more-information > section > :nth-child(4)").should('be.visible')
  })
})
