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
	return adapt(url).get(url, (res) => {
		let data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			//return { status: res.statusCode };
		});
	}).on('error', (err) => {
    console.log('Error:' + err.message);
  })
 }

//test the http/https response
const testHttpResponse = ({ url, status, responseTime }) => {
  const data = httpResponse(url);
	console.log(data)
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