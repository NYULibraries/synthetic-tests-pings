const syntheticTest = require("../lib/syntheticTest");
const handler = require("../handler")
const axios = require("axios");

jest.mock('axios');

xdescribe("handler", () => {
  it("it should not call pushToProm", async () => {
    beforeEach(() => {
      //syntheticTest.pushToProm = jest.fn();
      //syntheticTest.checkUrl = jest.fn();
    });
    await handler.syntheticTest();
    expect(syntheticTest.pushToProm()).toNotHaveBeenCalled();
  });
});
