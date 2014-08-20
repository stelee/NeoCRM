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
	injector.process("widgetManager","eventManager","formValidator","notifier",
		function(manager,eventManager,validator,notifier){
		manager.append($body,"buttonGroup",[{
			code: "client",
			text: "Client",
			triggerEvent: "Load-Client-Form"
		},{
			code : "visit",
			text: "Visit",
			triggerEvent: "Load-Visit-Form"
		}]);
		$form=manager.append($body,"form");

		eventManager.bind(document,"Load-Client-Form",function(){
			$form.empty();
			manager.append($form,"input",{code : "clientCode", label: "Client Code",required : "required"});
			manager.append($form,"input",{code : "clientName", label: "Client Name", required: "required"});
			manager.append($form,"select",{
				code: "type",
				label: "Client type",
				options:[{value : "client", text : "Client"},
				{value: "reseller", text: "Reseller"}]
			});
			manager.append($form,"input",{code : "address", label: "Address"});
			manager.append($form,"text",{code : "comment", label: "Comment"});
			manager.append($form,"button",{code : "submit",type: "submit",onclick:function(){
				var $form=$(this).parent("[role=form]");
				validator.resetErrorClass($form);
				var ret=validator.simpleValidate($form);
				if(ret.success)
				{
					notifier.success("saved");
				}else
				{
					notifier.error(ret.description);
					$(ret.target).parent().addClass("has-error")
				}
			}});
		});
		eventManager.bind(document,"Load-Visit-Form",function(){
			$form.empty();
			manager.append($form,"datetime",{code : "visitDate", label: "Date",type: "date"});
			manager.append($form,"datetime",{code : "visitDate", label: "Time",type: "time"});
			manager.append($form,"input",{code : "clientCode", label: "Client Code"});
			manager.append($form,"input",{code : "location", label: "Address"});
			manager.append($form,"text",{code : "comment", label: "Comment"});
			manager.append($form,"button",{code : "submit",type: "submit",onclick:function(){

			}});
		})
	})
}

exports.getInstance=function(){
	return new Client();
}