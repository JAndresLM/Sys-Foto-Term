(function(){
    var app=angular.module("AppSysFotoTerm");

    app.controller("PlacesController",function($http){
        var placesCtrl=this;

        placesCtrl.action="";

		//FUNCTION TO LOAD PLACES
		placesCtrl.loadPlaces=function (){
			$http.get("./models/get_places.php?")
	            .success(function (data){
	                placesCtrl.places=data;     
	            })
	            .error(function (err){
	                placesCtrl.places=[];
	            });
		};
		placesCtrl.loadPlaces();

		//FUNCTION TO INSERT PLACE
		placesCtrl.insertPlace=function (){
			$http.get("./models/insert_place.php?place="+placesCtrl.place)
	            .success(function (data){
	                placesCtrl.loadPlaces();
	                placesCtrl.place="";   
	            })
	            .error(function (err){

	            });
		};

		//FUNCTION TO EDIT PLACE
		placesCtrl.confirmAction=function (action,place){

			if (action==='remove'){
				$http.get("./models/remove_place.php?id="+place.id)
		            .success(function (data){
		            	placesCtrl.loadPlaces();
		            })
		            .error(function (err){
		                
		            });
			}

			if (action==='edit'){
				$http.get("./models/edit_place.php?id="+place.id+"&place="+place.place)
		            .success(function (data){
		            	placesCtrl.loadPlaces();
		            })
		            .error(function (err){
		                
		            });
			}

			placesCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT PLACES
		placesCtrl.cancel=function (){
	        placesCtrl.loadPlaces();
	        placesCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT PLACES
		placesCtrl.startAction=function (action){
	        placesCtrl.action=action;
			return false;
		};
       
    });
})();	