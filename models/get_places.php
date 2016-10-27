<?php
	require("connection.php");

	$query = "select * from places";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
	$rows = pg_num_rows($result);
	if ($rows > 0){
		$places = array();
		while ($row = pg_fetch_row($result)) {
		  	$places[] = array(
		  		'id' => $row[0],
		  		'place' => $row[1],
		  		'disabled' => true,
		  	);
		}
	}else{
	    $places[] = array();
	}
	echo json_encode($places);
?>