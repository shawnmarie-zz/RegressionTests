(function() {
var base = require('./lib/base');
var axios = require('axios');
var v1sdk = require('v1sdk');
var util = require('util');

var v1 = base.v1;
var username = base.username;
var password = base.password;
var baseUrl = base.protocol + '//' + base.hostname + '/' + base.instance;
var devOpsCenterApiBaseUrl = baseUrl + '/DevOpsCenter.mvc/';

var DevopsCenter = {
	CreateAction: function(name, assetType, endpointUrl, label, description){
		name = name || "Get going";
		assetType = assetType || "Story";
		label = label || "Start";
		description = description || "Some text here.";
		endpointUrl = endpointUrl || "http://www.mocky.io/v2/56ba439e130000e9087cdf39";

		//data returned is only the attributes of the post data
		var data = {
			"Name": name,
			"ValidForAssetType": assetType,
			"EndpointURL": endpointUrl,
			"Label": label,
			"Description": description
		};
		return v1.create('ExternalAction', data);
	},
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
		 	externalActionOid, triggeringAssetOid);

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
	},
	CreateActionInvocationByAssetAndAction: function(assetType, externalActionOid, triggeringAssetOid) {
		assetType = assetType || 'Story';
		externalActionOid = externalActionOid || 2231;
		triggeringAssetOid = triggeringAssetOid || 1187;

		var data = {
			"InvokedOn": assetType + ":" + triggeringAssetOid,
			"CausedBy": "ExternalAction:" + externalActionOid,
			"Sent": ""
		};
		return v1.create('ExternalActionInvocation', data);		
	},
	GetCountOfExternalActionInvocationInvokedOnExternalAction: function(qType, relation, assetType, triggeringAssetOid) {
		assetType = assetType || 'Story';
		triggeringAssetOid = triggeringAssetOid || 1187;
		var triggerAsset = assetType + ':' + triggeringAssetOid;

		var url = baseUrl + util.format(
				'/rest-1.v1/Data/ExternalActionInvocation?where=InvokedOn=%27triggerAsset%27', triggerAsset);

		return axios.get(url);
	},
	ReadActionInvocationCausedByAssetType: function(assetType) {
		assetType = assetType || 'Story';
		
		return v1.query('ExternalActionInvocation', assetType);
	}
};

var errorHandler = function(error) {
	console.error(error, error.data.exceptions);
	//console.error(error);
};

/*var externalActionOid = 1228;
var name;
var number;
var assetType;
var endpointUrl;
var label;
var description;
var status;

DevopsCenter.InvokeAction(externalActionOid, 'Story:1057')
.then(function(result) {
	console.log("Invoked ExternalAction successfully:", result);	
})
.catch(errorHandler);*/

/*DevopsCenter.DeleteAction(externalActionOid)
	.then(function(result) {
		console.log(result);
	})
	.catch(errorHandler);*/


/*DevopsCenter.CreateAction(name, assetType, endpointUrl, label, description)
.then(function(result) {
	console.log(result);
})
.catch(errorHandler);*/

//console.log(devOpsCenterApiBaseUrl);

module.exports = {
	DevopsCenter: DevopsCenter,
	errorHandler: errorHandler
};
}());

