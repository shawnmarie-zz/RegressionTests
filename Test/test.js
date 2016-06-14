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

function itemID(asset) {
	id = asset.data[0][0]._oid;
	return id;
}

describe('External Actions: ', function() {
	describe('Happy Path tests - ', function() {
		describe('\n\tCreate new action for the Project asset type with Trigger Type Pipeline', function() {
			var id;
			var scopeId;
			before(function() {
				return dc.CreateAction(namePipeline, 'Scope', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Scope', 'Release 1.0').then(function(asset) {
					scopeId = itemID(asset);
					console.log("\n\t\tProject ID is: " + scopeId);
					scopeId.should.not.be.null;
				});
				});
			 });
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, scopeId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', scopeId );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Project asset type with Trigger Type Task', function() {
			var id;
			var scopeId;
			before(function() {
				return dc.CreateAction(nameTask, 'Scope', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Scope', 'Release 1.0').then(function(asset) {
					scopeId = itemID(asset);
					console.log("\n\t\tProject ID is: " + scopeId);
					scopeId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, scopeId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', scopeId );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Project asset type with Trigger Type Webhook', function() {
			var id;
			var scopeId;
			before(function() {
				return dc.CreateAction(nameWebhook, 'Scope', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Scope', 'Release 1.0').then(function(asset) {
					scopeId = itemID(asset);
					console.log("\n\t\tProject ID is: " + scopeId);
					scopeId.should.not.be.null;
				});
				});
			 });
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, scopeId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', scopeId );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Project asset type with Trigger Type Canvas', function() {
			var id;
			var scopeId;
			before(function() {
				return dc.CreateAction(nameCanvas, 'Scope', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Scope', 'Release 1.0').then(function(asset) {
					scopeId = itemID(asset);
					console.log("\n\t\tProject ID is: " + scopeId);
					scopeId.should.not.be.null;
				});
				});
			 });
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, scopeId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', scopeId );
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Portfolio Item asset type with Trigger Type Pipeline', function() {
			var id;
			var epicId;
			before(function() {
				return dc.CreateAction(namePipeline, 'Epic', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Epic', 'Order Shipping').then(function(asset) {
					epicId = itemID(asset);
					console.log("\n\t\tEpic ID is: " + epicId);
					epicId.should.not.be.null;
				});
				});
			 });
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, epicId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', epicId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Portfolio Item asset type with Trigger Type Task', function() {
			var id;
			var epicId;
			before(function() {
				return dc.CreateAction(nameTask, 'Epic', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Epic', 'Order Shipping').then(function(asset) {
					epicId = itemID(asset);
					console.log("\n\t\tEpic ID is: " + epicId);
					epicId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, epicId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', epicId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Portfolio Item asset type with Trigger Type Webhook', function() {
			var id;
			var epicId;
			before(function() {
				return dc.CreateAction(nameWebhook, 'Epic', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Epic', 'Order Shipping').then(function(asset) {
					epicId = itemID(asset);
					console.log("\n\t\tEpic ID is: " + epicId);
					epicId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, epicId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', epicId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Portfolio Item asset type with Trigger Type Canvas', function() {
			var id;
			var epicId;
			before(function() {
				return dc.CreateAction(nameCanvas, 'Epic', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Epic', 'Order Shipping').then(function(asset) {
					epicId = itemID(asset);
					console.log("\n\t\tEpic ID is: " + epicId);
					epicId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, epicId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', epicId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Story asset type with Trigger Type Pipeline', function() {
			var id;
			var storyId;
			before(function() {
				return dc.CreateAction(namePipeline, 'Story', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Story', 'Shipping Notes').then(function(asset) {
					storyId = itemID(asset);
					console.log("\n\t\tStory ID is: " + storyId);
					storyId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, storyId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', storyId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Story asset type with Trigger Type Task', function() {
			var id;
			var storyId;
			before(function() {
				return dc.CreateAction(nameTask, 'Story', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Story', 'Shipping Notes').then(function(asset) {
					storyId = itemID(asset);
					console.log("\n\t\tStory ID is: " + storyId);
					storyId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, storyId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', storyId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Story asset type with Trigger Type Webhook', function() {
			var id;
			var storyId;
			before(function() {
				return dc.CreateAction(nameWebhook, 'Story', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Story', 'Shipping Notes').then(function(asset) {
					storyId = itemID(asset);
					console.log("\n\t\tStory ID is: " + storyId);
					storyId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, storyId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', storyId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Story asset type with Trigger Type Canvas', function() {
			var id;
			var storyId;
			before(function() {
				return dc.CreateAction(nameCanvas, 'Story', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Story', 'Shipping Notes').then(function(asset) {
					storyId = itemID(asset);
					console.log("\n\t\tStory ID is: " + storyId);
					storyId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, storyId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', storyId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Defect asset type with Trigger Type Pipeline', function() {
			var id;
			var defectId;
			before(function() {
				return dc.CreateAction(namePipeline, 'Defect', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Defect', 'Customer ID Incorrect').then(function(asset) {
					defectId = itemID(asset);
					console.log("\n\t\tDefect ID is: " + defectId);
					defectId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, defectId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', defectId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Defect asset type with Trigger Type Task', function() {
			var id;
			var defectId;
			before(function() {
				return dc.CreateAction(nameTask, 'Defect', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Defect', 'Customer ID Incorrect').then(function(asset) {
					defectId = itemID(asset);
					console.log("\n\t\tDefect ID is: " + defectId);
					defectId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, defectId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', defectId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Defect asset type with Trigger Type Webhook', function() {
			var id;
			var defectId;
			before(function() {
				return dc.CreateAction(nameWebhook, 'Defect', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Defect', 'Customer ID Incorrect').then(function(asset) {
					defectId = itemID(asset);
					console.log("\n\t\tDefect ID is: " + defectId);
					defectId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, defectId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', defectId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the Defect asset type with Trigger Type Canvas', function() {
			var id;
			var defectId;
			before(function() {
				return dc.CreateAction(nameCanvas, 'Defect', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('Defect', 'Customer ID Incorrect').then(function(asset) {
					defectId = itemID(asset);
					console.log("\n\t\tDefect ID is: " + defectId);
					defectId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, defectId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', defectId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the TestSet asset type with Trigger Type Pipeline', function() {
			var id;
			var testsetId;
			before(function() {
				return dc.CreateAction(namePipeline, 'TestSet', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('TestSet', 'Order Management').then(function(asset) {
					testsetId = itemID(asset);
					console.log("\n\t\TestSet ID is: " + testsetId);
					testsetId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, testsetId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', testsetId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the TestSet asset type with Trigger Type Task', function() {
			var id;
			var testsetId;
			before(function() {
				return dc.CreateAction(nameTask, 'TestSet', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('TestSet', 'Order Management').then(function(asset) {
					testsetId = itemID(asset);
					console.log("\n\t\TestSet ID is: " + testsetId);
					testsetId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, testsetId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', testsetId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the TestSet asset type with Trigger Type Webhook', function() {
			var id;
			var testsetId;
			before(function() {
				return dc.CreateAction(nameWebhook, 'TestSet', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('TestSet', 'Order Management').then(function(asset) {
					testsetId = itemID(asset);
					console.log("\n\t\TestSet ID is: " + testsetId);
					testsetId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, testsetId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', testsetId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('\n\tCreate new action for the TestSet asset type with Trigger Type Canvas', function() {
			var id;
			var testsetId;
			before(function() {
				return dc.CreateAction(nameCanvas, 'TestSet', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					id.should.be.above(1);
				return dc.SelectAssetIDByAssetTypeAndName('TestSet', 'Order Management').then(function(asset) {
					testsetId = itemID(asset);
					console.log("\n\t\TestSet ID is: " + testsetId);
					testsetId.should.not.be.null;
				});
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, testsetId).should.eventually.have.deep.property('data.remoteStatusCategory.Label', "Success");
			});
			it('it should contain invocation history', function() {
				return dc.ReadActionInvocationCausedByAction(id).should.eventually.have.deep.property('.data[0][0].InvokedOn._oid', testsetId);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
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
