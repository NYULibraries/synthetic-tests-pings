const { sendMessage } = require('./reporting');
const https = require('https');

const testHttpResponse = ({ url }) => {
  https.get(url, (res) => {
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
