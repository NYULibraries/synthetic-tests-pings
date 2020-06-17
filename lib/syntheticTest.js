const reporting = require("../lib/reporting");
const axios = require("axios");

//receive the http/https response
const httpResponse = async (url) => {
  let apiRes;
  let start;
  try {
    start = Date.now();
    const data = await axios({
      method: "get",
      url: url,
      maxRedirects: 0,
    });
    apiRes = data;
  } catch (err) {
    apiRes = err.response;
  } finally {
    const end = Date.now();
    return { res: apiRes, time: end - start };
  }
};

//compare the http/https response against parameters
const testHttpResponse = async ({
  url,
  expectedStatus,
  expectedResponseTime,
  expectedRedirectLocation,
}) => {
  const data = await httpResponse(url).catch((e) => {
    console.error(e);
  });

  if (data) {
    const realStatus = data.res.status;
    const realTime = data.time;
    let realRedirectLocation;
    expectedStatus = Number(expectedStatus);
    expectedResponseTime = Number(expectedResponseTime);

    if (realStatus === 301 || realStatus === 302) {
      realRedirectLocation = data.res.headers.location;
      if (
        realRedirectLocation !== expectedRedirectLocation &&
        expectedRedirectLocation !== undefined
      )
        return {
          case: "relocation",
          actual: realRedirectLocation,
          expected: expectedRedirectLocation,
          url: url
        };
    }

    if (realStatus !== expectedStatus) {
      return { case: "status", actual: realStatus, expected: expectedStatus, url: url };
    }
    if (realTime > expectedResponseTime) {
      return { case: "time", actual: realTime, expected: expectedResponseTime, url: url };
    }
    return true;
  }
};

//call sendMessage if the http/https response is unexpected
const checkUrl = async (parameters) => {
  const httpResult = await testHttpResponse(parameters).catch((e) =>
    console.error(e)
  );
  if (httpResult !== true) {
    await reporting.sendMessage(httpResult);
    return `Test failed: Sent message to Slack with parameters: ${JSON.stringify(parameters)}`
  }
  return 'Test passed, did not send message to Slack'
};

module.exports = {
  checkUrl,
  testHttpResponse,
  httpResponse,
};
