const reporting = require("../lib/reporting");

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
      "Test failed! Unexpected status. Expected: 200, received: 201"
    );
  });
});

describe("sendMessage", () => {
  const FakeSlack = () => {
    return { statusCode: 200, response: "ok" };
  };
  reporting.makeRequest = jest.fn(FakeSlack);
  it("should send a request to Slack", () => {
    expect(reporting.sendMessage()).toBeTruthy();
  });
});
