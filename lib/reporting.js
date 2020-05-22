const axios = require("axios");

const formatMessage = (params) => {
  if (typeof params !== "object") {
    throw new TypeError("params in formatMessage needs to be an object");
  }
  return `Test failed! Unexpected ${params.case} - Expected: ${params.expected}, Received: ${params.actual}`;
};

const request = (params) => {
  return axios
    .post(
      "https://hooks.slack.com/services/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",
      {
        text: formatMessage(params),
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

const sendMessage = async (params) => {
  let response = await request(params);
  if (response.status === 200) {
    console.log(response);
    return true;
  } else {
    return false;
  }
};

module.exports = {
  request,
  sendMessage,
  formatMessage,
};
