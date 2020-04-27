const syntheticTest = require('../lib/syntheticTest');

describe('checkUrl', () => {
  it ('should return a string response', () => {
    expect(syntheticTest.checkUrl('https://test.url')).toEqual('URL https://test.url responded!');
  });
});

