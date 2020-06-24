const reporting = require("../lib/reporting");
const axios = require("axios");

jest.mock("axios");

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
    const testParams = {
      case: "status",
      actual: 201,
      expected: 200,
      url: "http://library.nyu.edu",
    };
    expect(reporting.formatMessage(testParams)).toEqual(
      "Testing http://library.nyu.edu. Unexpected status - Expected: 200, Received: 201"
    );
  });
});

describe("postSlack", () => {
  it("should resolve the request with 200", async () => {
    const res = { status: 200 };
    axios.post.mockResolvedValue(res);
    return reporting
      .postSlack({})
      .then((data) => expect(data.status).toEqual(200));
  });
});

describe("sendMessage", () => {
  beforeEach(() => {
    reporting.postSlack = jest.fn();
  });
  it("should call request with the same parameters", async () => {
    const data = { case: "time", actual: 290, expected: 1 };
    let test = await reporting.sendMessage(data);
    expect(test).toBe(true);
  });
});
