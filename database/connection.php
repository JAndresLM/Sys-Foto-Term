<?php
	class Connection {
        function createConnection() {
            $host = "localhost";
            $port = "5432";
            $user = "postgres";
            $password = "123456";
            $dbname = "dbasistelectro";

            // Create connection
            $strconn="host='$host' port='$port' dbname='$dbasistelectro' user='$user' password='$password'";
			$conn=pg_connect($strconn) or die ("<h1>Error en el acceso a la base de datos.</h1>". pg_last_error());
            
            // Check connection
            if (!$conn) {
                return false;
            } 
            return $conn;
        }
    }
?>