(function(){
    var app=angular.module("AppSysFotoTerm");

    app.run(function($rootScope){
        $rootScope.resetForm = function(form){
            form.$setPristine();
        };
    })

    app.controller("LoginController",function($http,$location){
        var loginCtrl=this;
        loginCtrl.username="";
        loginCtrl.password="";
        loginCtrl.message="";
        loginCtrl.name="";
        loginCtrl.show=false;
        loginCtrl.hide=true;

        loginCtrl.startSession=function (){
            loginCtrl.show=false;
            loginCtrl.hide=true;
            
            $http.get("./models/get_user.php?txtUsername="+loginCtrl.username+"&txtPassword="+loginCtrl.password)
                .success(function (data){
                    if(data[0].access==='accepted'){
                        loginCtrl.name=data[0].uName;
                        $location.path("/home");
                    }else{
                        loginCtrl.message=" Los datos ingresados no coinciden. Por favor verifique sus credenciales.";
                        loginCtrl.show=true;
                        loginCtrl.hide=false;
                    }      
                })
                .error(function (err){
                    loginCtrl.message=" Ha ocurrido un error con el acceso a la base de datos. Por favor inténtelo nuevamente.";
                    loginCtrl.show=true;
                    loginCtrl.hide=false;
                });
        };
    });
})();	