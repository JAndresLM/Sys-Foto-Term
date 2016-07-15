<?php
	require("connection.php");
	$username=$_GET["txtUsername"];
	$password=$_GET["txtPassword"];
	$query = "Select fullname from users where usern='$username' and passw='$password'";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
	$rows = pg_num_rows($result);
	if ($rows > 0){
		$JSON = array();
		if ($row=pg_fetch_row($result))
		{
			$JSON[] = array('access' =>'accepted', 'uName' => $row[0]);
		}
	}else{
	    $JSON[] = array('access' =>'denied', 'uName' => 'desconocido');
	}
	echo json_encode($JSON);
?>


<?php
	/*require('../database/connection.php');

	function login($conn) {
		$JSON = array();
		
		// Gets the e-mail and password received from the login factory.
		$user = $_GET['txtUsername'];
		$pass = $_GET['txtPassword'];

		$query = "SELECT nombre_usuario FROM usuarios WHERE usern='$user' and passw='$pass'";
		$result = pg_query($conn,$query) or die ("<h1>Error durante la consulta.</h1>". pg_last_error());
		$rows = pg_num_rows($result);

		if ($rows > 0){
			$JSON = array();
			if ($row=pg_fetch_row($result)){
				$JSON[] = array(
					'access' =>'concedido',
					'uNombre' => $row[0]
				);
			}
		}else{
			$JSON[] = array(
				'access' =>'noconcedido',
				'uNombre' => 'desconocido'
			);
		}

		echo json_encode($JSON);
	}

	// Try to make the connection with the database.
	$connection = new Connection();
	$conn = $connection->createConnection();

	if($conn) {
		login($conn);
	}
	else {
		echo false;
	}*/
?>