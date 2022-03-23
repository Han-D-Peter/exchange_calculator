describe('Select Box Test', () => {
  it('Sending country select', () => {
    cy.visit('/')
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
