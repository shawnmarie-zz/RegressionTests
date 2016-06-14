//(function() {
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
		var oidToken = 'ExternalAction:' + externalActionOid;
		return v1.executeOperation(oidToken, 'Delete');
	},
	InvokeAction: function(externalActionOid, triggeringAssetOid, name, number, description, status) {
		name = name || "Asset";
		number = number || "A-00001";
		description = description || null;
		status = status || null;
		
		var url = devOpsCenterApiBaseUrl + util.format(
			'ExternalActionInvoke?externalActionOid=ExternalAction:%d&triggeringAssetOid=%s',
		 	externalActionOid, triggeringAssetOid);

		console.log(url);
		var data = {
			"actionName":"ExternalAction-" + externalActionOid,
			"id": externalActionOid,
			"triggeringAssetData":{
				"name": name,
				"id": triggeringAssetOid,
				"number": number,
				"description": description,
				"status": status
			}
		};

		console.log("about to call post");
		return axios.post(url, {}, {auth: {username: base.username, password: base.password}});
	},
	CreateActionInvocationByAssetAndAction: function(assetType, externalActionOid, triggeringAssetOid) {
		assetType = assetType || 'Story';
		externalActionOid = externalActionOid || 2243;
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
	ReadActionInvocationCausedByAction: function(externalActionOid) {
		externalActionOid = externalActionOid || 2287;

		var data = {
			"from": "ExternalActionInvocation", 
			"select": ["InvokedOn"], 
			"where": {"CausedBy": "ExternalAction:" + externalActionOid}
			};

		return v1.query(data);
	},
	SelectExternalActionByValidForAssetType: function(assetType) {
		assetType = assetType || 'Story';

		var data = {
			"from": "ExternalAction", 
			"select": [],
			"where": {"ValidForAssetType": assetType, "TriggerType.Name": "Webhook"}
		};

		return v1.query(data);
	},
	SelectAssetIDByAssetTypeAndName: function(assetType, name) {
		assetType = assetType || 'Scope';
		name = name || 'Release 1.0';

		var data = {
			"from": assetType,
			"select": ["ID"],
			"where": {"Name": name}
		};

		return v1.query(data);
	}
};

var errorHandler = function(error) {
	console.log("in the error function");
	console.log(error, error.data.exceptions);
	//console.error(error);
};

var externalActionOid = 7851;
//var name = "Pipeline for Regression by SMA";
var name = "Order Shipping";
var number;
var assetType = "Epic";
var triggerType = 'TriggerType:240';
var triggeringAssetOid = 2214;
var payload = '{"definition":"Deploy to Staging","project":"test_project","group":"master"}';
var description = "This was created to test starting a pipeline.";
var status;

// DevopsCenter.ReadActionInvocationCausedByAction(7905)
// .then(function(result) {
// 	console.log(result.data[0][0].InvokedOn._oid);
// }).catch(errorHandler);
// DevopsCenter.CreateAction(name, assetType, triggerType, payload, description)
// .then(function(result) {
// 	console.log(result);
// })
// .catch(errorHandler);


// var checkForData = function(result) {
// 	console.log('checkForDAta', result.data[0].length === 0);
// 	return result.data[0].length === 0 ? 
// 	new Promise(function(resolve, reject){ reject("Error") }) : 
// 	new Promise(function(resolve, reject){ resolve(result.data[0]) });
// }

// var getExternalActionOidToken = function(data) {
// 	return new Promise(function(resolve, reject){ resolve(data[0]._oid) });
// }

// var invokeExternalAction = function(externalActionOidToken) {
// 	new Promise(function(resolve, reject){ resolve(DevopsCenter.InvokeAction(externalActionOidToken, 'Story:1240')) });
// }

// var invokeActionSuccess = function(stuff) {
// 	console.log('we invoked the action')
// }

// DevopsCenter.SelectExternalActionByValidForAssetType(assetType)
// .then(checkForData)
// .then(getExternalActionOidToken)
// .then(invokeExternalAction)
// .then(invokeActionSuccess);
// console.log('Protocol: ' + protocol);
// console.log('BaseUrl: ' + baseUrl);
// DevopsCenter.InvokeAction(externalActionOid, 'Epic:1205')
// .then(function(result) {
// 	console.log("before the result");
// 	console.log(result);
// })
// .catch(errorHandler);

// DevopsCenter.InvokeAction(externalActionOid, 'Story:6474')
// .then(function(result) {
// 	console.log("Invoked ExternalAction successfully:", result);	
// })
// .catch(errorHandler);
// DevopsCenter.DeleteAction(externalActionOid)
// .then(function(result) {
// 	console.log(result);
// })
// .catch(errorHandler);

DevopsCenter.SelectAssetIDByAssetTypeAndName(assetType, name)
.then(function(result) {
	console.log(result.data[0][0]._oid);
})
.catch(errorHandler);

/*module.exports = {
	DevopsCenter: DevopsCenter,
	errorHandler: errorHandler
};
}());*/

// [
// 	[_oid: value],
// 	[_oid: value]
// ]
