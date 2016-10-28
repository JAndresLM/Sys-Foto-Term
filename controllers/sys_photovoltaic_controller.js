(function(){
    var app=angular.module("AppSysFotoTerm");

    app.controller("SysPhotoController",function($http){
        var sysPhotoCtrl=this;

        sysPhotoCtrl.action="";
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
	                sysPhotoCtrl.description="";
	                sysPhotoCtrl.number="";
	                sysPhotoCtrl.place={};
	                sysPhotoCtrl.user="";
	                sysPhotoCtrl.key="";     
	            })
	            .error(function (err){
	                sysPhotoCtrl.loadPhotoSystems();
	            });
		};

		//FUNCTION TO EDIT SYSTEMS
		sysPhotoCtrl.confirmAction=function (action,sysPhoto){
			console.log(sysPhoto);
			if (action==='remove'){
				$http.get("./models/remove_photo_system.php?id="+sysPhoto.id)
		            .success(function (data){
		            	sysPhotoCtrl.loadPhotoSystems();
		            })
		            .error(function (err){
		                sysPhotoCtrl.loadPhotoSystems();
		            });
			}

			if (action==='edit'){
				var request="./models/edit_photo_system.php?id="+sysPhoto.id+"&description="+sysPhoto.description+"&number="+sysPhoto.number+"&place="+sysPhoto.place+"&user="+sysPhoto.user+"&key="+sysPhoto.key;
				$http.get(request)
		            .success(function (data){
		            	sysPhotoCtrl.loadPhotoSystems();
		            })
		            .error(function (err){
		                sysPhotoCtrl.loadPhotoSystems();
		            });
			}

			sysPhotoCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT SYSTEMS
		sysPhotoCtrl.cancel=function (){
	        sysPhotoCtrl.loadPhotoSystems();
	        sysPhotoCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT SYSTEMS
		sysPhotoCtrl.startAction=function (action){
	        sysPhotoCtrl.action=action;
			return false;
		};
       
    });
})();	