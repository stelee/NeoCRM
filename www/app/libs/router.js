"use strict"
/**
 * @class Router
 * @description The router object used to route the http handler to handle the request
 * @constructor
 * @param {Object} routers, the {String}key-(String)value map
 */
 var Router=function(routers){
 	this.routers=routers;
 }

/**
 * @method route
 * @param {string} path
 * @return {string}
 */
Router.prototype.route=function(path)
{
	for(var key in this.routers)
	{
		
		var regex=key;

		regex="^" + regex + "$";

		regex=regex.replace('/','\/');

		var match=path.match(regex);
		if(match==null)
		{
			continue;
		}else
		{
			return {
				handler : this.routers[key],
				params : match.slice(1)
			}
		}
	}
	return null;
}

/**
*	@method routeByCurrentLocation
*	@param
*	@return {string}
*	@comment only support the hashbang URL
*/
Router.prototype.routeByCurrentLocation=function()
{
	var path=""
	injector.process("locationService",function(locationService){
		path=locationService.getCurrentPath();

	});
	return this.route(path);
}

exports.getInstance=function(routers)
{
	return new Router(routers);
}