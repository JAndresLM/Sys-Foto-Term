(function(){
	var app=angular.module("AppSysFotoTerm");
	app.controller("MainController",function($http,$location,$filter){
		var mainCtrl=this;
		mainCtrl.dataG = info.data;
		mainCtrl.dataT = info.table;
		mainCtrl.years=getYears();


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
			changeComboBoxValues(mainCtrl.systemSelected);
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

	    	initList();

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
	    	//var request="./models/get_day_values_photo.php?txtDay='"+startDate+"'&txtDay2='"+endDate+"'&txtPlace='"+place+"'&txtElement="+column;
	    	var request=createAndGetRequest();
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
	                initList();
	            });
		};


		//FUNCTION TO CREATE A REQUEST
		function createAndGetRequest(){
			//getParametersForRequest
	    	startDate=getDates("start");
	    	endDate=getDates("end");
	    	place=mainCtrl.placeSelected.place;
	    	column=getColumn(mainCtrl.dataSelected);
	    	filePHP=getFilePHP(mainCtrl.systemSelected,mainCtrl.periodSelected);

			var request="./models/"+filePHP+".php?txtDay='"+startDate+"'&txtDay2='"+endDate+"'&txtPlace='"+place+"'&txtElement="+column;
			return request;
		};


		//GET START AND END DATE
		function getDates(typeDate){
			initialDate=null;
			if (mainCtrl.periodSelected==="Año"){
				initialDate=mainCtrl.yearSelected;
			}else if (mainCtrl.periodSelected==="Mes"){
				initialDate=($filter('date')(mainCtrl.monthSelected, 'dd-MM-yyyy'));
			}else if (mainCtrl.periodSelected==="Semana"){
				initialDate=($filter('date')(mainCtrl.weekSelected, 'dd-MM-yyyy'));
			}else if (mainCtrl.periodSelected==="Día"){
				initialDate=($filter('date')(mainCtrl.daySelected, 'dd-MM-yyyy'));
			}

			if (typeDate==="start"){
				return getStartDate(mainCtrl.periodSelected,initialDate);
			}else{
				return getEndDate(mainCtrl.periodSelected,initialDate);
			}
		};

		//SET LIST TO EMPTY
		function initList(){
	    	mainCtrl.dataG.labels=[];
	        mainCtrl.dataG.datasets[0].data=[];
	        mainCtrl.dataT = [];
		};

	});
})();