//The restful client for NEO4J
var mergeOptions=require('./libs/option_helper').mergeOptionsWithDefault;

var HttpClient;
var Node;
var Relation;

//dependencies
injector.process("HttpClient","NeoNode","NeoRelation",function(Client,NeoNode,NeoRelation){
	HttpClient=Client;
	Node=NeoNode;
	Relation=NeoRelation;
})

var NeoManager=function(attrs)
{
	mergeOptions.call(this,attrs);
}

injector.process("TraitsObjectStatusSupport",function(traits){
	mixin(NeoManager,traits);
})

NeoManager.prototype._options={
	connectionStr : "http://localhost:7474"
}

NeoManager.prototype.createNode=function(data,label)
{
	var node=new Node();
	node.services.create=this.options.connectionStr + "/db/data/node"
	node.data=data;
	node.label=label;
	return node;
}

NeoManager.prototype.cypher=function(query,params)
{
	var that=this;
	this._setStatusPending();
	var q={};
	q.query=query;
	if(typeof params === "object")
	{
		q.params = params;
	}
	this._setStatusReady();
	var httpClient=new HttpClient(this.options.connectionStr + "/db/data/cypher");
	httpClient.post(q).then(function(data){
		that._setStatusSuccess(data);
	}).catch(function(error){
		that._setstatusFailed(error);
	})
	return this;
}

exports.getInstance=function(attrs){
	return new NeoManager(attrs);
}