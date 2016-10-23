<?php
	require("connection.php");

	$description=$_GET["description"];
	$number=$_GET["number"];
	$place=$_GET["place"];
	$user=$_GET["user"];
	$key=$_GET["key"];

	$query = "INSERT INTO sys_photovoltaic_config(sys_description, place_id, sys_number, sys_user, sys_key)
			VALUES ('$description',$place,$number,'$user','$key')";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>