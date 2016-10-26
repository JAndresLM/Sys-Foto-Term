<?php
	//CREATE DATABASE CONNECTION
	$strconn="host=localhost port=5432 dbname=dbasistelectro user=postgres password=123456";
	$conn=pg_connect($strconn) or die ("<strong>Ha ocurrido un error en el acceso a la base de datos.</strong>");

	//GET LIST OF SYSTEMS
	$systemQuery = "SELECT * FROM sys_thermal_config";
	$systemResults = pg_query($conn,$systemQuery) or die ("Query error with systems.".pg_last_error());
	$systemsNumber = pg_num_rows($systemResults);

	//ITERATE ACROSS SYSTEMS
	while ($system = pg_fetch_row($systemResults)){
		$place=$system[2];
		$url=$system[3];
		$user=$system[4];
		$pass=$system[5];

		//DO REQUEST FROM DATALOGUER
		try {
			//GET DATE FROM REQUEST http://172.24.18.15 admin admin
			$data = json_decode(file_get_contents("$url/dlx/download/live?sessionAuthUsername=$user&sessionAuthPassword=$pass&outputType=json&source=current"), true);

			//GET VALUES FROM JSON OBJECT
			$date = date("Y-m-d H:i:s",($data["headersets"][0]["timestamp"])-3600);
			$s1 = $data["headersets"][0]["packets"][0]["field_values"][0]["value"];
			$s2 = $data["headersets"][0]["packets"][0]["field_values"][1]["value"];
			$s3 = $data["headersets"][0]["packets"][0]["field_values"][2]["value"];

			//CREATE INSERT QUERY
			$query = "INSERT INTO sys_thermal(place_id,date_time,sensor1,sensor2,sensor3) 
					VALUES ($place,'$date',$s1,$s2,$s3)";

			//EXECUTE INSERT QUERY
			$result = pg_query($conn,$query) or die ("Error durante la consulta:".pg_last_error());

			//EXIT MESSAGE
			//echo 'Date inserted successfully! \n';
			//echo 'Query: ' .$query;
		
		}catch(Exception $e) {
		 	//echo 'Message: ' .$query;
		}
	}
?>