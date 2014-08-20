exports.render=function(attr)
{
	var $comp=$("<div class='form-group'>");
	var required=attr.required || "";
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );
	$comp.append("<input type='text' class='form-control' id='" + attr.code + "' placeholder='" + attr.label + "' "+required+">")
	return $comp;
}