if (!!!templates) var templates = {};
templates["about"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h1>NEO4J CRM</h1>");t.b("\n");t.b("\n" + i);t.b("<p>This is the CRM system based on NEO4J - A Graphic database</p>");return t.fl(); },partials: {}, subs: {  }});
templates["welcome"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h3>Welcome!</h3>\r");t.b("\n" + i);t.b("<p>This will be dashboard of NeoCRM, Enjoy it!</p>");return t.fl(); },partials: {}, subs: {  }});
exports.templates=templates 
