<?php
	require("connection.php");

	$id=$_GET["id"];

	$query = "DELETE FROM sys_photovoltaic_config WHERE id_sys_foto_config=$id";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>