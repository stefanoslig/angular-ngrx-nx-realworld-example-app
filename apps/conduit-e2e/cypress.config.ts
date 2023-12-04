import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// @ts-ignore
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    video: true,
    videosFolder: '../../dist/cypress/apps/conduit-e2e/videos',
    screenshotsFolder: '../../dist/cypress/apps/conduit-e2e/screenshots',
    chromeWebSecurity: false,
    specPattern: '**/*.feature',
    excludeSpecPattern: '**/*.ts',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    waitForAnimations: true,
    execTimeout: 60000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    supportFile: './src/support/e2e.ts',
    setupNodeEvents,
  },
});
