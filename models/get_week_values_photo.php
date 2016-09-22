<?php
	require("connection.php");

	$day=$_GET["txtDay"];
	$day2=$_GET["txtDay2"];
	$place=$_GET["txtPlace"];
	$element=$_GET["txtElement"];

	$query = "SELECT TO_CHAR(date(date_time),'day') \"fecha\", TRUNC(SUM ($element),2) \"suma\" 
		FROM (SELECT * FROM sys_photovoltaic  NATURAL JOIN places WHERE place_id=id_place) records 
		WHERE place=$place AND date_time BETWEEN $day  AND $day2 GROUP BY fecha ORDER BY fecha";

	//echo "HORROOOOOOR:".$query;
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());

	$rows = pg_num_rows($result);
	if ($rows > 0){
		$lines = array();
		$values = array();
		while ($row = pg_fetch_row($result)) {
		  	$lines[] = $row[0];
		  	$values[] = floatval($row[1]);
		}
	}else{
	    $lines[] = array();
	}
	$final = array("lines"=>$lines, "values"=>$values);
	echo json_encode($final);
?>