exports.render=function(attr)
{
	rowNumber=attr.rowNumber || 3;
	var $comp=$("<div class='form-group'>");
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );
	$comp.append("<textarea class='form-control' id='" + attr.code + "' row='" + rowNumber + "''>")
	return $comp;
}