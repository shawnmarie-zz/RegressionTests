// **NOTE:** This assumes you have jQuery as a node module.

var axios = require('axios');
var v1sdk = require('v1sdk');
var util = require('util');

var hostname = "localhost";
var instance = "versionone";
var username = "admin";
var password = "admin";
var protocol = "http:";

var devOpsCenterApiBaseUrl = 'http://localhost/VersionOne/DevOpsCenter.mvc/';

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
		console.log(url, data);
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

// Create Asset External Action - Story
/*v1.create('ExternalAction', {Name: 'Start', ValidForAssetType: 'Story', EndpointURL: 'http://requestb.in/17hgua21', Label: 'Story Stuff', Description: 'this is a description'})
	.then(function (result) {
		console.log(result);
	})
	.catch(function (error) {
		console.log(error, error.data.exceptions);
	});

	// Create Asset External Action - Defect
v1.create('ExternalAction', {Name: 'Fixious', ValidForAssetType: 'Defect', EndpointURL: 'http://requestb.in/17hgua21', Label: 'Defect Stuff', Description: 'this is a description'})
	.then(function (result) {
		console.log(result);
	})
	.catch(function (error) {
		console.log(error, error.data.exceptions);
	});

// Create Asset External Action - Portfolio Item
v1.create('ExternalAction', {Name: 'Begin', ValidForAssetType: 'Epic', EndpointURL: 'http://requestb.in/17hgua21', Label: 'Epic Stuff', Description: 'this is a description'})
	.then(function (result) {
		console.log(result);
	})
	.catch(function (error) {
		console.log(error, error.data.exceptions);
	});

// Create Asset External Action - Project
v1.create('ExternalAction', {Name: 'Progress', ValidForAssetType: 'Scope', EndpointURL: 'http://requestb.in/17hgua21', Label: 'Proj Stuff', Description: 'this is a description'})
	.then(function (result) {
		console.log(result);
	})
	.catch(function (error) {
		console.log(error, error.data.exceptions);
	});
*/

//Delete a Story
/*v1.executeOperation('Story', 1135, 'Delete')
	.then(function(result) {
		console.log(result);
	})
	.catch(function (error) {
		console.log(error, error.data.exceptions);
	});
v1.executeOperation('Story', 1135, 'Undelete')
	.then(function(result) {
		console.log(result);
	})
	.catch(function(error) {
		console.log(error, error.data.exceptions);
	});

*/


var DevopsCenter = {
	DeleteAction: function(externalActionOid) {
		return v1.executeOperation('ExternalAction', externalActionOid, 'Delete');
	},
	InvokeAction: function(externalActionOid, triggeringAssetOid, name, number, description, status) {
		name = name || "Asset";
		number = number || "A-00001";
		description = description || null;
		status = status || null;
		
		var url = devOpsCenterApiBaseUrl + util.format(
			'ExternalActionInvoke?externalActionOid=ExternalAction:%d&triggeringAssetOid=%s',
		 	externalActionOid, triggeringAssetOid
		);

		var data = {
			"actionName":"ExternalAction-" + externalActionOid,
			"id":"ExternalAction:" + externalActionOid,
			"triggeringAssetData":{
				"name": name,
				"id": triggeringAssetOid,
				"number": number,
				"description": description,
				"status": status
			}
		};

		return axios.post(url, data, {auth: {username: username, password: password}});
	}
};

var errorHandler = function(error) {
	console.error(error, error.data.exceptions);
};

var externalActionOid = 1135;

DevopsCenter.InvokeAction(externalActionOid, 'Story:1057')
.then(function(result) {
	console.log("Invoked ExternalAction successfully:", result);	
})
.catch(errorHandler);

/*DevopsCenter.DeleteAction(externalActionOid)
	.then(console.log)
	.catch(errorHandler);
*/