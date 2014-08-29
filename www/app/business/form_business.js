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
  return formGen.generate(
    {code : "visitDate", label: "Date",subType: "date",type: "datetime"}
    ,{code : "visitDate", label: "Time",subType: "time",type:"datetime"}
    ,{code : "clientCode", label: "Client Code",type: "input", required: "required"}
    ,{code : "location", label: "Address", type:"input"}
    ,{code : "comment", label: "Comment",type: "text"}
  );
}

exports.FormBusiness=FormBusiness;
