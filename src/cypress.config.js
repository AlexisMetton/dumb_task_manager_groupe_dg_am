const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    // pageLoadTimeout: 180000, // Augmentez à 3 minutes si nécessaire
    // responseTimeout: 120000, // Attendre jusqu'à 2 minutes pour les réponses HTTP
    // retries: 2,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
