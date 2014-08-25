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
			formGen.bind("success",function(data)
			{
				injector.process("Neo","session",function(Neo,session){
					var neo=Neo.getInstance();
					neo.createNode(data,'CLIENT').success(function(node){
						notifier.info("The customer has been saved, you will be set as to know this customer");
						neo.cypher('match (u:USER),(c:CLIENT)\
							where u.email = {youremail} and c.clientCode={clientCode}\
							optional match (c)-[r:BELONGS_TO]->(u)\
							where r is null\
							create (c)-[:BELONGS_TO]->(u)\
							return u,c',{
								youremail : session.get("user").username,
								clientCode : node.data.clientCode
							}).success(function(data){
								notifier.info("The relationship between you and the client has been created");
							}).failed(function(error){
								notifier.error(error.responseText);
							}
						);

					}).failed(function(error){
						notifier.error(error);
					}).save();
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
			formGen.bind("success",function(data)
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