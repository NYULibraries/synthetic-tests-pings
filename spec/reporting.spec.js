const reporting = require('../lib/reporting');

describe('sendMessage', () => {
  it ('should return a string response', () => {
    expect(reporting.sendMessage('Test failed!')).toEqual('Send Test failed! to Slack!');
  });
});