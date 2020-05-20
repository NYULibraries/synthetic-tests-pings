const formatMessage = (params) => {
  return `Test failed! Unexpected ${params.case}. Expected: ${params.expected}, received: ${params.actual}`;
};

const sendMessage = (messageParams) => {};

module.exports = {
  sendMessage,
  formatMessage,
};
