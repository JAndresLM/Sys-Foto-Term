(function(){
	var app=angular.module("AppSysFotoTerm");
	app.controller("MainController",function($http,$location,$filter,auth){
		var mainCtrl=this;
		mainCtrl.dataG = chartBarConfiguration;
		mainCtrl.dataT = [];
		mainCtrl.years=getYears();
		var ctx = document.getElementById("chartBar");
		var ctx2 = document.getElementById("chartLine");
		var myBarChart = new Chart(ctx, chartBarConfiguration);
		var myLineChart = new Chart(ctx2, chartLineConfiguration);


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

		//FUNCTION TO CHANGE GRAPHIC
		mainCtrl.changView=function (){
			if (info.chartDisplay==="bar"){
				info.chartDisplay="line";
			}else{
				info.chartDisplay="bar";
			}
			if (mainCtrl.modeSelected!="Tabla"){
				showGraphic();
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
	    	initList();
	    	var request=createAndGetRequest();
	    	console.log(request);
	    	$http.get(request)
	            .success(function (data){
	            	mainCtrl.dataT=getList(data.lines,data.values);
	            	console.log(mainCtrl.dataT);
	                mainCtrl.dataG.data.labels=data.lines;
	                mainCtrl.dataG.data.datasets[0].data=data.values; 
	                mainCtrl.dataG.data.datasets[0].label=mainCtrl.dataSelected;
	                
	                if(mainCtrl.modeSelected === "Gráfico" && data.values!=null){
	                	myBarChart.data=mainCtrl.dataG.data;
	                	myLineChart.data=mainCtrl.dataG.data;
						myBarChart.update();
						myLineChart.update();
						showGraphic();
					}else if (mainCtrl.modeSelected === "Tabla" && data.values!=null){
						showTable();
					} else{
						showNoResults();
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
				initialDate=getDatesForYear(mainCtrl.yearSelected,typeDate);
			}else if (mainCtrl.periodSelected==="Mes"){
				tempDate=getDatesForMonth(mainCtrl.monthSelected,typeDate);
				initialDate=($filter('date')(tempDate, 'dd-MM-yyyy'));
			}else if (mainCtrl.periodSelected==="Semana"){
				tempDate=getDatesForWeek(mainCtrl.weekSelected,typeDate);
				initialDate=($filter('date')(tempDate, 'dd-MM-yyyy'));
			}else if (mainCtrl.periodSelected==="Día"){
				initialDate=($filter('date')(mainCtrl.daySelected, 'dd-MM-yyyy'));
			}

			if (typeDate==="start"){
				return getStartDayWithTime(initialDate);
			}else{
				return getEndDayWithTime(initialDate);
			}
		};

		//SET LIST TO EMPTY
		function initList(){
	    	mainCtrl.dataG.data.labels=[];
	        mainCtrl.dataG.data.datasets[0].data=[];
	        mainCtrl.dataT = [];
		};

	});
})();