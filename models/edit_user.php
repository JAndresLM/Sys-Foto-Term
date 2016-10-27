<?php
	require("connection.php");

	$id=$_GET["id"];
	$name=$_GET["name"];
	$user=$_GET["user"];
	$pass=$_GET["pass"];


	$query = "UPDATE users SET usern = '$user', passw = '$pass', fullname = '$name' WHERE id_user=$id";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>