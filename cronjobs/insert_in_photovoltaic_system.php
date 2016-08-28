<?php
	$today = time()-86400;
	$end = $today+50400;
	$data = json_decode(file_get_contents("https://api.enphaseenergy.com/api/v2/systems/622396/stats?start_at=$today&end_at=$end&datetime_format=iso8601&key=351796adc7e7e2106347c77c7da120be&user_id=4e4463794f444d300a"), true);

	$place = 2;
	$strconn="host=localhost port=5432 dbname=dbasistelectro user=postgres password=123456";
	$conn=pg_connect($strconn) or die ("<strong>Ha ocurrido un error en el acceso a la base de datos.</strong>");
	$date = "";
	$kw = 0.0;

	$tam = sizeof($data["intervals"]);
	$sum=0;	
	for ($i = 0; $i < $tam; $i++) {
		$min = substr($data["intervals"][$i]["end_at"],14,-9);
		$value = $data["intervals"][$i]["enwh"];
		if ($min==00 or $min==15 or $min==30 or $min==45){
			$sum = $sum + $value;
			$kw = $sum/1000;
			//Insert
			$date = substr($data["intervals"][$i]["end_at"],0,-15)." ".substr($data["intervals"][$i]["end_at"],11,-6);
			$query = "insert into sys_photovoltaic(place_id,date_time,kw_produced) values ($place,'$date',$kw)";
			$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>".pg_last_error());
			//Reset sum			
			$sum = 0; 
		}else{
			$sum = $sum + $value;
			if ($sum!=0 and $i==$tam-1){
				//last insert
				$kw = $sum/1000;
				$date = substr($data["intervals"][$i]["end_at"],0,-15)." ".substr($data["intervals"][$i]["end_at"],11,-6);
				$query = "insert into sys_photovoltaic(place_id,date_time,kw_produced) values ($place,'$date',$kw)";
				$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>".pg_last_error());
			} 
		}
	}
?>