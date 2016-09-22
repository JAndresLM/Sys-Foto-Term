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

function getDatesForWeek(date,typeDate){
	if (typeDate==="start"){
		return new Date(addDays(date,-3));
	}else{
		return new Date(addDays(date,3));
	}
};

function getDatesForMonth(date,typeDate){
	if (typeDate==="start"){
		return date;
	}else{
		return new Date(date.getFullYear(), date.getMonth()+1, 0);
	}
};

function getDatesForYear(year,typeDate){
	if (typeDate==="start"){
		return "01-01-"+year;
	}else{
		return "31-12-"+year;
	}
};

function getStartDayWithTime(date){
	return date+" 00:00:01";
};

function getEndDayWithTime(date){
	return date+" 23:59:59";
};

function addDays(theDate, days) {
    return (theDate.getTime() + days*24*60*60*1000);
}

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