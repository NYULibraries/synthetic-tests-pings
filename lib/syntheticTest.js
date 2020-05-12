const { sendMessage } = require('./reporting');
const adapters = {
	'http:': require('http'),
	'https:': require('https'),
};

//choose whether to use http.get or https.get
const adapt = (function(){
	const url = require('url')
	return function(inputUrl){
		return adapters[url.parse(inputUrl).protocol]
	}
}());

//receive the http/https response
const httpResponse = (url) => {
	return new Promise((resolve, reject)=>{
		//const start = Date.now();
		adapt(url).get(url, (res) => {
		let data = '';
			res.on('data', (chunk) => {
				data += chunk;
			});
			res.on('end', () => {
				//const end = Date.now();
				resolve({res: res, time: end - start });
			});
		}).on('error', (err) => {
    		reject(err);
 		})
	})
 }

//test the http/https response against parameters
const testHttpResponse = async ({ url, status, responseTime }) => {
  const data = await httpResponse(url);
  const realStatus = data.res.statusCode;
  //const realTime = data.res.time;
	console.log(realStatus)
};

testHttpResponse({ url: 'https://www.example.com' })


const checkUrl = (parameters) => {
  if (!testHttpResponse(parameters)) {
    sendMessage(parameters);
  }
};

module.exports = { 
	checkUrl, 
	testHttpResponse, 
	httpResponse 
}