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
	})
}

exports.getInstance=function(){
	return new Index();
}