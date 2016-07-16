<?php
	/*$data = json_decode(file_get_contents("http://172.24.18.15/dlx/download/live?sessionAuthUsername=admin&sessionAuthPassword=admin&outputType=json&source=current"), true);*/
	$data = json_decode(file_get_contents("http://localhost/AsistElectro/cronjobs/live.txt"), true);

	$date = date("Y-m-d H:i:s",($data["headersets"][0]["timestamp"]));
	$s1 = $data["headersets"][0]["packets"][0]["field_values"][0]["value"];
	$s2 = $data["headersets"][0]["packets"][0]["field_values"][1]["value"];
	$s3 = $data["headersets"][0]["packets"][0]["field_values"][2]["value"];
	$place = 1;

	$strconn="host=localhost port=5432 dbname=dbasistelectro user=postgres password=123456";
	$conn=pg_connect($strconn) or die ("<strong>Ha ocurrido un error en el acceso a la base de datos.</strong>");

	$query = "insert into sys_thermal(place_id,date_time,sensor1,sensor2,sensor3) values ($place,'$date',$s1,$s2,$s3)";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>".pg_last_error());
?>