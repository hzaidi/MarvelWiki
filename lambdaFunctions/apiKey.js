//const fetch = require('node-fetch');
const md5 = require('md5');
const PUBLIC_KEY = '811b2529a0130c92ab5c1a36e00c61e5';
const PRIVATE_KEY = '426771ca28a1e77bfa361d0c09731bdadf0b63e3';

exports.handler = function(event, context, callback) {
	const date = new Date()
	const ts = date.getTime();
	const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);

	const body = {
		ts,
		apikey: PUBLIC_KEY,
		hash
	}

    callback(null, {
		statusCode: 200,
		body
	});
}