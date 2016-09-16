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
		day=Number(date.substr(0,1))-3;
		dateString=String(date);
		return day+dateString.substring(2);
	} else if(period === "Mes"){
		//document.getElementById("calendar").type="month";
	} else if(period === "Año"){
		//document.getElementById("calendar").type="month";
	}
};

//FUNCTION TO GET THE END DATE
function getEndDate(period,date){
	alert("Fecha Get End Days"+date);
	if(period === "Día"){
		return date+" 23:59:59";
	} else if(period === "Semana"){
		//newDate=addDays(new Date(date),3);
		newDate=addDays(date,3);
		alert("New Date"+date);
		//day=Number(date.substr(0,1))+3;
		dateString=String(newDate);
		return dateString.substring(0,10)+" 23:59:59";
	} else if(period === "Mes"){
		//document.getElementById("calendar").type="month";
	} else if(period === "Año"){
		//document.getElementById("calendar").type="month";
	}
};

function getDayOfMonth(){

};

function addDays(theDate, days) {
	alert("Fecha Add Days:"+theDate);
    return (theDate.getTime() + days*24*60*60*1000);
}

var newDate = addDays(new Date(), 5);

//FUNCTION TO GET THE COLUMN
function getColumn(column){
	if (column === "kwp"){
		return "kw_produced";
	}else if (column === "kwc"){
		return "kw_consumed";
	}else if (column === "kwd"){
		return "kw_radiation";
	}else if (column === "ts1"){
		return "sensor1";
	}else if (column === "ts2"){
		return "sensor2";
	}else if (column === "ts3"){
		return "sensor3";
	}
};

//FUNTION TO GET WHAT FILE PHP USE
function getFilePHP(system,period){
	if (system==="Fotovoltaico"){
		if(period === "Día"){
			return "get_day_values_photo";
		} else if(period === "Semana"){
			return "get_week_values_photo";
		} else if(period === "Mes"){
			return "get_month_values_photo";
		} else if(period === "Año"){
			return "get_year_values_photo";
		}
	}else if (system === "Termico"){
		if(period === "Día"){
			return "get_day_values_term";
		} else if(period === "Semana"){
			return "get_week_values_term";
		} else if(period === "Mes"){
			return "get_month_values_term";
		} else if(period === "Año"){
			return "get_year_values_term";
		}
	}
};