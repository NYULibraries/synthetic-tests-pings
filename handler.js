'use strict';

const { checkUrl } = require('./lib/syntheticTest');

module.exports.syntheticTest = async (event, context) => {
  const testVariables = {
    url: process.env.TEST_URL,
    status: process.env.EXPECTED_CODE,
    responseTime: process.env.EXPECTED_RESPONSE_TIME_MS,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: checkUrl(testVariables),
        input: event,
      },
      null,
      2,
    ),
  };
};
