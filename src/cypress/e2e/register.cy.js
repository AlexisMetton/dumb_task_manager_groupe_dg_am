describe('Page Register', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display the register form', () => {
    cy.get('form[action="/register"]').should('be.visible');
    cy.get('input[name="username"]').should('have.attr', 'placeholder', 'Username');
    cy.get('input[name="email"]').should('have.attr', 'placeholder', 'Email');
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Password');
    cy.get('button[type="submit"]').should('contain.text', 'Register');
  });

  it('should display an error message on failed registration', () => {
    cy.get('form').fillFormAndSubmit({
      username: { text: 'alex' },
      email: { text: 'alex@gmail.com' },
      password: { text: 'alex' },
    });

    cy.get('#message_error').should('be.visible').and('contain.text', 'Le nom d\'utilisateur ou l\'email existe déjà.');
  });

  it('should redirect to /tasks on successful registration', () => {
    cy.get('form').fillFormAndSubmit({
      username: { text: 'newuser' },
      email: { text: 'newuser@gmail.com' },
      password: { text: 'newUser' },
    });

    cy.url().should('include', '/tasks');
  });

  it('should redirect to login page when clicking Sign in', () => {
    cy.get('#link_login').click();
    cy.url().should('include', '/login');
  });

});
