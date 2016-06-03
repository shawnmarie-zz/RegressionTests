var actions = require('./DevOps.Actions');
var axios = require('axios');
var v1sdk = require('v1sdk');
var util = require('util');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
chai.use(chaiAsPromised);

var dc = actions.DevopsCenter;
var eh = actions.errorHandler;

var namePipeline = "Pipeline for Regression by SMA";
var nameTask = "Task for Regression by SMA";
var nameWebhook = "Webhook for Regression by SMA";
var nameCanvas = "Canvas for Regression by SMA";

var descriptionPipeline = "This was created to test starting a pipeline.";
var descriptionTask = "This was created to test starting a task.";
var descriptionWebhook = "This was created to test hitting a webhook.";
var descriptionCanvas = "This was created to test opening a canvas.";

var assetType = dc.assetType;

var triggerTypePipeline = 'TriggerType:240';
var triggerTypeTask = 'TriggerType:241';
var triggerTypeWebhook = 'TriggerType:242';
var triggerTypeCanvas = 'TriggerType:243';

var payloadPipeline = '{"definition":"Deploy to Staging","project":"test_project","group":"master"}';
var payloadTask = '{"task":"Test_Task","initial_data":"{}"}';
var payloadWebhook = '{"handler":"sma_test_webhook","smaStuff": "http://www.mocky.io/v2/571678901100005b2087da99"}';
var payloadCanvas = '{"path": "demos/main/main.layout"}';


function momentlessId(asset) {
	id = asset.data.id;
	var matches = id.match(/:(\d{4,}):/);
	id = matches[1];
	return id;
}

function typeAsset(asset) {
	type = asset.data._type;
	return type;
}

describe('External Actions: ', function() {
	describe('Happy Path tests - ', function() {
		describe('\n\tCreate new action for the Project asset type with Trigger Type Pipeline', function() {
			var id;
			before(function() {
				return dc.CreateAction(namePipeline, 'Scope', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Scope:1093').should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', "Scope:1093" );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Project asset type with Trigger Type Task', function() {
			var id;
			before(function() {
				return dc.CreateAction(nameTask, 'Scope', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Scope:1093').should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', "Scope:1093" );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Project asset type with Trigger Type Webhook', function() {
			var id;
			before(function() {
				return dc.CreateAction(nameWebhook, 'Scope', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Scope:1093').should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', "Scope:1093" );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Project asset type with Trigger Type Canvas', function() {
			var id;
			before(function() {
				return dc.CreateAction(nameCanvas, 'Scope', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Scope:1093').should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', "Scope:1093" );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		// describe('\n\tCreate new action for the Portfolio Item asset type', function() {
		// 	var id;
		// 	before(function(done) {
		// 		dc.CreateAction('Something Epic','Epic', endpointUrl, 'Begin').then(function(asset) {
		// 			id = momentlessId(asset);
		// 			console.log("\n\t\tCreated ExternalAction: " + id);
		// 			done();
		// 		});
		// 	});
		// 	it('it should then be invokable', function() {
		// 		return dc.InvokeAction(id, 'Epic:1132').should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should contain invocation history', function() {
		// 		return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should then be deletable', function() {
		// 		return dc.DeleteAction(id).should.eventually.have.property('status', 200);
		// 	});
		// });
		// describe('Create new action for the Story asset type', function() {
		// 	var id;
		// 	before(function(done) {
		// 		dc.CreateAction(name, assetType, endpointUrl, label).then(function(asset) {
		// 			id = momentlessId(asset);
		// 			console.log("\n\t\tCreated ExternalAction: " + id);
		// 			done();
		// 		});
		// 	});
		// 	it('it should then be invokable', function() {
		// 		return dc.InvokeAction(id, 'Story:1187').should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should contain invocation history', function() {
		// 		return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should then be deletable', function() {
		// 		return dc.DeleteAction(id).should.eventually.have.property('status', 200);
		// 	});
		// });
		// describe('\n\tCreate new action for the Defect asset type', function() {
		// 	var id;
		// 	before(function(done) {
		// 		dc.CreateAction('Fix this', 'Defect', endpointUrl, 'Fixed').then(function(asset) {
		// 			id = momentlessId(asset);
		// 			console.log("\n\t\tCreated ExternalAction: " + id);
		// 			done();
		// 		});
		// 	});
		// 	it('it should then be invokable', function() {
		// 		return dc.InvokeAction(id, 'Defect:1230').should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should contain invocation history', function() {
		// 		return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should then be deletable', function() {
		// 		return dc.DeleteAction(id).should.eventually.have.property('status', 200);
		// 	});
		// });
		// describe('\n\tCreate new action for the TestSet asset type', function() {
		// 	var id;
		// 	before(function(done) {
		// 		dc.CreateAction('Something Epic','TestSet', endpointUrl, 'Begin').then(function(asset) {
		// 			id = momentlessId(asset);
		// 			console.log("\n\t\tCreated ExternalAction: " + id);
		// 			done();
		// 		});
		// 	});
		// 	it('it should then be invokable', function() {
		// 		return dc.InvokeAction(id, 'Epic:1132').should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should contain invocation history', function() {
		// 		return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
		// 	});
		// 	it('it should then be deletable', function() {
		// 		return dc.DeleteAction(id).should.eventually.have.property('status', 200);
		// 	});
		// });
		
	});
	/*describe('Sad Path tests - ', function() {
		describe('Create new action for the Story asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction(name, assetType, endpointUrl, label).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					done();
				});
			});
			it('it should timeout after 3 minutes', function() {
				return dc.InvokeAction(id, 'Story:1187').should.eventually.have.property('status', 200);
			});
					//This scenario has not been fixed as of 3/17/2016
			/*it('it should not be invokable by a non-story asset', function() {
				return dc.InvokeAction(id, 'Defect:1057').should.eventually.have.property('status', 404);
			});
	});	*/
});
