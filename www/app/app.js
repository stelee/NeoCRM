(function(global)
{	//initialize the context
	script("../bower_components/jquery/dist/jquery");
	script("../bower_components/jquery-ui/jquery-ui.js");
	script("../bower_components/bootstrap/dist/js/bootstrap");
	require("./libs/pnotify.custom.min");
	require("./libs/context")
	PNotify.prototype.options.styling = "fontawesome";

	global.Hogan=require('./libs/hogan-3.0.2');
	global.templates={};
	if('undefined' === typeof Promise)
	{
		script("./libs/rsvp-latest");
		Promise = RSVP.Promise;
	}
	require("./dependencies");
	require("./libs/core");
})(this)