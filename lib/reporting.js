const axios = require("axios");

// format the message sent to Slack
const formatMessage = (params) => {
  if (params === undefined) {
    throw new TypeError("params in formatMessage is undefined");
  } else if (typeof params !== "object") {
    throw new TypeError("params in formatMessage needs to be an object");
  }
  if (params.case === "time") {
    return `Testing ${params.url}. Exceeded maximum time of ${params.time}.`;
  }
  return `Testing ${params.url}. Unexpected ${params.case} - Expected: ${params.expected}, Received: ${params.actual}`;
};

// post the message to the Slack channel
const postSlack = async (params) => {
  const postResponse = await axios
    .post(
      process.env.SLACK_URL,
      { text: formatMessage(params) },
      { timeout: 1000 }
    )
    .then(
      (res) => {
        return res;
      },
      (err) => {
        console.error(`${err.name} ${err.stack}`);
      }
    );
  return postResponse;
};

// call postSlack and await a response
const sendMessage = async (params) => {
  const response = await postSlack(params);
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

const pushToProm = async (result, prometheusApp) => {
  let payload = "nyulibraries_web_synthetic_tests_unexpected_status_code_total"

  if(result){
    payload += " 0"
  } else {
    payload += " 1" 
  }

  try {
    await axios({
      method: "post",
      url: process.env.PROM_URL + prometheusApp,
      data: "\n" + payload + "\n",
      auth: {
        username: process.env.HTTP_AUTH_USER,
        password: process.env.HTTP_AUTH_PASSWORD
      },
      headers: {
        'Accept': '*/*',
        'Content-Length': 0,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
      responseType: 'text'
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  postSlack,
  sendMessage,
  formatMessage,
  pushToProm
};
