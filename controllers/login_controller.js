var app=angular.module("AppSysFotoTerm");
app.factory("MyService", function() {
    //var data = {"name":"no se"};
    var data = new Object();
    return data;
});
app.controller("LoginController",function($scope,$http,$location,MyService){
	$scope.username="";
	$scope.password="";
    $scope.mensaje="";
    $scope.nombre="";
	$scope.mostrar=false;
	$scope.ocultar=true;

	$scope.iniciarSesion=function (){
		$scope.mostrar=false;
		$scope.ocultar=true;
        
        $http.get("http://localhost/AsistElectro/models/validar_login.php?txtUsername="+$scope.username+"&txtPassword="+$scope.password)
            .success(function (data){
                if(data[0].acceso==='concedido'){
                    $scope.nombre=data[0].uNombre;
                    //MyService.data.name = $scope.nombre;
                    $location.path("/principal");
                }else{
                    $scope.mensaje=" Los datos ingresados no coinciden. Por favor verifique sus credenciales.";
                    $scope.mostrar=true;
                    $scope.ocultar=false;
                }      
            })
            .error(function (err){
                $scope.mensaje=" Ha ocurrido un error con el acceso a la base de datos. Por favor inténtelo nuevamente.";
                $scope.mostrar=true;
                $scope.ocultar=false;
            });
    };
});	
