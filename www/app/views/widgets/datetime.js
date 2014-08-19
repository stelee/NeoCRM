exports.render=function(attr)
{
	var $comp=$("<div class='form-group'>");
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );

	var type=attr.type || "date";

	$comp.append("<input type='" + type + "' class='form-control' id='" + attr.code + "' placeholder='" + attr.label + "'>")
	return $comp;
}