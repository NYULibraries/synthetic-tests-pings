'use strict';

const checkUrl = require('./lib/syntheticTest').checkUrl;

module.exports.syntheticTest = async (event, context) => {
  const testVariables = process.env;

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: checkUrl(testVariables.TEST_URL),
        input: event,
      },
      null,
      2
    ),
  };
};
