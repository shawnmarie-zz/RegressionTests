var actions = require('./DevOps.Actions');
var axios = require('axios');
var v1sdk = require('v1sdk');
var util = require('util');

var dc = actions.DevopsCenter;
var eh = actions.errorHandler;

function getOid(oidToken) {
	return oidToken.split(':')[1];
}
//Invoke an External Action for each Asset Type and Trigger Type combination
console.log("Invoking External Action on a Project of Trigger Type Pipeline");
var actionOidToken = dc.SelectExternalActionByValidForAssetType('Story')
.then(function(result) {
	var oid = 0;
	var noOidsCount = 0;
	if(result.data[0].length === noOidsCount) oid = "No External Action for this Asset Type.";
	else oid = result.data[0][0]._oid;
	console.log(oid);
	return oid;
});

dc.InvokeAction(actionOidToken, 'Story:1264')
.then(function(result) {
	console.log("Invoking...");
	console.log(result);
});
console.log("OidToken Value is: " + actionOidToken);
//dc.InvokeAction(actionOid);
