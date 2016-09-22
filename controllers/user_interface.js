//FUNCTION TO CHANGES VALUES ON COMBOBOX WHEN USER SELECTS OTHER SYSTEM
function changeComboBoxValues(system){
	var s1 = document.getElementById("slct_system");
	var s2 = document.getElementById("slct_data");
	s2.innerHTML = "";
	if(system === "Fotovoltaico"){
		var optionArray = ["|","kwp|Kw Producidos"];//,"kwc|Kw Consumidos","kwd|Diferencia"];
	} else if(system === "Termico"){
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

//FUNCTION TO SHOW GRAPHIC AND HIDE TABLE
function showGraphic(){
	var delay=0;
	setTimeout(function() {
		document.getElementById("cNoResults").style.display = "none";
	 	document.getElementById("loader").style.display = "none";
	 	document.getElementById("table").style.display = "none";
	 	if (info.chartDisplay==="bar"){
			document.getElementById("graphic").style.display = "block";
			document.getElementById("graphic2").style.display = "none";
	 	}else{
	 		document.getElementById("graphic").style.display = "none";
			document.getElementById("graphic2").style.display = "block";
	 	}
	}, delay);
	
};

//FUNCTION TO SHOW TABLE AND HIDE GRAPHIC
function showTable(){
	document.getElementById("cNoResults").style.display = "none";
	document.getElementById("graphic").style.display = "none";
	document.getElementById("graphic2").style.display = "none";
	document.getElementById("table").style.display = "block";
};

//FUNCTION TO SHOW NO RESULT AND HIDE GRAPHIC
function showNoResults(){
	document.getElementById("graphic").style.display = "none";
	document.getElementById("graphic2").style.display = "none";
	document.getElementById("table").style.display = "none";
	document.getElementById("cNoResults").style.display = "block";
};