<?php
session_start();
session_unset();

$_SESSION['authenticated'] = 'no';

$validation = '';

function validation($s, $p, $f){
	return md5($f . $s) == $p;
}

if(isset($_COOKIE['iNetwork']))
{
	$uoe = $_COOKIE['iNetwork']['uoe'];
	$pass = $_COOKIE['iNetwork']['pass'];
	$security = $_COOKIE['iNetwork']['security'];
	
	$sql1 = "SELECT pass FROM user WHERE username = '" . $uoe . "'";
	$sql2 = "SELECT pass FROM user WHERE email = '" . $uoe . "'";
	
	if(strlen($uoe) == 0 || strlen($pass) == 0) $validation = 'Invalid Combination of Username/E-mail and Password';
	else
	{	
		$conn = mysql_connect("localhost", "root", "");
		if(!$conn) die('Could not connect to database: ' . mysql_error());
		else
		{
			mysql_select_db("user_db", $conn);
			$res1 = mysql_query($sql1);
			if($res1)
			{
				if($field1 = mysql_fetch_array($res1))
				{
					if($pass == md5($field1[0] . $security)) $validation = 'Log In Completed';
					else  $validation = 'Invalid Combination of Username/E-mail and Password';
				}
				else
				{
					$res2 = mysql_query($sql2);
					if($res2)
					{
						if($field2 = mysql_fetch_array($res2))
						{
							if($pass == md5($field2[0] . $security)) $validation = 'Log In Completed';
							else  $validation = 'Invalid Combination of Username/E-mail and Password';
						}
						else  $validation = 'Invalid Combination of Username/E-mail and Password';
					}
					else die('Could not finish database operation: ' . mysql_error());
				}
			}
			else die('Could not finish database operation: ' . mysql_error());
		}
		mysql_close($conn);
	}
}
else $validation = 'Log In Failed';

if(isset($_SESSION['authenticated']))
{
	if($validation == 'Log In Completed')
	{
		$_SESSION['authenticated'] = 'yes';
		$_SESSION['uoe'] = $uoe;
		header("Location:home.php");
	}
	else
	{
		session_unset(); 
		session_destroy();
		header("Location:login&signup.php");
	}
}
else
{
	session_unset(); 
	session_destroy();
	header("Location:login&signup.php");
}

//exit();
?>