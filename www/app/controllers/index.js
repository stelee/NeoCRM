var Index=function(){

}

injector.process("SBaseController",function(BaseController)
{
	Index.prototype=new BaseController();
})

Index.prototype.render=function(){
	var that=this;
	this.getBody().empty();
	injector.process('templateManager',"@reportBusiness","eventManager",
		function(templateManager,reportBusiness,eventManager){
		that.getBody().append(templateManager.render("welcome"));
		$reportSelectBtnGroup=that.getBody().find("#reportSelectBtnGroup");
		reportBusiness.createMenu($reportSelectBtnGroup,function(reportItem){
			eventManager.trigger(document,"Run-Report",reportItem);
		});
		eventManager.bind(document,"Run-Report",function(event,reportItem){
			reportBusiness.runReport(reportItem).success(function(report){
				$container=that.getBody().find("#reportFrame");
				$container.empty();
				$container.append("<h3> report result of "+report.id+"</h3>");
			})
		})
	})
}

exports.getInstance=function(){
	return new Index();
}