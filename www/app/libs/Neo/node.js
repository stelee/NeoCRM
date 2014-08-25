var HttpClient;
injector.process("HttpClient",function(Client){
	HttpClient=Client;
})

var Node=function()
{
	this.services={};
	this.data=null;
	this.label=null;
}

Node.prototype.onSuccess=function(data)
{
	console.log(data);
}

Node.prototype.onFailed=function(err)
{
	console.error(err);
}

Node.prototype.success=function(fn)
{
	this.onSuccess=fn;
	return this;
}
Node.prototype.failed=function(fn)
{
	this.onFailed=fn;
	return this;
}


Node.prototype.save=function(onSuccess,onFailed)
{
	if(!!onSuccess)
	{
		this.onSuccess=onSuccess;
	}

	if(!!onFailed)
	{
		this.onFailed=onFailed;
	}

	if(this.data === null)
	{
		onFailed(new Error("data of the NeoNode is null"));
	}
	var that=this;
	var httpClient=new HttpClient(this.services.create);
	httpClient.post(this.data).then(function(ref){
		for(var prop in ref)
		{
			if(prop === "extensions") continue; //do nothing right now
			if(prop === "data")
			{
				that.data=ref[prop];
			}else
			{
				that.services[prop]=ref[prop];
			}
		}
		if(that.label === null)
		{
			that.onSuccess(that);
		}else
		{
			var httpClient2=new HttpClient(that.services["labels"]);
			httpClient2.post(that.label).then(function(){
				that.onSuccess(that);
			}).catch(function(e)
			{
				that.onFailed(e);
			})
		}
	}).catch(function(e){
		that.onFailed(e);
	})
	return this;
}

exports.Node=Node;