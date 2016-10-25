<?php
	require("connection.php");

	$id=$_GET["id"];

	$query = "DELETE FROM sys_thermal_config WHERE id_sys_term_config=$id";

	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
?>