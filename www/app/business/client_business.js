var ClientBusiness=function()
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
  mixin(ClientBusiness,traits);
})


ClientBusiness.prototype.save=function(data)
{
  var that=this;
  var neo=this.Neo.getInstance();
  var client1 =neo.loadModel("client",data);
  var client2 =neo.loadModel("client",data);
  var user=neo.loadModel("user",{},this.session.get("user").id);

  client1.findFirstBy("clientCode = '" + data.clientCode + "'").success(function(c){
    if(c===null)
    {
      saveClient();
    }else
    {
      that._setStatusFailed("The client with the same clientCode exists");
    }
  }).failed(function(){
    that._setStatusFailed(error.responseText);
  });

  var saveClient=function()
  {
    client2.save().success(function(c){
      var link=new that.BaseLink("CLIENT_OF");
      link.link(c,user).success(function(){
        that._setStatusSuccess("The relationship between you and the client has been created");
      });
    })
    .failed(function(error){
      that._setStatusFailed(error.responseText);
    })
  }
  return this;
}

exports.ClientBusiness=ClientBusiness;
