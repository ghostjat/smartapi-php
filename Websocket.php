<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Websocket 
{
    public static function SocketConnet($client_code, $feed_token,$task, $script)
	{
		//check if client-code, ffed token and task empty 
		if (empty($client_code) || empty($feed_token) || empty($task))
		 	 return "client_code or feed_token or task is missing";
		 	
		 //if valid task is passed then it will connect to websocket server 	
        if ($task === "mw" || $task === "sfi" || $task === "dp") {
			require ('includes/socket.php');
		}
		else{
			return "Invalid task provided";
		}
	}
}

?>
