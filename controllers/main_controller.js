(function(){
	var app=angular.module("AppSysFotoTerm");
	app.controller("MainController",function($http,$location){
		var mainCtrl=this;
		mainCtrl.dataG = info.data;
		mainCtrl.dataT = info.table;
		console.log(mainCtrl.dataT);

		//FUNCTION TO LOAD PLACES
		mainCtrl.loadPlaces=function (){
			$http.get("./models/get_places.php?")
	            .success(function (data){
	                mainCtrl.places=data;      
	            })
	            .error(function (err){
	                mainCtrl.places=[];
	            });
		};
		mainCtrl.loadPlaces();

		//FUNCTION TO UPDATE WHAT VALUES SHOW DEPEND OF THE SYSTEM SELECTED
		mainCtrl.updateComboBoxData=function (){
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

		//FUNCTION TO UPDATE THE COMBOBOX WITH DIFFERENT TYPE OF DATE
		mainCtrl.updateComboBoxDate=function (){
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

		//FUNCTION TO LOAD A GRAPHIC OR TABLE WITH DATA
		mainCtrl.processQuery=function(){
			document.getElementById("cNoResults").style.display = "none";
	    	//document.getElementById("loader").style.display = "block";
	    	var delay=0;
	    	$http.get("./models/get_day_values.php?txtDay='2016-08-27 05:30:00'&txtDay2='2016-08-27 18:30:00'&txtSystem=sys_photovoltaic&txtPlace=2&txtElement=kw_produced")
	            .success(function (data){
	            	mainCtrl.dataT=data.lines
	                mainCtrl.dataG.labels=data.lines;
	                mainCtrl.dataG.datasets[0].data=data.values; 

	                alert(mainCtrl.dataT);
	                
	                if(mainCtrl.modeSelected === "Gráfico"){
						setTimeout(function() {
						 	document.getElementById("loader").style.display = "none";
						 	document.getElementById("table").style.display = "none";
				    		document.getElementById("graphic").style.display = "block";
						}, delay);
				    	
						var ctx2 = document.getElementById("chart-bar").getContext("2d");
						window.myBar = new Chart(ctx2).Bar(mainCtrl.dataG);
					}else{

						document.getElementById("graphic").style.display = "none";
						document.getElementById("table").style.display = "block";
					}   
	            })
	            .error(function (err){
	                mainCtrl.dataT=[];
	                mainCtrl.dataG=[];
	            });
		};
	});
})();