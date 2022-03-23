describe('Select Box Test', () => {
  it('Sending country select', () => {
    cy.visit('http://localhost:3000')
      .get('[name=country]')
      .first()
      .select('AUD')
      .get('[name=country]')
      .last()
      .select('JPY')
      .get('[data-cy=exchangeUnit]')
      .should('eq', 'JPY/AUD');
  });
});
