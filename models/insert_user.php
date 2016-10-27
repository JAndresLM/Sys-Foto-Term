<?php
	require("connection.php");

	$name=$_GET["name"];
	$user=$_GET["user"];
	$pass=$_GET["pass"];


	$query = "INSERT INTO users(usern,passw,fullname) VALUES ('$user','$pass','$name')";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>