(function(){
    var app=angular.module("AppSysFotoTerm");

    app.controller("UsersController",function($http){
        var usersCtrl=this;

        usersCtrl.action="";

		//FUNCTION TO LOAD USERS
		usersCtrl.loadUsers=function (){
			$http.get("./models/get_users.php?")
	            .success(function (data){
	                usersCtrl.users=data;     
	            })
	            .error(function (err){
	                usersCtrl.users=[];
	            });
		};
		usersCtrl.loadUsers();

		//FUNCTION TO INSERT PLACE
		usersCtrl.insertUser=function (){
			$http.get("./models/insert_user.php?name="+usersCtrl.name+"&user="+usersCtrl.username+"&pass="+usersCtrl.password)
	            .success(function (data){
	                usersCtrl.loadUsers();
	                usersCtrl.name="";
	                usersCtrl.username=""; 
	                usersCtrl.password="";   
	            })
	            .error(function (err){
	            	usersCtrl.loadUsers();
	            });
		};

		//FUNCTION TO EDIT PLACE
		usersCtrl.confirmAction=function (action,user){

			if (action==='remove'){
				$http.get("./models/remove_user.php?id="+user.id)
		            .success(function (data){
		            	usersCtrl.loadUsers();
		            })
		            .error(function (err){
		                usersCtrl.loadUsers();
		            });
			}

			if (action==='edit'){
				$http.get("./models/edit_user.php?id="+user.id+"&name="+user.name+"&user="+user.username+"&pass="+user.password)
		            .success(function (data){
		            	usersCtrl.loadUsers();
		            })
		            .error(function (err){
		                usersCtrl.loadUsers();
		            });
			}

			usersCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT users
		usersCtrl.cancel=function (){
	        usersCtrl.loadUsers();
	        usersCtrl.action="";
			return true;
		};

		//FUNCTION TO EDIT users
		usersCtrl.startAction=function (action){
	        usersCtrl.action=action;
			return false;
		};
       
    });
})();	