const reporting = require("../lib/reporting");
const axios = require('axios');

//receive the http/https response
const httpResponse = async (url) => {
  let apiRes;
  let start;
  try {
    start = Date.now();
    const data = await axios({
      method: 'get',
      url: url,
      maxRedirects: 0,
    })
    apiRes = data;
  } catch (err) {
    apiRes = err.response
  } finally {
    const end = Date.now();
    return { res: apiRes, time: end - start }; 
  }
};

//compare the http/https response against parameters
const testHttpResponse = async ({
  url,
  status,
  responseTime,
  redirectLocation,
}) => {
  const data = await httpResponse(url).catch((e) => {
    console.error(e);
  });

  if (data) {
    const realStatus = data.res.status;
    const realTime = data.time;
    let realRedirectLocation;

    if (realStatus === 301 || realStatus === 302) {
      realRedirectLocation = data.res.headers.location;
      if (
        realRedirectLocation !== redirectLocation &&
        redirectLocation !== undefined
      )
        return {
          case: "relocation",
          actual: realRedirectLocation,
          expected: redirectLocation,
        };
    }

    if (realStatus !== status)
      return { case: "status", actual: realStatus, expected: status };
    if (realTime > responseTime){
      return { case: 'time', actual: realTime, expected: responseTime };
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
    reporting.sendMessage(httpResult);
  }
};

module.exports = {
  checkUrl,
  testHttpResponse,
  httpResponse,
};
