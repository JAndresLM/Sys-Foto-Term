(function(){
    var app=angular.module("AppSysFotoTerm");

    app.controller("SysPhotoController",function($http){
        var sysPhotoCtrl=this;

        //FUNCTION TO LOAD SYSTEMS
		sysPhotoCtrl.loadPhotoSystems=function (){
			$http.get("./models/get_photo_systems.php?")
	            .success(function (data){
	                sysPhotoCtrl.photoSystems=data;      
	            })
	            .error(function (err){
	                sysPhotoCtrl.photoSystems=[];
	            });
		};
		sysPhotoCtrl.loadPhotoSystems();

		//FUNCTION TO LOAD PLACES
		sysPhotoCtrl.loadPlaces=function (){
			$http.get("./models/get_places.php?")
	            .success(function (data){
	                sysPhotoCtrl.places=data;      
	            })
	            .error(function (err){
	                sysPhotoCtrl.places=[];
	            });
		};
		sysPhotoCtrl.loadPlaces();

		//FUNCTION TO INSERT SYSTEMS
		sysPhotoCtrl.insertSystem=function (){
			var request="./models/insert_photo_system.php?description="+sysPhotoCtrl.description+"&number="+sysPhotoCtrl.number+"&place="+sysPhotoCtrl.place.id+"&user="+sysPhotoCtrl.user+"&key="+sysPhotoCtrl.key;
			console.log(request);
			$http.get(request)
	            .success(function (data){
	                sysPhotoCtrl.loadPhotoSystems();      
	            })
	            .error(function (err){
	                alert("Error");
	            });
		};

		//FUNCTION TO EDIT SYSTEMS
		sysPhotoCtrl.editSystem=function (sysPhoto){
			console.log(sysPhoto);

		};
       
    });
})();	