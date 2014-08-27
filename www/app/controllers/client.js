var Client=function(){

}

injector.process("SBaseController",function(BaseController)
{
	Client.prototype=new BaseController();
})

Client.prototype.render=function(){
	var that=this;
	var $body=this.getBody();
	$body.empty();
	injector.process("widgetManager","eventManager","formValidator","notifier","FormGenerator",
		function(manager,eventManager,validator,notifier,generator){
		manager.append($body,"buttonGroup",[{
			code: "client",
			text: "Client",
			triggerEvent: "Load-Client-Form"
		},{
			code : "visit",
			text: "Visit",
			triggerEvent: "Load-Visit-Form"
		}]);

		$container=$("<div>");
		$body.append($container);

		eventManager.bind(document,"Load-Client-Form",function(){
			$container.empty();
			var formGen=generator.getInstance();
			formGen.bind("verified",function(data)
			{
				injector.process("Neo","session","BaseLink",function(Neo,session,BaseLink){
					var neo=Neo.getInstance();
					var client1 =neo.loadModel("client",data);
					var client2 =neo.loadModel("client",data);
					var user=neo.loadModel("user",{},session.get("user").id);

					client1.findFirstBy("clientCode = '" + data.clientCode + "'").success(function(c){
						if(c===null)
						{
							saveClient();
						}else
						{
							notifier.error("The client with the same clientCode exists");
						}
					}).failed(function(){
						notifier.error(error.responseText);
					});

					var saveClient=function()
					{
						client2.save().success(function(c){
							notifier.info("The customer has been saved, you will be set as to know this customer");
							var link=new BaseLink("CLIENT_OF");
							link.link(c,user).success(function(){
								notifier.info("The relationship between you and the client has been created");
							});
						})
						.failed(function(error){
							notifier.error(error.responseText);
						})
					}
				})
			})
			formGen.generate(
				{code : "clientCode", label: "Client Code",required : "required", type: "input"}
				,{code : "clientName", label: "Client Name", required: "required",type: "input"}
				,{
					code: "type",
					label: "Client type",
					options:[
						{value : "client", text : "Client"},
						{value: "reseller", text: "Reseller"}
					],type: "select"
				}
				,{code : "address", label: "Address",type: "input"}
				,{code : "phone", label: "Phone",type: "tel"}
				,{code : "email", label: "Email",type: "email"}
				,{code : "comment", label: "Comment",type: "text"}
			).appendTo($container);
		});
		eventManager.bind(document,"Load-Visit-Form",function(){
			$container.empty();
			var formGen=generator.getInstance();
			formGen.bind("verified",function(data)
			{
				console.log(data);
			})
			formGen.generate(
				{code : "visitDate", label: "Date",subType: "date",type: "datetime"}
				,{code : "visitDate", label: "Time",subType: "time",type:"datetime"}
				,{code : "clientCode", label: "Client Code",type: "input"}
				,{code : "location", label: "Address", type:"input"}
				,{code : "comment", label: "Comment",type: "text"}
			).appendTo($container);
		})
	})
}

exports.getInstance=function(){
	return new Client();
}
