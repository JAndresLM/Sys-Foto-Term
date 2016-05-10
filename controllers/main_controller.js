
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
	
	$scope.datos={
		sys1:{nombre:"Térmico", lista:["Sensor 1","Sensor 2", "Sensor 3"]},
		sys2:{nombre:"Fotovoltaico", lista:["Kw Producidos","Kw Consumidos", "Diferencia"]}
	}
	$scope.lugares=[];
	//$scope.selectedSys=$scope.datos.sys1;
	$scope.datosTermico=["Sensor 1","Sensor 2", "Sensor 3"];
	$scope.datosFotovoltaico=["Kw Producidos","Kw Consumidos", "Diferencia"];

	//FUNCION PARA CARGAR LOS LUGARES DE LA BASE DE DATOS
	$scope.cargarLugares=function (){
		$http.get("http://localhost/AsistElectro/models/obtener_lugares.php?")
            .success(function (data){
                $scope.lugares=data;      
            })
            .error(function (err){
                $scope.lugares=[];
            });
	};
	$scope.cargarLugares();

	//FUNCION PARA ACTUALIZAR COMBOBOX DE DATOS SOLICITADOS
	$scope.actualizarComboBoxSistema=function (){
		var s1 = document.getElementById("slct_sistema");
		var s2 = document.getElementById("slct_dato");
		s2.innerHTML = "";
		if(s1.value == "sf"){
			var optionArray = ["|","kwp|Kw Producidos","kwc|Kw Consumidos","kwd|Diferencia"];
		} else if(s1.value == "st"){
			var optionArray = ["|","ts1|Sensor 1","ts2|Sensor 2","ts3|Sensor 3"];
		}
		
		for(var option in optionArray){
			var pair = optionArray[option].split("|");
			var newOption = document.createElement("option");
			newOption.value = pair[0];
			newOption.innerHTML = pair[1];
			s2.options.add(newOption);
		}
	};

	//FUNCION PARA ACTUALIZAR COMBOBOX DE DATOS SOLICITADOS
	$scope.actualizarComboBoxTiempo=function (){
		var st = document.getElementById("slct_tiempo");
		if(st.value == "td"){
			document.getElementById("calendario").type="date";
		} else if(st.value == "ts"){
			document.getElementById("calendario").type="week";
		} else if(st.value == "tm"){
			document.getElementById("calendario").type="month";
		} else if(st.value == "ta"){
			document.getElementById("calendario").type="month";
		}
	};

	//FUNCION DE LOGOUT 
	$scope.cerrarSesion=function (){
		$location.path("/");
	};

	//FUNCION CARGAR DATOS EN EL GRAFICO
	$scope.cargarGrafico=function(){
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