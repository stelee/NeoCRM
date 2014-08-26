//The restful client for NEO4J
var mergeOptions=require('./libs/option_helper').mergeOptionsWithDefault;

var HttpClient;

//dependencies
injector.process("HttpClient",function(Client){
	HttpClient=Client;
})

var Neo=function(attrs)
{
	mergeOptions.call(this,attrs);
}
Neo.prototype._options={
	connectionStr : "http://localhost:7474"
}

Neo.prototype.save=function(data,label)
{
	var url=connectionStr + "/db/data/node"
	var httpClient=new HttpClient(url);
	
}

exports.getInstance=function(attrs){
	return new Neo(attrs);
}