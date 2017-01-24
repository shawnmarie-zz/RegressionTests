(function() {
  var axios = require('axios');
  var v1sdk = require('v1sdk/dist/index');
  var sdk = v1sdk.default;
  var axiosConnector = v1sdk.axiosConnector;
  var axiosConnectedSdk = axiosConnector(axios)(sdk);
  var util = require('util');

  var hostname = "staging.v1host.com";
  var instance = "ShawnMarie_DNTD";
  var username = "admin";
  var password = "admin";
  var protocol = "https";


  var v1 = axiosConnectedSdk(hostname, instance,443, true)
  	.withCreds(username, password);

  module.exports = {
    v1: v1,
    username: username,
    password: password,
    hostname: hostname,
    instance: instance,
    protocol: protocol
  };

}());