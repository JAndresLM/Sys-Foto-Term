<?php
	$usuario=$_GET["txtUsername"];
	$password=$_GET["txtPassword"];

	$strconn="host=localhost port=5432 dbname=asistencia user=postgres password=12345";
	$conn=pg_connect($strconn) or die ("<strong>Ha ocurrido un error en el acceso a la base de datos.</strong>");

	$query = "Select nombre from usuarios where usern='$usuario' and passw='$password'";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>");
	$rows = pg_num_rows($result);
	//echo "<script> alert('",$usuario,"');</script>";
	//echo "<script> alert('",$password,"');</script>";
	//echo "<script> alert('",$rows,"');</script>";
	if ($rows > 0){
		$user = array();
		if ($row=pg_fetch_row($result))
		{
			$user[] = array('acceso' =>'concedido', 'uNombre' => $row[0]);
		}
	}else{
	    $user[] = array('acceso' =>'denegado', 'uNombre' => 'desconocido');
	}
	echo json_encode($user);
?>