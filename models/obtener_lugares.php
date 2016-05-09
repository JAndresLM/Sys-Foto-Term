<?php
	require("conectar_base_de_datos.php");

	$query = "select nombre_lugar from lugares";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
	$rows = pg_num_rows($result);
	if ($rows > 0){
		$places = array();
		while ($row = pg_fetch_row($result)) {
		  	$places[] = array('nombre_lugar' => $row[0]);
		}
	}else{
	    $places[] = array();
	}
	echo json_encode($places);
?>