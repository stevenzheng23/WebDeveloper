<?php
$name = session_name();
$lifetime = '3600';
setcookie($name, $_COOKIE[$name], time() + $lifetime);
session_start();

$security = $_SESSION['security'];
$time = time();
$uoe = $_POST["uoe"];
$pass = $_POST["pass"];
$rememberme = $_POST["rememberme"];
$sql1 = "SELECT pass FROM user WHERE username = '" . $uoe . "'";
$sql2 = "SELECT pass FROM user WHERE email = '" . $uoe . "'";
$validation = '';

function validation($s, $p, $f){
	return md5($f . $s) == $p;
}

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
				if(validation($security, $pass, $field1[0])) $validation = 'Log In Completed';
				else  $validation = 'Invalid Combination of Username/E-mail and Password';
			}
			else
			{
				$res2 = mysql_query($sql2);
				if($res2)
				{
					if($field2 = mysql_fetch_array($res2))
					{
						if(validation($security, $pass, $field2[0])) $validation = 'Log In Completed';
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

if(isset($_SESSION['security']))
{
	if($validation == 'Log In Completed')
	{
		if($rememberme == 'true')
		{
			setcookie("iNetwork[uoe]", $uoe, $time+60*60*24*7);
			setcookie("iNetwork[pass]", $pass, $time+60*60*24*7);
			setcookie("iNetwork[security]", $security, $time+60*60*24*7);
		}
		else
		{
			setcookie("iNetwork[uoe]", "", 1);
			setcookie("iNetwork[pass]", "", 1);
			setcookie("iNetwork[security]", "", 1);
		}
		$_SESSION['authenticated'] = 'yes';
		$_SESSION['uoe'] = $uoe;
		unset($_SESSION['security']);
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

exit();
?>