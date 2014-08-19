exports.render=function(attr)
{
	var type=attr.type || "button";
	var label=attr.label || (type[0].toUpperCase()+type.slice(1));
	return $("<button type='" + type + "' class='btn btn-default'>" + label + "</button>");
}