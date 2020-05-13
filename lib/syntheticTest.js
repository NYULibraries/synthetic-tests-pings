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
		const start = Date.now();
		adapt(url).get(url, (res) => {
		let data = '';
			res.on('data', (chunk) => {
				data += chunk;
			});
			res.on('end', () => {
				const end = Date.now();
				resolve({'res': res, 'time': end - start });
			});
		}).on('error', (err) => {
    		reject(err);
 		})
	})
 }

//test the http/https response against parameters
const testHttpResponse = async ({ url, status, responseTime }) => {
	try {
		const data = await httpResponse(url);
		const realStatus = data.res.statusCode;
		const realTime = data.time;

		if (realStatus === status && realTime <= responseTime) {
			console.log('hello im true')
			return true;
		} else {
			console.log('hello im false');
			return false;
		}
	} catch (err) {
		console.error(err);
	}
};

//const testHttpResponse = ({ url }) => `URL ${url} responded!`;

//testHttpResponse({ url: 'https://www.example.com', status: 200, responseTime: 500 })


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