const path = require('path');

const stepDefinitionsPath = path.resolve(process.cwd(), './src/integration');

module.exports = {
  nonGlobalStepDefinitions: true,
  stepDefinitions: stepDefinitionsPath,
};
