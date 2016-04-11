var app=angular.module("AppSysFotoTerm");
app.controller("MainController",function($scope){
	$scope.nombre="Andrés López Molina";
	//FUNCION DE LOGOUT 
    $scope.cerrarSesion=function (){
        $location.path("/");
    };
});