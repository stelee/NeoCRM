var BaseModel;
injector.process("BaseModel",function(Model)
{
  BaseModel=Model;
})
var User=function(data,id)
{
  BaseModel.apply(this,["CLIENT",data,id]);
}

User.prototype=new BaseModel();


exports.getInstance=function(data,id)
{
  return new User(data,id);
}
