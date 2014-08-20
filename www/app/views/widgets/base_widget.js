var BaseWidget=function()
{
	this.$comp=null;
}
BaseWidget.prototype.getComp=function()
{
	return this.$comp;
}

exports.getInstance=function()
{
	return new BaseWidget();
}
