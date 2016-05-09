<?php
	$strconn="host=localhost port=5432 dbname=dbasistelectro user=postgres password=12345";
	$conn=pg_connect($strconn) or die ("<strong>Ha ocurrido un error en el acceso a la base de datos.</strong>");
?>