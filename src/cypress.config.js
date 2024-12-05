const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    pageLoadTimeout: 180000, // Temps d'attente pour charger les pages
    responseTimeout: 120000, // Temps d'attente pour les réponses HTTP
    defaultCommandTimeout: 10000, // Temps d'attente par commande Cypress
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
