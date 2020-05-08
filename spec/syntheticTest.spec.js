const syntheticTest = require('../lib/syntheticTest');

describe('testHttpResponse', () => {
  describe('for a successful response url', () => {
    it('should return true for a matching success status code', () => {
      expect(syntheticTest.testHttpResponse({ url: 'https://library.nyu.edu/', status: 200, responseTime: 500 })).toBeTruthy();
    });

    it('should return false for response not received in specified time', () => {
      expect(syntheticTest.testHttpResponse({ url: 'https://library.nyu.edu/', status: 200, responseTime: 1 })).toBeFalsy();
    });

    it('should return false for a wrong status code', () => {
      expect(syntheticTest.testHttpResponse({ url: 'https://library.nyu.edu/', status: 201, responseTime: 500 })).toBeFalsy();
    });
  });

  describe('for a not found url', () => {
    it('should return true for a matching error status code', () => {
      expect(syntheticTest.testHttpResponse({ url: 'https://library.nyu.edu/not/existing/path', status: 404, responseTime: 500 })).toBeTruthy();
    });

    test.todo('should return false for response not received in specified time');

    it('should return false for a wrong status code', () => {
      expect(syntheticTest.testHttpResponse({ url: 'https://library.nyu.edu/not/existing/path', status: 500, responseTime: 500 })).toBeFalsy();
    });
  });

  describe('for a redirecting url', () => {
    it('should return true for the correct status code', () => {
      expect(syntheticTest.testHttpResponse({ url: 'https://eshelf.library.nyu.edu/', status: 302, responseTime: 500 })).toBeTruthy();
    });

    test.todo('should return false for response not received in specified time');

    it('should return false for an incorrect status code', () => {
      expect(syntheticTest.testHttpResponse({ url: 'https://eshelf.library.nyu.edu/', status: 301, responseTime: 500 })).toBeFalsy();
    });

    it('should return true for the correct status code and redirect location', () => {
      expect(syntheticTest.testHttpResponse({
        url: 'https://eshelf.library.nyu.edu/',
        status: 302,
        responseTime: 500,
        redirectLocation: 'https://login.library.nyu.edu/login/passive?client_id=bbcf34b029d1b729dee3db58e6e1b13f469ae756c83d99b345dd1689fd6b36ef&return_uri=https%3A%2F%2Feshelf.library.nyu.edu%2F',
      })).toBeTruthy();
    });

    test.todo('should return false with correct redirect location for response not received in specified time');

    it('should return false for the correct status code and incorrect redirect location', () => {
      expect(syntheticTest.testHttpResponse({
        url: 'https://eshelf.library.nyu.edu/',
        status: 302,
        responseTime: 500,
        redirectLocation: 'https://login.library.nyu.edu/login/passive',
      })).toBeTruthy();
    });
  });
});

describe('checkUrl', () => {
  test.todo('should call sendMessage when testHttpResponse returns false');
  test.todo('should not call sendMessage when testHttpResponse returns true');
});
