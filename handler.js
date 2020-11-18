"use strict";
require('dotenv').config()
const { checkUrl, pushToProm } = require("./lib/syntheticTest");

module.exports.syntheticTest = async (event, context) => {
  const appName = process.env.APP ? process.env.APP : "appNameNotProvided"

  const testVariables = {
    url: process.env.TEST_URL,
    expectedStatus: process.env.EXPECTED_CODE,
    expectedResponseTime: process.env.EXPECTED_RESPONSE_TIME_MS,
    expectedRedirectLocation: process.env.EXPECTED_REDIRECT_LOCATION,
  };

  let result = await checkUrl(testVariables);

  if (appName !== "appNameNotProvided") await pushToProm(result.success, appName);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: result.message,
        success: result.success,
        time: Date.now(),
      },
      null,
      2
    ),
  };
};