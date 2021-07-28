/// <reference types="cypress" />

// first verify the navbar contains all the proper elemnts
// thne verify that all the navbar links work

describe('Test Navigation', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000');
  });

  // Check if all elements in the navbar are visible
  it('checks navigation elements exist', () => {
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

    // Open search modal
    cy.get(
      '#root > div > div > header > div > div > div > div.hidden.md\\:flex.items-center.border.p-1\\.5.border-gray-300.rounded-md.cursor-pointer.md\\:flex-1.lg\\:w-0'
    ).click();

    // Look for searchbar
    cy.wait(2000);
    cy.get(
      'body > div:nth-child(10) > div > div > div.mt-6.rounded-md > div > div.flex.flex-grow.w-auto.rounded-md.border.border-gray-300.p-2.rounded-br-none.rounded-tr-none > input'
    ).type('zen');
    cy.wait(2000);

    // Find search result
    cy.get(
      'body > div:nth-child(10) > div > div > div.mt-6.rounded-md > div:nth-child(2) > div'
    ).should('be.visible');

    // Close search modal
    cy.get(
      'body > div:nth-child(10) > div > div > div.flex.flex-row.justify-between.mt-5 > div.flex.justify-end > div'
    ).click();
  });

  it('checks navigation links work', () => {
    // Test images link
    cy.get(
      '#root > div > div > header > div > div > div > div.flex.flex-row.justify-start'
    ).click();

    cy.url().should('include', '/');

    // Test popular products link
    cy.contains('Popular Products').click();

    cy.url().should('include', '/popular-products');

    // Test brands
    cy.contains('Brands').click();

    cy.url().should('include', '/brands');
  });
});
