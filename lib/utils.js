// called in httpResponse, handles if test exceeds expected time
const errorHandler = (error, expectedTime) => {
  if (error.stack.includes("timeout")) {
    return { timeout: error.stack, time: expectedTime };
  }
  console.error(error.stack);
};

// called in testHttpResponseTest, tests if status is a redirection status
const isRedirectStatus = ({
  realStatus,
  dataHeaders,
  expectedRedirectLocation,
}) => {
  const redirectStatuses = {
    301: true,
    302: true,
  };
  let realRedirectLocation;

  if (redirectStatuses.hasOwnProperty(realStatus)) {
    realRedirectLocation = dataHeaders.location;
    // if we are provided with an expected redirection location, test if it is the right one
    if (
      !realRedirectLocation.includes(expectedRedirectLocation) &&
      expectedRedirectLocation !== undefined
    ) {
      return "false";
    }
    return "true";
  }
};

module.exports = {
  errorHandler,
  isRedirectStatus,
};
