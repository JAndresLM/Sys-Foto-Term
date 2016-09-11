function changeComboBoxValues(system){
	var s1 = document.getElementById("slct_system");
	var s2 = document.getElementById("slct_data");
	s2.innerHTML = "";
	if(system === "Fotovoltaico"){
		var optionArray = ["|","kwp|Kw Producidos","kwc|Kw Consumidos","kwd|Diferencia"];
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