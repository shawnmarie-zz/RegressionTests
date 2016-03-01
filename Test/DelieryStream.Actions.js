(function() {
import base from './lib/base';
import axios from 'axios';
import v1sdk from 'v1sdk';
import util from 'util';

let v1 = base.v1;
let devOpsCenterApiBaseUrl = 'http://localhost/VersionOne/DevOpsCenter.mvc/';


var DevopsCenter = {
	CreateAction: function(name = "Get going", assetType = "Story", endpointUrl = "http://www.mocky.io/v2/56ba439e130000e9087cdf39",
							label = "Start", description = "Some text here.") {

		//data returned is only the attributes of the post data
		let data = {
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
	InvokeAction: function(externalActionOid, triggeringAssetOid, name = "Asset", number = "A-01001",
					description = null,	status = null) {
		
		let url = devOpsCenterApiBaseUrl + util.format(
			'ExternalActionInvoke?externalActionOid=ExternalAction:%d&triggeringAssetOid=%s',
		 	externalActionOid, triggeringAssetOid
		);

		let data = {
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

		return axios.post(url, data, {auth: {username: base.username, password: base.password}});
	}
};

var errorHandler = function(error) {
	console.error(error, error.data.exceptions);
	//console.error(error);
};

module.exports = {
	DevopsCenter: DevopsCenter,
	errorHandler: errorHandler
};
}());