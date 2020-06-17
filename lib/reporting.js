const axios = require("axios");

//format the message sent to Slack
const formatMessage = (params) => {
  if (typeof params !== "object") {
    throw new TypeError("params in formatMessage needs to be an object");
  }
  return `Testing ${params.url}. Unexpected ${params.case} - Expected: ${params.expected}, Received: ${params.actual}`;
};

//post the message to the Slack channel
const postSlack = async (params) => {
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

//call postSlack and await a response
const sendMessage = async (params) => {
  let response = await postSlack(params);
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  postSlack,
  sendMessage,
  formatMessage,
};
