const https = require("https");

const formatMessage = (params) => {
  if (typeof params !== "object") {
    throw new TypeError("params in formatMessage needs to be an object");
  }
  return `Test failed! Unexpected ${params.case}. Expected: ${params.expected}, received: ${params.actual}`;
};

const makeRequest = (url, body) => {
  return https.post(url, body);
};

const sendMessage = (messageParams) => {
  response = makeRequest();
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  sendMessage,
  formatMessage,
  makeRequest,
};
