const axios = require("axios");
const { api } = require('../secrets');

const formatMessage = (params) => {
  if (typeof params !== "object") {
    throw new TypeError("params in formatMessage needs to be an object");
  }
  return `Test failed! Unexpected ${params.case} - Expected: ${params.expected}, Received: ${params.actual}`;
};

const request = (params) => {
  return axios
		.post(
			api,
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
  try {
  let response = await request(params);
	if (response.status === 200) {
		return true;
	} else {
		return false;
	}
  }catch (e) {
    console.error(e)
  }

};

module.exports = {
  request,
  sendMessage,
  formatMessage,
};
