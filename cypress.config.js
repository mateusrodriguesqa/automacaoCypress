const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://marketplace-alpha.tendaatacado.com.br",
    specPattern: "testes/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    chromeWebSecurity: false, 
  },
});
