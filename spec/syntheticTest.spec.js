const syntheticTest = require("../lib/syntheticTest");
const reporting = require("../lib/reporting");
const axios = require("axios");

describe("testHttpResponse", () => {
  describe("without a response url", () => {
    it("should throw an error", () => {
      expect.assertions(1);
      return syntheticTest
        .testHttpResponse()
        .catch((e) => expect(e.message).toMatch("undefined"));
    });
  });

  describe("for a successful response url", () => {
    it("should return true for a matching success status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/",
        expectedStatus: 200,
      });
      expect(test).toBe(true);
    });

    it("should return false for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/",
        expectedStatus: 200,
        expectedResponseTime: 1,
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for a wrong status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/",
        expectedStatus: 201,
        expectedResponseTime: 500,
      });
      expect(test).toMatchObject({ case: "status" });
    });
  });

  describe("for a not found url", () => {
    it("should return true for a matching error status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/not/existing/path",
        expectedStatus: 404,
      });
      expect(test).toBe(true);
    });

    it("should return false for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/not/existing/path",
        expectedStatus: 404,
        expectedResponseTime: 1,
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for a wrong status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/not/existing/path",
        expectedStatus: 500,
        expectedResponseTime: 500,
      });
      expect(test).toMatchObject({ case: "status" });
    });
  });

  describe("for a redirecting url", () => {
    it("should return true for the correct status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com/",
        expectedStatus: 301,
      });
      expect(test).toBe(true);
    });

    it("should return false for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com",
        expectedStatus: 301,
        expectedResponseTime: 1,
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for an incorrect status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.google.com/",
        expectedStatus: 302,
      });
      expect(test).toMatchObject({ case: "status" });
    });

    it("should return true for the correct status code and redirect location", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com/",
        expectedStatus: 301,
        expectedResponseTime: 500,
        expectedRedirectLocation: "http://www.google.com/",
      });
      expect(test).toBe(true);
    });

    it("should return false with correct redirect location for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com/",
        expectedStatus: 301,
        expectedResponseTime: 1,
        expectRedirectLocation: "http://www.google.com/",
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for the correct status code and incorrect redirect location", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com",
        expectedStatus: 301,
        expectedRedirectLocation: "https://www.example.com/",
      });
      expect(test).toMatchObject({ case: "relocation" });
    });
  });
});

describe("checkUrl", () => {
  beforeEach(() => {
    reporting.sendMessage = jest.fn();
  });

  it("should call sendMessage when testHttpResponse returns false", async () => {
    const test = await syntheticTest.checkUrl({
      url: "https://www.google.com",
      expectedStatus: 201,
      expectedResponseTime: 1,
    });
    expect(reporting.sendMessage).toHaveBeenCalled();
  });

  it("should not call sendMessage when testHttpResponse returns true", async () => {
    const test = await syntheticTest.checkUrl({
      url: "https://www.example.com",
      expectedStatus: 200,
      expectedResponseTime: 500,
    });
    expect(reporting.sendMessage).not.toHaveBeenCalled();
  });
});

describe("httpResponse", () => {
  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValueOnce({ status: 200 })
  })
  it("should resolve the requests ", async () => {
    const testParam = "http://library.nyu.edu"
    return syntheticTest
    .httpResponse(testParam)
    .then((data)=> expect(data).toEqual({"res": { status: 200 }, "time": 0}))
  });
});
