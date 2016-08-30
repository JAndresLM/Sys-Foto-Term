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