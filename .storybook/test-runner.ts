const { checkA11y, injectAxe } = require('axe-playwright');

// add automatic accessibility tests to smoke/interaction tests to the "test-storybook" script
module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        detailedReportOptions: {
          html: true,
        },
      },
    });
  },
};
