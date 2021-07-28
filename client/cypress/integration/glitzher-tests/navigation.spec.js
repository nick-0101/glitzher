/// <reference types="cypress" />

// first verify the navbar contains all the proper elemnts
// thne verify that all the navbar links work

describe('Test Navigation', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000');
  });

  // Check if all elements in the navbar are visible
  it('Navigation elements exist', () => {
    // Get logo
    cy.get(
      '#root > div > div > header > div > div > div > div.flex.flex-row.justify-start > a > div > div:nth-child(1) > img'
    ).should('be.visible');

    // Get logo text
    cy.get(
      '#root > div > div > header > div > div > div > div.flex.flex-row.justify-start > a > div > div.m-auto.hidden.md\\:flex > img'
    ).should('have.attr', 'src', '/static/media/nav-text.2fac269a.webp');

    // Get Nav link 1
    cy.contains('Popular Products').should('exist');

    // Get Nav link 2
    cy.contains('Brands').should('exist');
  });
});
