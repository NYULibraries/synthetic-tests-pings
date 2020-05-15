const syntheticTest = require('../lib/syntheticTest');
const reporting = require('../lib/reporting');

reporting.sendMessage = jest.fn();

describe('checkUrl', () => {
  it('should call sendMessage when testHttpResponse returns false', async ()=>{
    const test = await syntheticTest.checkUrl({
    url: 'https://www.google.com', 
    status: 201, 
    responseTime: 1 
    });
    //expect(test).toBe(false);
    expect(reporting.sendMessage).toHaveBeenCalledTimes(1);
    //expect(test).toEqual(reporting.sendMessage);
  });

  it('should not call sendMessage when testHttpResponse returns true', async ()=> {
    const test = await syntheticTest.checkUrl({ 
      url: 'https://www.example.com', 
      status: 200, 
      responseTime: 500 
      });
      //expect(test).toBe(true);
      expect(reporting.sendMessage).toHaveBeenCalledTimes(0);
  });
});
