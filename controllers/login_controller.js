(function(){
    var app=angular.module("AppSysFotoTerm");

    app.run(function($rootScope){
        $rootScope.resetForm = function(form){
            form.$setPristine();
        };
    })

    app.controller("LoginController",function($http,$location,auth){
        var loginCtrl=this;
        loginCtrl.username="";
        loginCtrl.password="";
        loginCtrl.message="";
        loginCtrl.name=info.name;
        loginCtrl.show=false;
        loginCtrl.hide=true;

        loginCtrl.startSession=function (){
            loginCtrl.show=false;
            loginCtrl.hide=true;
            
            $http.get("./models/get_user.php?txtUsername="+loginCtrl.username+"&txtPassword="+loginCtrl.password)
                .success(function (data){
                    if(data[0].access==='accepted'){
                        loginCtrl.name=data[0].uName;
                        info.name=loginCtrl.name;
                        auth.login(loginCtrl.name,loginCtrl.name);
                        //$location.path("/home");
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

        //FUNCION DE LOGOUT 
        loginCtrl.closeSession=function (){
            //auth.logout(loginCtrl.name,loginCtrl.name);
            //$location.path("/");
        };

        //FUNCION PARA MOSTRAR EL MODAL DEL SISTEMA FOTOVOLTAICO 
        loginCtrl.showSystemPhotovoltaic=function (){
            $('#myModalPhoto').modal('show');
        };

        //FUNCION PARA MOSTRAR EL MODAL DEL SISTEMA TERMICO 
        loginCtrl.showSystemThermal=function (){
            $('#myModalThermal').modal('show');
        };

        //FUNCION PARA MOSTRAR EL MODAL DE LOS LUGARES
        loginCtrl.showPlaces=function (){
            $('#myModalPlaces').modal('show');
        };

        //FUNCION PARA MOSTRAR EL MODAL DE LOS USUARIOS
        loginCtrl.showUsers=function (){
            $('#myModalUsers').modal('show');
        };

        //FUNCION PARA MOSTRAR EL MODAL DE LAS INSTRUCCIONES
        loginCtrl.showInstructions=function (){
            $('#myModalInstructions').modal('show');
        };
    });
})();	