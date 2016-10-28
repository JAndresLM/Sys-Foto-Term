var app=angular.module("AppSysFotoTerm",["ngRoute",'ngCookies']);

app.config(function($routeProvider){
	$routeProvider
		.when("/",{
			controller:"",
			templateUrl:"views/login_form_view.html"
		})
		.when("/home",{
			controller:"MainController",
			controllerAs: 'mainCtrl',
			templateUrl:"views/main_view.html"
		})
		.otherwise("/");
});

app.factory("auth", function($cookies,$cookieStore,$location)
{
    return{
        login : function(username, password)
        {
            $cookies.username = username;
            $cookies.password = password;
            $location.path("/home");
        },
        logout : function(username, password)
        {
			$cookieStore.remove(username);
            $cookieStore.remove(password);
            console.log($cookieStore);
            location.reload();
            $location.path("/");
        },
        checkStatus : function()
        {
            var rutasPrivadas = ["/home","/"];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) == "undefined")
            {
                $location.path("/");
            }
            if(this.in_array("/",rutasPrivadas) && typeof($cookies.username) != "undefined")
            {
                $location.path("/home");
            }
        },
        in_array : function(needle, haystack)
        {
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        }
    }
});

app.run(function($rootScope, auth)
{
    $rootScope.$on('$routeChangeStart', function()
    {
        auth.checkStatus();
    })
})