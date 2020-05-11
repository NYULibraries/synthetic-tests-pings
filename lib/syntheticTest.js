const { sendMessage } = require('./reporting');
const axios = require('axios');

const testHttpResponse = (url) => {
  axios.get(url)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
};

testHttpResponse('https://www.example.com')


const checkUrl = (parameters) => {
  if (!testHttpResponse(parameters)) {
    sendMessage(parameters);
  }
};


module.exports.checkUrl = checkUrl;
module.exports.testHttpResponse = testHttpResponse;
