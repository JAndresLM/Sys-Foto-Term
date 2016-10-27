<?php
	require("connection.php");

	$id=$_GET["id"];

	$query = "DELETE FROM places WHERE id_place=$id";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>