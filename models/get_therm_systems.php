<?php
	require("connection.php");

	$query = "select * from sys_thermal_config";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
	$rows = pg_num_rows($result);
	if ($rows > 0){
		$systems = array();
		while ($row = pg_fetch_row($result)) {
		  	$systems[] = array(
		  		'id' => $row[0],
		  		'description' => $row[1],
		  		'place' => $row[2],
		  		'url' => $row[3],
		  		'user' => $row[4],
		  		'pass' => $row[5],
		  		'disabled' => true,
		  	);
		}
	}else{
	    $systems = array();
	}
	echo json_encode($systems);
?>