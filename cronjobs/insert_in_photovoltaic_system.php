<?php
	//CREATE DATABASE CONNECTION
	$strconn="host=localhost port=5432 dbname=dbasistelectro user=postgres password=123456";
	$conn=pg_connect($strconn) or die ("<strong>Ha ocurrido un error en el acceso a la base de datos.</strong>");

	//GET LIST OF SYSTEMS
	$systemQuery = "SELECT * FROM sys_photovoltaic_config";
	$systemResults = pg_query($conn,$systemQuery) or die ("Query error with systems.".pg_last_error());
	$systemsNumber = pg_num_rows($systemResults);

	//DATE AND TIME OF TODAY
	$timestamp = strtotime('today');
	$start = $timestamp-86400;
	$end = $timestamp;
	
	echo "midnight:".$timestamp." start:".$start." end:".$end;

	//ITERATE ACROSS SYSTEMS
	while ($system = pg_fetch_row($systemResults)){
		$place=$system[2];
		$number=$system[3];
		$user=$system[4];
		$key=$system[5];

		//DO REQUEST FROM EMPHASE
		try {
			//GET DATE FROM REQUEST 622396 key=351796adc7e7e2106347c77c7da120be&user_id=4e4463794f444d300a
			$data = json_decode(file_get_contents("https://api.enphaseenergy.com/api/v2/systems/$number/stats?start_at=$start&end_at=$end&datetime_format=iso8601&key=$key&user_id=$user"), true);

			//GET VALUES FROM JSON OBJECT
			$date = "";
			$kw = 0.0;

			$tam = sizeof($data["intervals"]);
			$sum=0;

			for ($i = 0; $i < $tam; $i++) {

				//GET MINUTE AND VALUE
				$min = substr($data["intervals"][$i]["end_at"],14,-9);
				$value = $data["intervals"][$i]["enwh"];

				if ($min==00 or $min==15 or $min==30 or $min==45){
					//GET KWTTS
					$sum = $sum + $value;
					$kw = $sum/1000;
					
					//GET DATE
					$date = substr($data["intervals"][$i]["end_at"],0,-15)." ".substr($data["intervals"][$i]["end_at"],11,-6);

					//CREATE INSERT QUERY
					$query = "INSERT INTO sys_photovoltaic(place_id,date_time,kw_produced) VALUES ($place,'$date',$kw)";

					//EXECUTE INSERT QUERY
					$result = pg_query($conn,$query) or die ("Error durante la consulta.".pg_last_error());
					
					//RESET SUM		
					$sum = 0; 
				}else{
					$sum = $sum + $value;

					//IF FOR LAST INSERT
					if ($sum!=0 and $i==$tam-1){
						
						//GET KWTTS
						$kw = $sum/1000;

						//GET DATE
						$date = substr($data["intervals"][$i]["end_at"],0,-15)." ".substr($data["intervals"][$i]["end_at"],11,-6);

						//CREATE INSERT QUERY
						$query = "INSERT INTO sys_photovoltaic(place_id,date_time,kw_produced) VALUES ($place,'$date',$kw)";

						//EXECUTE INSERT QUERY
						$result = pg_query($conn,$query) or die ("Error durante la consulta.".pg_last_error());
					} 
				}
			}

			//EXIT MESSAGE
			//echo 'Data inserted successfully!';
			//echo 'Query: ' .$query;
		
		}catch(Exception $e) {
		 	//echo 'Message: ' .$query;
		}
	}
	
?>