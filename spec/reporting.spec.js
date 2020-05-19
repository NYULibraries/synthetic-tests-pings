const reporting = require('../lib/reporting');

describe('formatMessage', () => {
  it('should return a string response', () => {
    expect(typeof reporting.formatMessage({ case: '', actual: '', expected: ''})).toEqual('string');
  });

  describe('should format its message based on parameters', () => {
    it('should return accurate message for status trigger', () => {
    const testParams = { case: 'status', actual: 201, expected: 200 };
		expect(reporting.formatMessage(testParams)).toEqual('Test failed! Unexpected status. Expected: 200, received: 201');
    })
  });
});

describe('sendMessage', () => {
  test.todo('should send a message to slack API');
})