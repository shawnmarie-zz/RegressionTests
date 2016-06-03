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

var name;
var assetType = dc.assetType;
var endpointUrl;
var label;
var description;
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

describe('External Actions: ', function() {
	describe('Happy Path tests - ', function() {
		describe('Create new action for the Story asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction(name, assetType, endpointUrl, label).then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Story:1187').should.eventually.have.property('status', 200);
			});
			it('it should contain invocation history', function() {
				return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
			});
			// it('it should then be deletable', function() {
			// 	return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			// });
		});
		describe('\n\tCreate new action for the Defect asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction('Fix this', 'Defect', endpointUrl, 'Fixed').then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Defect:1230').should.eventually.have.property('status', 200);
			});
			it('it should contain invocation history', function() {
				return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
			});
			// it('it should then be deletable', function() {
			// 	return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			// });
		});
		describe('\n\tCreate new action for the Portfolio Item asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction('Something Epic','Epic', endpointUrl, 'Begin').then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Epic:1132').should.eventually.have.property('status', 200);
			});
			it('it should contain invocation history', function() {
				return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
			});
			// it('it should then be deletable', function() {
			// 	return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			// });
		});
		describe('\n\tCreate new action for the Project asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction('Progress','Scope', endpointUrl,'Move along').then(function(asset) {
					id = momentlessId(asset);
					console.log("\n\t\tCreated ExternalAction: " + id);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Scope:1100').should.eventually.have.property('status', 200);
			});
			it('it should contain invocation history', function() {
				return dc.CreateActionInvocationByAssetAndAction(assetType, id, triggerOid).should.eventually.have.property('status', 200);
			});
			// it('it should then be deletable', function() {
			// 	return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			// });
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
