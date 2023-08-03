beforeEach(() => {
  cy.intercept("GET", 'https://api.openweathermap.org/data/3.0/onecall*', {
    statusCode: 200,
    fixture: "weatherData.json"
  }).as('allweather').visit("http://localhost:3000/")
})
// beforeEach(() => {
//     cy.intercept("GET", 'https://api.openweathermap.org/geo/1.0/direct*', {
//       statusCode: 200,
//       fixture: "weatherData.json"
//     }).as('citynameweather').visit("http://localhost:3000/")
//   })


describe('User should see a home page with proper navigation elements', () => {
  it('Should have a title', () => {
    cy.wait('@allweather')
      .wait('@citynameweather')
      .get(".nav-title")
      .contains("ClearSkies")
  })
})
