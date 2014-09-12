var ReportBusiness=function()
{

}
injector.process("TraitsObjectStatusSupport",function(traits){
	mixin(ReportBusiness,traits);
})
ReportBusiness.prototype.createMenu=function($btnGroup,onClick)
{
	injector.process("reportItems",function(reportItems){
		reportItems.forEach(function(report){
			var $btn=$('<button type="button" class="btn btn-default btn-' + report.type + '" id="' + report.id + 'Btn">'+ report.text+'</buton>');
			$btn.click(function(evt){
				onClick(report,evt);
			});
			$btnGroup.append($btn);
		})
	});
}
ReportBusiness.prototype.runReport=function(reportItem)
{
	this._setStatusSuccess(reportItem);
	return this;
}
exports.ReportBusiness=ReportBusiness;