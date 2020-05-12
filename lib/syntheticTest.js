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

const testHttpResponse = ({ url }) => {
  adapt(url).get(url, (res) => {
		let data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			console.log(res.statusCode, res.headers);
		});
	}).on('error', (err) => {
    console.log('Error:' + err.message);
  })
};

testHttpResponse({ url: 'https://www.example.com' })


const checkUrl = (parameters) => {
  if (!testHttpResponse(parameters)) {
    sendMessage(parameters);
  }
};


module.exports.checkUrl = checkUrl;
module.exports.testHttpResponse = testHttpResponse;
