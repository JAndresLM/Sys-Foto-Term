var app=angular.module("AppSysFotoTerm");
app.controller("MainController",function($scope,$http,$location){
	$scope.nombre="Andrés López Molina";
	//FUNCION DE LOGOUT 
    $scope.cerrarSesion=function (){
        $location.path("/");
    };
});