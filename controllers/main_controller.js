
var app=angular.module("AppSysFotoTerm");
app.controller("MainController",function($scope,$http,$location){
	//$scope.nombre=MyService.data.name;
	var data = {
		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
		datasets: [
		{
			label: "Kw Producidos",
			fillColor: "RoyalBlue",
			strokeColor: "RoyalBlue",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 5]
		},
		{
			label: "Kw Consumidos",
			fillColor: "SeaGreen",
			strokeColor: "SeaGreen",
			highlightFill: "rgba(151,187,205,0.75)",
			highlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86]
		}
		]
	};

	$scope.nombre="Usuario  ";

	//FUNCION DE LOGOUT 
	$scope.cerrarSesion=function (){
		$location.path("/");
	};

	$scope.cargarGrafico=function(){
		//myVar = setTimeout(showPage, 1500);
    	document.getElementById("vacio").style.display = "none";
    	document.getElementById("loader").style.display = "block";
    	var delay=0;
		setTimeout(function() {
		 	document.getElementById("loader").style.display = "none";
    		document.getElementById("grafico").style.display = "block";
		}, delay);
    	
		var ctx2 = document.getElementById("chart-bar").getContext("2d");
		window.myBar = new Chart(ctx2).Bar(data);
	};
});