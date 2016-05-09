var app=angular.module("AppSysFotoTerm",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
		.when("/",{
			controller:"LoginController",
			templateUrl:"views/login_form_view.html"
		})
		.when("/home",{
			controller:"MainController",
			templateUrl:"views/main_view.html"
		})
		.otherwise("/");
});