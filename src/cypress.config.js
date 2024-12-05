const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    pageLoadTimeout: 120000, // Attendre jusqu'à 120 secondes pour le chargement de la page
    responseTimeout: 60000, 
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
