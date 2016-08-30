<?php
	require("connection.php");

	$day=$_GET["txtDay"];
	$day2=$_GET["txtDay2"];
	$place=$_GET["txtPlace"];
	$element=$_GET["txtElement"];
	$system=$_GET["txtSystem"];

	$query = "select to_char(date_time, 'HH:MI'),$element from $system where place_id=$place and date_time between $day and $day2";
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