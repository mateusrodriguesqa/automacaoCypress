describe('Teste Regressivo: Adicionar ao Carrinho', () => {
    it('Deve realizar login, navegar até Marketplace e adicionar o produto ao carrinho', () => {
      cy.fixture('user').then((user) => {
      
        cy.log('Iniciando o fluxo de login');
        cy.visit('/'); 
  
        cy.get('.ReactModal__Overlay').then(($popup) => {
          if ($popup.is(':visible')) {
            cy.get('.ButtonClose').click(); 
            cy.get('.ReactModal__Overlay').should('not.exist'); 
          }
        });
  
        cy.get('#userTopArea').should('be.visible').click(); 
        cy.get('input[placeholder="E-mail ou CPF"]').type(user.email); 
        cy.get('input[placeholder="Senha"]').type(user.senha); 
        cy.contains('Continuar').should('be.visible').click();
        cy.url().should('include', 'https://marketplace-alpha.tendaatacado.com.br/'); 
  
        cy.log('Rolando até a seção Marketplace');
        cy.scrollTo('bottom'); 
        cy.contains('Refresco Em Pó Morango Tang 18g 2', { timeout: 10000 }) // 
          .click(); 

        cy.log('Selecionando o produto Refresco em Pó');
        cy.get('.showcase-card-content.grid_view', { timeout: 10000 }) 
          .should('be.visible') 
          .first() 
          .click(); 

      });
    });
  });
  