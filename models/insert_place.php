<?php
	require("connection.php");

	$place=$_GET["place"];

	$query = "INSERT INTO places(place) VALUES ('$place')";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>