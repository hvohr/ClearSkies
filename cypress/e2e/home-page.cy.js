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

describe('User should see a home page proper elements', () => {
  it('Should have proper header elements', () => {
    cy.visit("http://localhost:3000/?delay=500")
      .wait('@longlatweather')
      .get(".conditional-container")
      .contains("ClearSkies")
      .get(".conditional")
      .contains("( Only Available for US States )")
      .get('.nav-bar > :nth-child(2)')
      .contains('Home')
  })
  it('Should have updated local information', () => {
    cy.visit("http://localhost:3000/?delay=500")
      .wait('@longlatweather')
    const d = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    cy.get('.current-date')
      .invoke("text")
      .should('contain', day, date, month, year)
  })
})
