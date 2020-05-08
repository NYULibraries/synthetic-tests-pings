const { sendMessage } = require('./reporting');

const testHttpResponse = ({ url }) => `URL ${url} responded!`;

const checkUrl = (parameters) => {
  if (!testHttpResponse(parameters)) {
    sendMessage(parameters);
  }
};


module.exports.checkUrl = checkUrl;
module.exports.testHttpResponse = testHttpResponse;
