var BaseModel;
injector.process("BaseModel",function(Model)
{
  BaseModel=Model;
})
var Client=function(data,id)
{
  BaseModel.apply(this,["CLIENT",data,id]);
}

Client.prototype=new BaseModel();


exports.getInstance=function(data,id)
{
  return new Client(data,id);
}
