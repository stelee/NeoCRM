var VisitBusiness=function()
{
  var that=this;
  injector.process("Neo","session","BaseLink",function(Neo,session,BaseLink)
  {
    that.Neo=Neo;
    that.session=session;
    that.BaseLink=BaseLink;
  })
}

//with Traits
injector.process("TraitsObjectStatusSupport",function(traits){
  mixin(VisitBusiness,traits);
})
//private:
VisitBusiness.prototype._save_the_visit=function(client,visitData)
{
  var that=this;
  var neo=this.Neo.getInstance();
  var user=neo.loadModel("user",{},this.session.get("user").id);
  var link=new that.BaseLink("VISIT");
  visitData.timestamp=new Date();
  link.link(user,client,visitData).success(function(){
    that._setStatusSuccess("you have logged this visit");
  }).failed(function(error){
    that._setStatusFailed(error.responseText);
  })
}

//public:
VisitBusiness.prototype.save=function(clientCode,visitData)
{
  var that=this;
  var neo=this.Neo.getInstance();
  var client=neo.loadModel("client");
  client.findFirstBy("clientCode = '" + clientCode + "'").success(function(c){
    if(c === null)
    {
      that._setStatusFailed("The client doesn't exist");
    }else
    {
      that._save_the_visit(c, visitData);
    }
  }).failed(function(error){
    debugger;
    that._setStatusFailed(error.responseText);
  });
  return this;
}

exports.VisitBusiness=VisitBusiness;
