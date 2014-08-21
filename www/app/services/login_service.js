//mock version of login service
var LoginService=function()
{
	var that=this;
	injector.process("loadBar",function(loadBar){
		that.loadBar=loadBar;
	})
}
injector.process("BaseService",function(BaseService){
	LoginService.prototype=new BaseService();
})
LoginService.prototype.login=function(username, password)
{
	var that=this;
	that.loadBar.show();
	setTimeout(function(){
		that.loadBar.hide();
		if(username === "liy@leesoft.ca" && password === "passw0rd")
		{
			that._onsuccess({
				username : username,
				displayName: "Yang Li",
				group: "TEST-GROUP"
			});
		}else
		{
			that._onfailed();
		}
	},1000)
	return this;
}
exports.getInstance=function()
{
	return new LoginService();
}