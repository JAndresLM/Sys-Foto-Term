(function(){
	var app=angular.module("AppSysFotoTerm");
	app.controller("MainController",function($http,$location,$filter){
		var mainCtrl=this;
		mainCtrl.dataG = info.data;
		mainCtrl.dataT = info.table;
		console.log(mainCtrl.dataT);

		mainCtrl.years=getYears();


		//FUNCTION TO GET YEARS
		function getYears(){
			minYear=2016;
			maxYear = new Date().getFullYear();
			years=[];
			for (i = minYear; i <= maxYear; i++) { 
			    years.push(i);
			}
			return years;
		};

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
			mainCtrl.daySelected=null;
			mainCtrl.monthSelected=null;
			mainCtrl.weekSelected=null;
			mainCtrl.yearSelected=null;
		};

		//FUNCTION TO LOAD A GRAPHIC OR TABLE WITH DATA
		mainCtrl.processQuery=function(){
			document.getElementById("cNoResults").style.display = "none";
	    	//document.getElementById("loader").style.display = "block";

	    	startDate=getStartDate();
	    	endDate=getEndDate();
	    	place=mainCtrl.placeSelected.place;
	    	column=getColumn();

	    	alert(" Place:"+mainCtrl.placeSelected.place+
	    		" System:"+mainCtrl.systemSelected+
	    		" Data:"+mainCtrl.dataSelected+
	    		" Period:"+mainCtrl.periodSelected+
	    		" Date:"+mainCtrl.daySelected+
	    		" Mode:"+mainCtrl.modeSelected
	    		);
	    	//" Date:"+($filter('date')(mainCtrl.dateSelected, 'dd-MM-yyyy HH:mm:ss'))+

	    	var delay=0;
	    	//$http.get("./models/get_day_values_photo.php?txtDay='2016-08-27 05:30:00'&txtDay2='2016-08-27 18:30:00'&txtSystem=sys_photovoltaic&txtPlace=2&txtElement=kw_produced")
	    	var request="./models/get_day_values_photo.php?txtDay='"+startDate+"'&txtDay2='"+endDate+"'&txtPlace='"+place+"'&txtElement="+column;
	    	alert(request);
	    	console.log(request);
	    	$http.get(request)
	            .success(function (data){
	            	mainCtrl.dataT=data.lines
	                mainCtrl.dataG.labels=data.lines;
	                mainCtrl.dataG.datasets[0].data=data.values; 
	                
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

		function getStartDate(){
			if(mainCtrl.periodSelected === "Día"){
				return ($filter('date')(mainCtrl.daySelected, 'dd-MM-yyyy'))+" 00:00:01";
			} else if(mainCtrl.periodSelected === "Semana"){
				//document.getElementById("calendar").type="week";
			} else if(mainCtrl.periodSelected === "Mes"){
				//document.getElementById("calendar").type="month";
			} else if(mainCtrl.periodSelected === "Año"){
				//document.getElementById("calendar").type="month";
			}
		};

		function getEndDate(){
			if(mainCtrl.periodSelected === "Día"){
				return ($filter('date')(mainCtrl.daySelected, 'dd-MM-yyyy'))+" 23:59:59";
			} else if(mainCtrl.periodSelected === "Semana"){
				//document.getElementById("calendar").type="week";
			} else if(mainCtrl.periodSelected === "Mes"){
				//document.getElementById("calendar").type="month";
			} else if(mainCtrl.periodSelected === "Año"){
				//document.getElementById("calendar").type="month";
			}
		};

		function getColumn(){
			if (mainCtrl.dataSelected === "kwp"){
				return "kw_produced";
			}
		};

	});
})();