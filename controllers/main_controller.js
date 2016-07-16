(function(){
	var app=angular.module("AppSysFotoTerm");
	app.controller("MainController",function($http,$location){
		var mainCtrl=this;
		var dataG = info.data;

		//FUNCION PARA CARGAR LOS LUGARES DE LA BASE DE DATOS
		mainCtrl.cargarLugares=function (){
			$http.get("./models/get_places.php?")
	            .success(function (data){
	                mainCtrl.places=data;      
	            })
	            .error(function (err){
	                mainCtrl.places=[];
	            });
		};
		mainCtrl.cargarLugares();

		//FUNCION PARA ACTUALIZAR COMBOBOX DE DATOS SOLICITADOS
		mainCtrl.actualizarComboBoxSistema=function (){
			var s1 = document.getElementById("slct_system");
			var s2 = document.getElementById("slct_data");
			s2.innerHTML = "";
			if(mainCtrl.systemSelected === "Fotovoltaico"){
				var optionArray = ["|","kwp|Kw Producidos","kwc|Kw Consumidos","kwd|Diferencia"];
			} else if(mainCtrl.systemSelected === "Termico"){
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
		mainCtrl.actualizarComboBoxTiempo=function (){
			if(mainCtrl.periodSelected === "Día"){
				document.getElementById("calendar").type="date";
			} else if(mainCtrl.periodSelected === "Semana"){
				document.getElementById("calendar").type="week";
			} else if(mainCtrl.periodSelected === "Mes"){
				document.getElementById("calendar").type="month";
			} else if(mainCtrl.periodSelected === "Año"){
				document.getElementById("calendar").type="month";
			}
		};

		//FUNCION CARGAR DATOS EN EL GRAFICO
		mainCtrl.cargarGrafico=function(){
	    	document.getElementById("vacio").style.display = "none";
	    	document.getElementById("loader").style.display = "block";
	    	var delay=0;
			setTimeout(function() {
			 	document.getElementById("loader").style.display = "none";
	    		document.getElementById("grafico").style.display = "block";
			}, delay);
	    	
			var ctx2 = document.getElementById("chart-bar").getContext("2d");
			window.myBar = new Chart(ctx2).Bar(dataG);
		};
	});
})();