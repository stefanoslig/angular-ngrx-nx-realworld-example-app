const tsConfig = require('./tsconfig.json');
const { addE2ELocator } = require('./src/config/add-locator');
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/specs/**/*.spec.ts'],
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json'),
    });

    // getting the paths defined in the tsconfig.json, if there are any
    require('tsconfig-paths').register({
      project: './tsconfig.json',
      baseUrl: './',
      paths: tsConfig.compilerOptions.paths,
    });

    // Add custom locator
    addE2ELocator();

    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: 'raw',
        },
      })
    );

    beforeEach(async () => {
      await browser.driver.manage().window().maximize();
    });

    afterEach(async () => {
      await browser.manage().deleteAllCookies();
      await browser.executeScript('window.sessionStorage.clear();');
      await browser.executeScript('window.localStorage.clear();');
    });
  },
};
