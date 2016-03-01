"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getUrlsForV1Server = getUrlsForV1Server;
function getUrlsForV1Server(_ref) {
	var hostname = _ref.hostname;
	var instance = _ref.instance;
	var protocol = _ref.protocol;
	var port = _ref.port;

	var rootUrl = getUrlToV1Server({ hostname: hostname, instance: instance, protocol: protocol, port: port });
	return {
		rest: function rest() {
			return restUrl(rootUrl);
		},
		query: function query() {
			return queryUrl(rootUrl);
		}
	};
}

function getUrlToV1Server(_ref2) {
	var hostname = _ref2.hostname;
	var instance = _ref2.instance;
	var protocol = _ref2.protocol;
	var port = _ref2.port;

	var url = protocol + "//" + hostname + "/" + instance;
	if (port) {
		return url + ":" + port;
	}
	return url;
}

function restUrl(rootUrl) {
	return rootUrl + "/rest-1.v1/Data";
}

function queryUrl(rootUrl) {
	return rootUrl + "/query.v1";
}