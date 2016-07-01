var actions = require('./DevOps.Actions');
var axios = require('axios');
var v1sdk = require('v1sdk');
var util = require('util');

var dc = actions.DevopsCenter;
var eh = actions.errorHandler;

var namePipeline = "Pipeline for Regression";
var nameTask = "Task for Regression";
var nameWebhook = "Webhook for Regression";
var nameCanvas = "Canvas for Regression";

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

var externalOid = 0;
var triggerOid;


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

//Create an action for each asset type and trigger type combination

//Project External Actions
console.log("Create new action for the Project asset type with Trigger Type Pipeline");
dc.CreateAction(namePipeline, 'Scope', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Project asset type with Trigger Type Task");
dc.CreateAction(nameTask, 'Scope', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Project asset type with Trigger Type Webhook");
dc.CreateAction(nameWebhook, 'Scope', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Project asset type with Trigger Type Canvas");
dc.CreateAction(nameCanvas, 'Scope', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

//Portfolio Item External Actions
console.log("Create new action for the Portfolio Item asset type with Trigger Type Pipeline");
dc.CreateAction(namePipeline, 'Epic', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Portfolio Item asset type with Trigger Type Task");
dc.CreateAction(nameTask, 'Epic', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Portfolio Item asset type with Trigger Type Webhook");
dc.CreateAction(nameWebhook, 'Epic', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Portfolio Item asset type with Trigger Type Canvas");
dc.CreateAction(nameCanvas, 'Epic', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

//Story External Actions
console.log("Create new action for the Story asset type with Trigger Type Pipeline");
dc.CreateAction(namePipeline, 'Story', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Story asset type with Trigger Type Task");
dc.CreateAction(nameTask, 'Story', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Story asset type with Trigger Type Webhook");
dc.CreateAction(nameWebhook, 'Story', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Story asset type with Trigger Type Canvas");
dc.CreateAction(nameCanvas, 'Story', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

//Defect External Actions
console.log("Create new action for the Defect asset type with Trigger Type Pipeline");
dc.CreateAction(namePipeline, 'Defect', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Defect asset type with Trigger Type Task");
dc.CreateAction(nameTask, 'Defect', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Defect asset type with Trigger Type Webhook");
dc.CreateAction(nameWebhook, 'Defect', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the Defect asset type with Trigger Type Canvas");
dc.CreateAction(nameCanvas, 'Defect', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

//TestSet External Actions
console.log("Create new action for the TestSet asset type with Trigger Type Pipeline");
dc.CreateAction(namePipeline, 'TestSet', triggerTypePipeline, payloadPipeline, descriptionPipeline).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the TestSet asset type with Trigger Type Task");
dc.CreateAction(nameTask, 'TestSet', triggerTypeTask, payloadTask, descriptionTask).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the TestSet asset type with Trigger Type Webhook");
dc.CreateAction(nameWebhook, 'TestSet', triggerTypeWebhook, payloadWebhook, descriptionWebhook).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});

console.log("Create new action for the TestSet asset type with Trigger Type Canvas");
dc.CreateAction(nameCanvas, 'TestSet', triggerTypeCanvas, payloadCanvas, descriptionCanvas).then(function(asset) {
	var id = momentlessId(asset);
	console.log("\tCreated new ExternalAction: " + id);
});