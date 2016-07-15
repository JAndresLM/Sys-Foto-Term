<?php
	require("conectar_base_de_datos.php");

	$usuario=$_GET["txtUsername"];
	$password=$_GET["txtPassword"];

	$query = "Select nombre_usuario from usuarios where usern='$usuario' and passw='$password'";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
	$rows = pg_num_rows($result);
	if ($rows > 0){
		$user = array();
		if ($row=pg_fetch_row($result))
		{
			$user[] = array('access' =>'concedido', 'uNombre' => $row[0]);
		}
	}else{
	    $user[] = array('access' =>'denegado', 'uNombre' => 'desconocido');
	}
	echo json_encode($user);
?>