describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('Başarılı form doldurulduğunda submit edebiliyor ve success sayfasını gösteriyor', () => {
    cy.get('[data-cy="input-email"]').type('yagmur@example.com');
    cy.get('[data-cy="input-password"]').type('Yagmur1234');
    cy.get('[data-cy="input-accepted"]').check();
    cy.get('[data-cy="submit-btn"]').should('not.be.disabled').click();

    cy.get('[data-cy="success-page"]').should('be.visible');
    cy.contains('Başarıyla giriş yaptınız!').should('be.visible');
  });

  it('Email yanlış girildiğinde 1 tane hata mesajı görünür ve buton disabled kalır', () => {
    cy.get('[data-cy="input-email"]').type('yanlis-email');
    cy.get('[data-cy="input-password"]').type('Yagmur1234');
    cy.get('[data-cy="input-accepted"]').check();

    cy.get('[data-cy^="error-"]').should('have.length', 1);
    cy.get('[data-cy="error-email"]').should('contain.text', 'Geçerli email giriniz.');

    cy.get('[data-cy="submit-btn"]').should('be.disabled');
  });

  it('Email ve password yanlış girildiğinde 2 hata mesajı görünür ve buton disabled kalır', () => {
    cy.get('[data-cy="input-email"]').type('yanlis-email');
    cy.get('[data-cy="input-password"]').type('123');
    cy.get('[data-cy="input-accepted"]').check();

    cy.get('[data-cy^="error-"]').should('have.length', 2);
    cy.get('[data-cy="error-email"]').should('contain.text', 'Geçerli email giriniz.');
    cy.get('[data-cy="error-password"]').should('contain.text', 'Şifre güçlü olmalı.');

    cy.get('[data-cy="submit-btn"]').should('be.disabled');
  });

  it('Email ve password doğru ama şartlar kabul edilmediğinde buton disabled kalır', () => {
    cy.get('[data-cy="input-email"]').type('yagmur@example.com');
    cy.get('[data-cy="input-password"]').type('Yagmur1234');

    cy.get('[data-cy="input-accepted"]').should('not.be.checked');

    cy.get('[data-cy="submit-btn"]').should('be.disabled');

    cy.get('[data-cy="error-accepted"]').should('contain.text', 'Şartları kabul etmelisiniz.');
  });
});
