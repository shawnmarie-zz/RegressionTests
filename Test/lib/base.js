(function() {
  var axios = require('axios');
  var v1sdk = require('v1sdk');
  var util = require('util');

  var hostname = "pfreiberg.cloudapp.net";
  var instance = "VersionOneTechChore";
  var username = "admin";
  var password = "admin";
  var protocol = "http";

  var v1 = new v1sdk.V1Meta({
	hostname: hostname,
	instance: instance,
	protocol: protocol,
	username: username,
	password: password,
	postFn: function (url, data, headerObj) {
		headerObj = headerObj || {};
		headerObj.contentType = 'application/json';
		// Be sure to return jquery's jqxhr object/the post results
		return axios.post(url, data, {headers: headerObj, auth: {username: username, password: password}});
		//  {
		// 	url: url,
		// 	method: 'POST',
		// 	data: data,
		// 	headers: headerObj, // Include provided authorization headers { Authorization: 'Basic: .....' }
		// 	dataType: 'json' // SDK only supports JSON from the V1 Server
		// });
	},
	getFn: function (url, data) {
		return axios.get(url, {
			params: data
		});
	}
});

  module.exports = {
    v1: v1,
    username: username,
    password: password,
    hostname: hostname,
    instance: instance,
    protocol: protocol
  };

}());