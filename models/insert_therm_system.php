<?php
	require("connection.php");

	$description=$_GET["description"];
	$url=$_GET["url"];
	$place=$_GET["place"];
	$user=$_GET["user"];
	$pass=$_GET["pass"];

	$query = "INSERT INTO sys_thermal_config(sys_description, place_id, sys_url, sys_user, sys_pass)
			VALUES ('$description',$place,'$url','$user','$pass')";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>