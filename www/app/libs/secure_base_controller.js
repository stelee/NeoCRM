var SBaseController=function(){

}

injector.process("BaseController",function(BaseController)
{
	SBaseController.prototype=new BaseController();
})

SBaseController.prototype.auth=function(resolve,reject)
{
	//TODO:Always reject
	var that=this;
	injector.process("appConfig","dispatcher",function(config,dispatcher){
		reject();
		var login=config.login;
		if(!!login)
		{
			dispatcher.redirect(login);
		}else
		{
			this.render_402();
		}
	})
	
}
SBaseController.prototype.render_402=function()
{
	this.getBody().empty();
	this.getBody().append("<h3>402 Not Authorized</h3>")
	this.getBody().append("<p>The page you request is restrict</p>")
}

exports.SBaseController=SBaseController;

exports.getInstance=function(){
	return new SBaseController();
}