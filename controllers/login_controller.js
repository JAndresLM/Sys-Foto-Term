var app=angular.module("AppSysFotoTerm");
app.controller("LoginController",function($scope,$http,$location){
	$scope.username="AndresLM";
	$scope.password="123456";
	$scope.mostrar=false;
	$scope.ocultar=true;

	$scope.iniciarSesion=function (){
		$scope.mostrar=false;
		$scope.ocultar=true;
        
        /*$scope.mensaje="";
        $http.get("http://localhost:8000/Models/validarLogin.php?txtUsername="+$scope.username+"&txtPassword="+$scope.password)
            .success(function (data){
                listaGlobal=data;
                $scope.tipo=listaGlobal[0].uTipo;
                if($scope.tipo==='E'){$location.path("/Estudiante");}
                else if($scope.tipo==='P'){$location.path("/Profesor");}
                else{$scope.mensaje="Credenciales Incorrectos";}
            })
            .error(function (err){
               $scope.mensaje="Ha ocurrido un error :( ";
            });*/

        if($scope.username=='AndresLM' && $scope.password=='123456'){
        	$location.path("/principal");
        }else{
        	$scope.mostrar=true;
			$scope.ocultar=false;
        }
    };
});	