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

VisitBusiness.prototype.save=function(clientCode,visitData)
{
  this._setStatusFailed("Not implemented");
  return this;
}

exports.VisitBusiness=VisitBusiness;
