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
		$body.append(FormGen.getInstance().generate(
		{type: "email",code : "email", required: "required"}
		,{type: "password", code: "password", required: "required"}
		));
	})
}

exports.getInstance=function(){
	return new Login();
}