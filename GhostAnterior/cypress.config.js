const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true,
    viewportWidth: 1920, // Ancho del viewport
    viewportHeight: 1080, // Alto del viewport
    env: {
      GHOST_VERSION: "5.96.0",
      GHOST_PORT: "2368"
    }
  },
  trashAssetsBeforeRuns: true,
});
