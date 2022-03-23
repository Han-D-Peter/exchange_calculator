describe('Input value Test', () => {
  it('should go to homepage', () => {
    cy.visit('http://localhost:3000')
      .title()
      .should('eq', 'Exchange Calculator');
  });
  it('Error of typing number over 10,000 in AmountInput', () => {
    cy.visit('http://localhost:3000')
      .get('[name="toExchangeAmount"]')
      .type('100000')
      .get('[data-cy=submit]')
      .click()
      .get('[data-cy=formErrTextBox]')
      .should(
        'have.text',
        '송금액이 바르지 않습니다. 10,000이하의 값을 넣어주세요',
      );
  });
  it('Error of typing number under 0 in AmountInput', () => {
    cy.visit('http://localhost:3000')
      .get('[data-cy=submit]')
      .click()
      .get('[data-cy=formErrTextBox]')
      .should('have.text', '송금액이 바르지 않습니다. 0이상의 값을 넣어주세요');
  });
});
