(function() {
var base = require('./lib/base');
var axios = require('axios');
var v1sdk = require('v1sdk');
var util = require('util');

var v1 = base.v1;
var headerObj = base.headerObj;
var username = base.username;
var password = base.password;
var protocol = base.protocol + '://';
var baseUrl = protocol + base.hostname + '/' + base.instance;
var devOpsCenterApiBaseUrl = baseUrl + '/DeliveryStream.mvc/';

var DevopsCenter = {
	CreateAction: function(name, assetType, triggerType, payload, description){
		name = name || "Pipeline for Regression by SMA";
		assetType = assetType || "Story";
		payload = payload || '{"definition":"Deploy to Staging","project":"test_project","group":"master"}';
		description = description || "This was created to test starting a pipeline.";
		triggerType = triggerType || 'TriggerType:240';

		//data returned is only the attributes of the post data
		var data = {
			"Name": name,
			"ValidForAssetType": assetType,
			"TriggerType": triggerType,
			"Payload": payload,
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



// var externalActionOid = 1222;
// var name = "Pipeline for Regression by SMA";
// var number;
// var assetType = "Story";
// var triggerType = 'TriggerType:240';
// var triggeringAssetOid = 2214;
// var payload = '{"definition":"Deploy to Staging","project":"test_project","group":"master"}';
// var description = "This was created to test starting a pipeline.";
// var status;

// DevopsCenter.InvokeAction(externalActionOid, 'Story:1057')
// .then(function(result) {
// 	console.log("Invoked ExternalAction successfully:", result);	
// })
// .catch(errorHandler);

// /*DevopsCenter.DeleteAction(externalActionOid)
// 	.then(function(result) {
// 		console.log(result);
// 	})
// 	.catch(errorHandler);*/


// DevopsCenter.CreateAction(name, assetType, triggerType, payload, description)
// .then(function(result) {
// 	console.log(result);
// })
// .catch(errorHandler);

//console.log(devOpsCenterApiBaseUrl);

module.exports = {
	DevopsCenter: DevopsCenter,
	errorHandler: errorHandler
};
}());

