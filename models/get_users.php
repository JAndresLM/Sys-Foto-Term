<?php
	require("connection.php");

	$query = "select * from users";
	$result = pg_query($conn,$query) or die ("<strong>Error durante la consulta.</strong>" . pg_last_error());
	$rows = pg_num_rows($result);
	if ($rows > 0){
		$users = array();
		while ($row = pg_fetch_row($result)) {
			if ($row[1]!="admin"){
				$users[] = array(
			  		'id' => $row[0],
			  		'username' => $row[1],
			  		'password' => $row[2],
			  		'name' => $row[3],
			  		'disabled' => true,
			  	);
			}
		}
	}else{
	    $users[] = array();
	}
	echo json_encode($users);
?>