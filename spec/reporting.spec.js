const reporting = require("../lib/reporting");

describe("formatMessage", () => {
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

  it("should return an error if empty", () => {
    expect(() => reporting.formatMessage()).toBe(
      "TypeError: Cannot read property 'case' of undefined"
    );
  });
});

describe("sendMessage", () => {
  test.todo("should send a message to slack API");
});
