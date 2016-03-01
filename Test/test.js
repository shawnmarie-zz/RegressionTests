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
var assetType;
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

describe('External Actions: ', function() {
	describe('Happy Path tests - Create new action ', function() {
		describe('for the Story asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction().then(function(asset) {
					id = momentlessId(asset);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Story:1057').should.eventually.have.property('status', 200);
			});
			/*it('it should not be invokable by a non-story asset', function() {
				return dc.InvokeAction(id, 'Defect:1058').should.eventually.have.property('status', 404);
			});*/
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('for the Defect asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction('Fix this', 'Defect', endpointUrl, 'Fixed').then(function(asset) {
					id = momentlessId(asset);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Defect:1058').should.eventually.have.property('status', 200);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('for the Portfolio Item asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction('Something Epic','Epic', endpointUrl, 'Begin').then(function(asset) {
					id = momentlessId(asset);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Epic:1125').should.eventually.have.property('status', 200);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
		describe('for the Project asset type', function() {
			var id;
			before(function(done) {
				dc.CreateAction('Progress','Scope', endpointUrl,'Move along').then(function(asset) {
					id = momentlessId(asset);
					done();
				});
			});
			it('it should then be invokable', function() {
				return dc.InvokeAction(id, 'Scope:1003').should.eventually.have.property('status', 200);
			});
			it('it should then be deletable', function() {
				return dc.DeleteAction(id).should.eventually.have.property('status', 200);
			});
		});
	});
	/*describe('Sad Path tests - Create new action ', function() {
		describe('')
	});	*/
});
