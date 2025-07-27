describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('Başarılı form doldurulduğunda submit edebiliyor ve success sayfasını gösteriyor', () => {
    cy.get('[data-cy="input-email"]').type('valid@example.com');
    cy.get('[data-cy="input-password"]').type('Valid1234');
    cy.get('[data-cy="input-accepted"]').check();
    cy.get('[data-cy="submit-btn"]').should('not.be.disabled').click();


    cy.get('[data-cy="success-page"]').should('be.visible');
    cy.contains('Başarıyla giriş yaptınız!').should('be.visible');
  });
   });
