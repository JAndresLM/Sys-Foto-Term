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

//FUNCTION TO GET THE START DATE
function getStartDate(period,date){
	if(period === "Día"){
		return date+" 00:00:01";
	} else if(period === "Semana"){
		//document.getElementById("calendar").type="week";
	} else if(period === "Mes"){
		//document.getElementById("calendar").type="month";
	} else if(period === "Año"){
		//document.getElementById("calendar").type="month";
	}
};

//FUNCTION TO GET THE END DATE
function getEndDate(period,date){
	if(period === "Día"){
		return date+" 23:59:59";
	} else if(period === "Semana"){
		//document.getElementById("calendar").type="week";
	} else if(period === "Mes"){
		//document.getElementById("calendar").type="month";
	} else if(period === "Año"){
		//document.getElementById("calendar").type="month";
	}
};

//FUNCTION TO GET THE COLUMN
function getColumn(column){
	if (column === "kwp"){
		return "kw_produced";
	}
};