<?php
	require("connection.php");

	$id=$_GET["id"];
	$description=$_GET["description"];
	$number=$_GET["number"];
	$place=$_GET["place"];
	$user=$_GET["user"];
	$key=$_GET["key"];

	$query = "UPDATE sys_photovoltaic_config SET
		sys_description='$description',
		place_id =$place,
		sys_number =$number,
		sys_user ='$user',
		sys_key ='$key'
		WHERE id_sys_foto_config=$id";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>