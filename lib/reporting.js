const axios = require("axios");

const formatMessage = (params) => {
  if (typeof params !== "object") {
    throw new TypeError("params in formatMessage needs to be an object");
  }
  return `Test failed! Unexpected ${params.case} - Expected: ${params.expected}, Received: ${params.actual}`;
};

const request = async (params) => {
  let postResponse = await axios
    .post(process.env.SLACK_URL, {
      text: formatMessage(params),
    })
    .then(
      (res) => {
        return res;
      },
      (err) => {
        console.error(err);
      }
    );
  return postResponse;
};

const sendMessage = async (params) => {
  let response = await request(params);
  if (response.status === 200) {
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
