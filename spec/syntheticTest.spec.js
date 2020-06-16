const syntheticTest = require("../lib/syntheticTest");
const reporting = require("../lib/reporting");

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
        status: 200,
      });
      expect(test).toBe(true);
    });

    it("should return false for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/",
        status: 200,
        responseTime: 1,
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for a wrong status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/",
        status: 201,
        responseTime: 500,
      });
      expect(test).toMatchObject({ case: "status" });
    });
  });

  describe("for a not found url", () => {
    it("should return true for a matching error status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/not/existing/path",
        status: 404,
      });
      expect(test).toBe(true);
    });

    it("should return false for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/not/existing/path",
        status: 404,
        responseTime: 1,
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for a wrong status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.example.com/not/existing/path",
        status: 500,
        responseTime: 500,
      });
      expect(test).toMatchObject({ case: "status" });
    });
  });

  describe("for a redirecting url", () => {
    it("should return true for the correct status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com/",
        status: 301,
      });
      expect(test).toBe(true);
    });

    it("should return false for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com",
        status: 301,
        responseTime: 1,
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for an incorrect status code", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://www.google.com/",
        status: 302,
      });
      expect(test).toMatchObject({ case: "status" });
    });

    it("should return true for the correct status code and redirect location", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com/",
        status: 301,
        responseTime: 500,
        redirectLocation: "http://www.google.com/",
      });
      expect(test).toBe(true);
    });

    it("should return false with correct redirect location for response not received in specified time", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com/",
        status: 301,
        responseTime: 1,
        redirectLocation: "http://www.google.com/",
      });
      expect(test).toMatchObject({ case: "time" });
    });

    it("should return false for the correct status code and incorrect redirect location", async () => {
      const test = await syntheticTest.testHttpResponse({
        url: "http://google.com",
        status: 301,
        redirectLocation: "https://www.example.com/",
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
      status: 201,
      responseTime: 1,
    });
    expect(reporting.sendMessage).toHaveBeenCalled();
  });

  it("should not call sendMessage when testHttpResponse returns true", async () => {
    const test = await syntheticTest.checkUrl({
      url: "https://www.example.com",
      status: 200,
      responseTime: 500,
    });
    expect(reporting.sendMessage).not.toHaveBeenCalled();
  });
});
