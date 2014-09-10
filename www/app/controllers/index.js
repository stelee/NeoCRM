var Index=function(){

}

injector.process("SBaseController",function(BaseController)
{
	Index.prototype=new BaseController();
})

Index.prototype.render=function(){
	var that=this;
	this.getBody().empty();
	injector.process('templateManager',function(templateManager){
		that.getBody().append(templateManager.render("welcome"));
		$reportSelectBtnGroup=that.getBody().find("#reportSelectBtnGroup");
		
		var reports=[{type: 'primary',id: 'clientReport',text: 'Client report'}
		,{type: 'info',id: 'clientVisitReport',text: 'Client visit report'}];

		reports.forEach(function(report){
			$reportSelectBtnGroup.append('<button type="button" class="btn btn-default btn-' + report.type + '" id="' + report.id + 'Btn">'+ report.text+'</buton>');
		})
	})
}

exports.getInstance=function(){
	return new Index();
}