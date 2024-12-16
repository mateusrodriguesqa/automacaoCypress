describe('Teste Regressivo: Adicionar ao Carrinho', () => {
  it('Deve realizar login, acessar o menu "Comprar por Departamento", navegar para "Marca Própria" e adicionar o produto ao carrinho', () => {
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

      cy.log('Removendo overlay "black-block" se estiver presente');
      cy.get('.black-block').then(($overlay) => {
        if ($overlay.is(':visible')) {
          cy.get('.black-block').invoke('hide');
        }
      });

      cy.log('Clicando no menu "Comprar por Departamento"');
      cy.contains('Comprar por departamento', { timeout: 15000 }).click({ force: true });

      cy.log('Esperando o menu expandir');
      cy.wait(1000);
      cy.get('.MegaMenuComponent', { timeout: 15000 });

      cy.log('Selecionando submenu "Marca Própria"');
      cy.get('.list-departaments > li > a.item-menu[href="/produtos-select"]')

      cy.log('Selecionando produto "Açúcar Refinado Especial Select 1kg"');
      cy.contains('Açúcar Refinado Especial Select 1kg', { timeout: 10000 })
        .scrollIntoView()
        .within(() => {
        });

      cy.log('Voltando para a tela Home');
      cy.visit('/');

      cy.log('Rolando até o final da página');
      cy.scrollTo('bottom');
      cy.wait(2000);

      cy.log('Selecionando produto "Refrigerante Sabor Limão Sprite 2"');
      cy.contains('.showcase-card-content.grid_view', 'Refrigerante Sabor Limão Sprite 2')
        .scrollIntoView()
        .should('be.visible')
        .within(() => {
        });

      cy.log('Clique no botão do carrinho');
      cy.get('.icon-cart-ball')
        .click({ force: true });

      cy.log('Aguardando a página do carrinho carregar completamente');
      cy.url().should('include', '/carrinho');
      cy.get('.loading-indicator', { timeout: 10000 }).should('not.exist');
      cy.get('.btn.btn-finish-order.btn-block')
        .scrollIntoView()
        .should('exist')
        .click({ force: true });

      //cy.log('Excluindo entrega do produto "Benedito ME Fantasia"');
      //cy.contains('.content-header-package-separation', 'Entrega 2') 
      //.scrollIntoView()
      //.should('be.visible')
      //.within(() => {
      //cy.contains('Excluir entrega') 
      //.should('be.visible')
      //.click(); 
      //});

      // Aguardar o modal de exclusão aparecer
      //cy.log('Aguardando o modal de confirmação de exclusão aparecer');
      //cy.get('#modal-delete-seller-package', { timeout: 10000 }) 
      //.should('be.visible');

      // Clicando no botão "Continuar" para finalizar a exclusão
      //cy.log('Clicando no botão "Continuar" no modal de exclusão');
      //cy.get('#modal-delete-seller-package') 
      //.should('be.visible') 
      //.within(() => {
      //cy.contains('button', 'Continuar') 
      //.should('be.visible')
      //.click({ force: true }); 
      //});

      cy.log('Clicando no botão "Finalizar compra"');
      cy.get('button.btn.btn-finish-order.btn-block', { timeout: 20000 })
        .scrollIntoView()
        .should('exist')
        .and('not.be.disabled')
        .click({ force: true })
        .then(() => {
          cy.log('Botão "Finalizar compra" clicado com sucesso.');
        });

      cy.log('Aguardando o redirecionamento para a página de checkout');
      cy.url({ timeout: 10000 }).should('include', '/checkout');

      cy.log('Selecionando a aba "Cartão de Crédito"');
      cy.contains('span', 'Cartão de crédito')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.log('Aguardando o formulário de pagamento com cartão de crédito aparecer');
      cy.get('form').should('be.visible');

      cy.log('Preenchendo os dados do cartão de crédito');
      cy.get('input[name="cardNumber"], input#number')
        .should('be.visible')
        .type('4000000000000010', { force: true });
      cy.log('Abrindo o dropdown do campo "Mês"');
      cy.get('div[id="month"] .react-select__dropdown-indicator')
        .should('be.visible')
        .click({ force: true });
      cy.get('.react-select__menu')
        .contains('12')
        .click();

      cy.log('Abrindo o dropdown do campo "Ano"');
      cy.get('div[id="year"] .react-select__dropdown-indicator')
        .should('be.visible')
        .click({ force: true });

      cy.log('Selecionando o ano');
      cy.get('.react-select__menu')
        .contains('2026')
        .click();

      cy.log('Preenchendo o campo CVV');
      cy.get('#cvv')
        .should('be.visible')
        .type('123', { force: true });

      cy.log('Preenchendo o campo "Nome impresso no cartão"');
      cy.get('input[placeholder="Nome impresso no cartão"], input[name="cardHolderName"]')
        .should('be.visible')
        .type('JOAO SILVA', { force: true });

      cy.log('Preenchendo o campo "CPF do titular"');
      cy.get('input[placeholder="CPF do titular"], input[name="cpf"], input#cpf')
        .should('be.visible')
        .type('508.572.558-19', { force: true });

      cy.log('Clicando no botão "Pagar com cartão de crédito"');
      cy.contains('button', 'Pagar com cartão de crédito')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.log('Verificando a URL final da compra');
      cy.url({ timeout: 20000 })
        .should('include', '/resumo-pedido');



    });
  });
});