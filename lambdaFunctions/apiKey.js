//const fetch = require('node-fetch');
const md5 = require('md5');
const PUBLIC_KEY = '811b2529a0130c92ab5c1a36e00c61e5';
const PRIVATE_KEY = '426771ca28a1e77bfa361d0c09731bdadf0b63e3';

exports.handler = function(event, context, callback) {
    callback(null, {
		statusCode: 200,
		body: md5("Hello, World")
	});
}