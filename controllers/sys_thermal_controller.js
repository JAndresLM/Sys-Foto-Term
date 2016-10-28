(function(){
    var app=angular.module("AppSysFotoTerm");

    app.controller("SysThermController",function($http){
        var sysThermCtrl=this;

        sysThermCtrl.action="";
        //FUNCTION TO LOAD SYSTEMS
		sysThermCtrl.loadThermSystems=function (){
			$http.get("./models/get_therm_systems.php?")
	            .success(function (data){
	                sysThermCtrl.thermSystems=data;  
	            })
	            .error(function (err){
	                sysThermCtrl.thermSystems=[];
	            });
		};
		sysThermCtrl.loadThermSystems();

		//FUNCTION TO LOAD PLACES
		sysThermCtrl.loadPlaces=function (){
			$http.get("./models/get_places.php?")
	            .success(function (data){
	                sysThermCtrl.places=data;     
	            })
	            .error(function (err){
	                sysThermCtrl.places=[];
	            });
		};
		sysThermCtrl.loadPlaces();

		//FUNCTION TO INSERT SYSTEMS
		sysThermCtrl.insertSystem=function (){
			var request="./models/insert_therm_system.php?description="+sysThermCtrl.description+"&url="+sysThermCtrl.url+"&place="+sysThermCtrl.place.id+"&user="+sysThermCtrl.user+"&pass="+sysThermCtrl.pass;
			console.log(request);
			$http.get(request)
	            .success(function (data){
	                sysThermCtrl.loadThermSystems();
	                sysThermCtrl.description="";
	                sysThermCtrl.url="";
	                sysThermCtrl.place={};
	                sysThermCtrl.user="";
	                sysThermCtrl.pass="";     
	            })
	            .error(function (err){
	                sysThermCtrl.loadThermSystems();
	            });
		};

		//FUNCTION TO EDIT SYSTEMS
		sysThermCtrl.confirmAction=function (action,sysTherm){
			console.log(sysTherm);
			if (action==='remove'){
				$http.get("./models/remove_therm_system.php?id="+sysTherm.id)
		            .success(function (data){
		            	sysThermCtrl.loadThermSystems();
		            })
		            .error(function (err){
		                sysThermCtrl.loadThermSystems();
		            });
			}

			if (action==='edit'){
				var request="./models/edit_therm_system.php?id="+sysTherm.id+"&description="+sysTherm.description+"&url="+sysTherm.url+"&place="+sysTherm.place+"&user="+sysTherm.user+"&pass="+sysTherm.pass;
				console.log(request);
				$http.get(request)
		            .success(function (data){
		            	sysThermCtrl.loadThermSystems();
		            })
		            .error(function (err){
		                sysThermCtrl.loadThermSystems();
		            });
			}

			sysThermCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT SYSTEMS
		sysThermCtrl.cancel=function (){
	        sysThermCtrl.loadThermSystems();
	        sysThermCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT SYSTEMS
		sysThermCtrl.startAction=function (action){
	        sysThermCtrl.action=action;
			return false;
		};
       
    });
})();	