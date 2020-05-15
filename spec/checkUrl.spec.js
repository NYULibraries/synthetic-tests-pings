const syntheticTest = require('../lib/syntheticTest');
const reporting = require('../lib/reporting');


describe('checkUrl', () => {
    beforeEach(() => {
        reporting.sendMessage = jest.fn();
    })

  it('should call sendMessage when testHttpResponse returns false', async ()=>{
    const test = await syntheticTest.checkUrl({
        url: 'https://www.google.com', 
        status: 201, 
        responseTime: 1 
    });
    expect(reporting.sendMessage).toHaveBeenCalled();
  });

  it('should not call sendMessage when testHttpResponse returns true', async ()=> {
    const test = await syntheticTest.checkUrl({ 
         url: 'https://www.example.com', 
        status: 200, 
        responseTime: 500 
      });
      expect(reporting.sendMessage).not.toHaveBeenCalled()
  });
});
