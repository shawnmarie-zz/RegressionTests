'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _transformDataToAsset = require('./transformDataToAsset');

var _transformDataToAsset2 = _interopRequireDefault(_transformDataToAsset);

var _V1Server = require('./V1Server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var V1Meta = function () {
	function V1Meta(_ref) {
		var hostname = _ref.hostname;
		var instance = _ref.instance;
		var protocol = _ref.protocol;
		var port = _ref.port;
		var username = _ref.username;
		var password = _ref.password;
		var postFn = _ref.postFn;
		var getFn = _ref.getFn;

		_classCallCheck(this, V1Meta);

		this.urls = (0, _V1Server.getUrlsForV1Server)({ hostname: hostname, instance: instance, protocol: protocol, port: port });
		this.postFn = postFn;
		this.getFn = getFn;
		if (username && password) {
			var encodedAuthenticationCredentials = (0, _btoa2.default)(username + ':' + password);
			this.authHeader = 'Basic ' + encodedAuthenticationCredentials;
		}
	}

	_createClass(V1Meta, [{
		key: 'create',
		value: function create(assetType, assetAttributeData) {
			var postData = (0, _transformDataToAsset2.default)(assetAttributeData);
			var url = this.urls.rest() + '/' + assetType;
			var headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			};
			if (this.authHeader) {
				headers.Authorization = this.authHeader;
			}
			return Promise.resolve(this.postFn(url, postData, headers));
		}
	}, {
		key: 'update',
		value: function update(oidToken, assetType, assetData, changeComment) {
			var postData = (0, _transformDataToAsset2.default)(assetData);
			var url = this.urls.rest() + '/' + assetType + '/' + oidToken + (changeComment ? '?comment=' + encodeURIComponent(changeComment) : '');
			return Promise.resolve(this.postFn(url, postData));
		}
	}, {
		key: 'executeOperation',
		value: function executeOperation(assetType, oidToken, name) {
			var postData = '';
			var url = this.urls.rest() + '/' + assetType + '/' + oidToken + '?op=' + name;
			return Promise.resolve(this.postFn(url, postData));
		}
	}, {
		key: 'query',
		value: function query(queryObj) {
			(0, _invariant2.default)(queryObj.from, 'Error: there was no `from` property on provided query: ' + queryObj);
			(0, _invariant2.default)(queryObj.select, 'Error: there was no `from` property on provided query: ' + queryObj);
			(0, _invariant2.default)(Array.isArray(queryObj.select), 'Error: there was no `from` property on provided query: ' + queryObj);
			var url = this.urls.query();
			return this.getFn(url, queryObj);
		}
	}]);

	return V1Meta;
}();

exports.default = V1Meta;