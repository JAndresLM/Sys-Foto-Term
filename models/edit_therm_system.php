<?php
	require("connection.php");

	$id=$_GET["id"];
	$description=$_GET["description"];
	$url=$_GET["url"];
	$place=$_GET["place"];
	$user=$_GET["user"];
	$pass=$_GET["pass"];

	$query = "UPDATE sys_thermal_config SET
		sys_description='$description',
		place_id =$place,
		sys_url ='$url',
		sys_user ='$user',
		sys_pass ='$pass'
		WHERE id_sys_term_config=$id";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>