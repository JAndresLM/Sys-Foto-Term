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
            //creamos la cookie con el nombre que nos han pasado
            $cookies.username = username;
            $cookies.password = password;
            console.log($cookies.username);
            //mandamos a la home
            $location.path("/home");
        },
        logout : function(username, password)
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
			$cookieStore.remove(username);
            $cookieStore.remove(password);
            console.log($cookieStore);
            //mandamos al login
            location.reload();
            $location.path("/");
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/home","/"];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) == "undefined")
            {
                $location.path("/");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
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
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function()
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    })
})