var Login=function(){

}

injector.process("BaseController",function(BaseController)
{
	Login.prototype=new BaseController();
})

Login.prototype.render=function(){
	var $body=this.getBody();
	$body.empty();
	injector.process('FormGenerator',function(FormGen){

		var formGen=FormGen.getInstance();
		formGen.bind("success",function(data){
			injector.process("loginService","dispatcher","notifier","session",function(service,dispatcher,notifier,session){
				service.login(data.email,data.password).success(function(user){
					session.set("user",user);
					dispatcher.redirect("/")
				}).failed(function(){
					session.remove("user");
					notifier.error("Username and password don't match");
				})
			})
		});

		$body.append(formGen.generate(
		{type: "email",code : "email", required: "required", value: "liy@leesoft.ca"}
		,{type: "password", code: "password", required: "required", value : "passw0rd"}
		));
	})
}

exports.getInstance=function(){
	return new Login();
}