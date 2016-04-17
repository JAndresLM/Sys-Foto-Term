var app=angular.module("AppSysFotoTerm");
app.controller("LoginController",function($scope,$http,$location){
	$scope.username="";
	$scope.password="";
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
                    $location.path("/principal");
                }else{
                    $scope.mostrar=true;
                    $scope.ocultar=false;
                }      
            })
            .error(function (err){
                $scope.mostrar=true;
                $scope.ocultar=false;
            });
    };
});	