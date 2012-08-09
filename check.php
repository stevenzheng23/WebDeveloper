<?php
session_start();

function check_authentication(){
	if(isset($_SESSION['authenticated']))
	{
		if($_SESSION['authenticated'] != "yes")
		{
			session_unset(); 
			session_destroy();
			header("Location:process.php");
		}
	}
	else
	{
		session_unset(); 
		session_destroy();
		header("Location:process.php");
	}
}
?>