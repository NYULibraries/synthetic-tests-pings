const formatMessage = (params) => {
  if(typeof params !== "object"){
    throw new TypeError("params in formatMessage needs to be an object")
  }
  return `Test failed! Unexpected ${params.case}. Expected: ${params.expected}, received: ${params.actual}`;
};

const sendMessage = (messageParams) => {};

module.exports = {
  sendMessage,
  formatMessage,
};
