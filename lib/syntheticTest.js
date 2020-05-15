const reporting = require('../lib/reporting');

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
		return new Promise((resolve, reject) => {
			const start = Date.now();
			const protocol = adapt(url)
			if (!protocol){
				reject("Error: invalid input")
			}
			protocol.get(url, (res) => {
				let data = '';
				res.on('data', (chunk) => {
					data += chunk;
				});
				res.on('end', () => {
					const end = Date.now();
					resolve({ res: res, time: end - start });
				});
				
			});
		})
}

//test the http/https response against parameters
const testHttpResponse = async ({ url, status, responseTime }) => {
	const data = await httpResponse(url).catch((e) => {
		console.error(e)
	});
	if (data) {
		const realStatus = data.res.statusCode;
		const realTime = data.time;
		if (realStatus === status && realTime <= responseTime) {
			// console.log('true')
			return true;
		} else {
			// console.log('false')
			return false;
		}
	}
};

const checkUrl = async (parameters) => {
	const httpResult = await testHttpResponse(parameters).catch((e) => console.error(e));
  	if (!httpResult) {
    	reporting.sendMessage(parameters);
  	}
};

module.exports = { 
	adapt,
	checkUrl, 
	testHttpResponse, 
	httpResponse 
}