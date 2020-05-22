const reporting = require("../lib/reporting");
const axios = require("axios");

jest.mock('axios');

describe("formatMessage", () => {
  it("should throw an error if empty/wrong type", () => {
    expect(() => reporting.formatMessage()).toThrow();
    expect(() => reporting.formatMessage("watermelon")).toThrow();
  });

  it("should return a string response", () => {
    expect(
      typeof reporting.formatMessage({ case: "", actual: "", expected: "" })
    ).toEqual("string");
  });

  it("should return accurate message for status trigger", () => {
    const testParams = { case: "status", actual: 201, expected: 200 };
    expect(reporting.formatMessage(testParams)).toEqual(
      "Test failed! Unexpected status - Expected: 200, received: 201"
    );
  });
});

describe("sendMessage", () => {  
  it("should resolve the request with 200", async () => {
    const res = { 
      status: 200
    }
    axios.post.mockResolvedValue(res);
    return reporting.request({}).then(data => expect(data.status).toEqual(200))
  });
});
