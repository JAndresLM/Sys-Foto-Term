<?php
	require("connection.php");

	$id=$_GET["id"];
	$place=$_GET["place"];


	$query = "UPDATE places SET place = '$place' WHERE id_place=$id";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>