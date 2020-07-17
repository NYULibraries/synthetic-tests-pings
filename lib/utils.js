const errorHandler = (error, time) => {
  if (error.stack.includes("timeout")) {
    return { timeout: error.stack, time: time };
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
