(function(){
	var config=require("./config");
	var router=require("./libs/router").getInstance(config.routers);
	
	//registration of the dependencies
	injector.register("appConfig",config.appConfig);
	injector.register("routerService",router);
	injector.register("locationService",require("./libs/location_service").getInstance());
	injector.register("menuController",require("./libs/menu_controller").getInstance($("[data-role=menu]")));
	injector.register("titleController",require("./libs/title_controller").getInstance($("[data-role=title]")));
	injector.register("dispatcher",require("./libs/dispatcher").getInstance());
	injector.register("BaseController",require("./libs/base_controller").BaseController);
	injector.register("SBaseController",require("./libs/secure_base_controller").SBaseController);
	injector.register("templateManager",require("./libs/template_manager").getInstance({
																						path: './template',
																						postfix: 'html'
																					}));
	injector.register("hoganTemplates",require("./views/template").templates);
	injector.register("loadBar",require("./libs/progress_bar").getInstance());
	injector.register("widgetManager",require("./libs/widget_manager").getInstance());
	injector.register("eventManager",require("./libs/event_manager").getInstance());
	injector.register("formValidator",require("./libs/form_validator").getInstance());
	injector.register("notifier",require("./libs/notifier").getInstance());
	injector.register("FormGenerator",require("./libs/form_generator"));
	injector.register("baseWidget",require("./libs/base_widget").getInstance());
	injector.register("BaseService",require("./services/base_service").BaseService);
	injector.register("loginService",require("./services/login_service").getInstance());
	injector.register("session",context.session);
	injector.register("storage",context.storage);
})()