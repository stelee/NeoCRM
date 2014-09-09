var FormBusiness=function()
{

}
FormBusiness.prototype.showAddClientForm=function(formGen)
{
  return formGen.generate(
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
  );
}
FormBusiness.prototype.showAddVisitForm=function(formGen)
{
  var session;
  injector.process("session",function(s){session=s});
  return formGen.generate(
    {code : "visitDate", label: "Date",subType: "date",type: "datetime"}
    ,{code : "visitTime", label: "Time",subType: "time",type:"datetime"}
    ,{code : "clientCode", label: "Client Code",type: "input", required: "required",autocomplete:{
      source: function(request,response)
      {
        var term=request.term;
        var userId=session.get("user").id;
        injector.process("Neo",function(Neo){
          var neo=Neo.getInstance();
          var client=neo.loadModel("client");
          client.searchClientsByTermAndUserid(term,userId).success(function(clients){
            var result=[];
            clients.forEach(function(client){
              result.push(client.data.clientCode);
            })
            response(result);
          }).failed(function(error){
            console.err(error);
          })
        })
      }
    }}
    ,{code : "location", label: "Address", type:"input"}
    ,{code : "comment", label: "Comment",type: "text"}
  );
}

exports.FormBusiness=FormBusiness;
