//configuration of the app
exports.appConfig=
{
	appName: "Leesoft//CA//NeoCRM",
	appDescription: "A CRM System Built On Neo4J",
	version : "0.1.0",
	menus : [
		["DashBoard","/"],
		["Clients","/clients"],
		["Data","/data"],
		["About","/about"]
	],
	login: "/login",
	appPath: "/public/"
}

//configuration of the router
exports.routers={
	"/" : "index",
	"/clients" : "client",
	"/data" : "data",
	"/about" : "about",
	"/login" : "login"
}

exports.reportItems=[
{type: 'primary',id: 'clientReport',text: 'Client report'}
,{type: 'info',id: 'clientVisitReport',text: 'Client visit report'}
]