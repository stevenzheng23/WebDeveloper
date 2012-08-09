<?php
$username = $_POST["username"];
$email = $_POST["email"];
$pass = $_POST["pass"];
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$sex = $_POST["sex"];
$bmonth = $_POST["bmonth"];
$bdate = $_POST["bdate"];
$byear = $_POST["byear"];

if(strlen($username) == 0 || strlen($email) == 0 || strlen($pass) == 0 || 
strlen($firstname) == 0 || strlen($lastname) == 0 || strlen($sex) == 0 || 
strlen($bmonth) == 0 || strlen($bdate) == 0 || strlen($byear) == 0) echo 'Invalid Sign Up: We need all your basic information';
else
{
	$sql = "INSERT INTO $username (info, type, category, privacy) VALUES (";
	$conn = mysql_connect("localhost", "root", "");
	if(!$conn) die('Could not connect to database: ' . mysql_error());
	else
	{
		mysql_select_db("user_db", $conn);
		$res = mysql_query("SELECT * FROM user WHERE username = '$username'");
		if($res)
		{
			if($field = mysql_fetch_array($res)) echo 'Invalid Sign Up: Username is unavailable';
			else
			{
				$res = mysql_query("SELECT * FROM user WHERE email = '$email'");
				if($res)
				{
					if($field = mysql_fetch_array($res))  echo 'Invalid Sign Up: Email is associated with other account';
					else
					{
						$res = mysql_query("SELECT id FROM user ORDER BY id DESC") or die('Could not finish database operation: ' . mysql_error());
						if($field = mysql_fetch_array($res))
						{
							$user_id = floatval($field[0]);
							$user_id++;
							$user_id = strval($user_id);
							mysql_query("INSERT INTO user (id, username, email, pass, type, level) VALUES ('$user_id', '$username', '$email', '$pass', 'individual', '1')");
							mysql_query("INSERT INTO special (email) VALUES ('$email')");
							mysql_select_db("profile_db", $conn);
							$res = mysql_query("SELECT * FROM $username");
							if(!$res)
							{
								mysql_query("CREATE TABLE $username (info TEXT, type TEXT, category TEXT, privacy TEXT)");
								mysql_query($sql."'$firstname $lastname', 'Name', 'Basic Info', 'friend')");
								mysql_query($sql."'$sex', 'Sex', 'Basic Info', 'friend')");
								mysql_query($sql."'$byear-$bmonth-$bdate', 'Birthday', 'Basic Info', 'friend')");
								echo 'Sign Up Completed';
							}
							else echo 'Invalid Sign Up: Username is unavailable';
						}
						else echo 'Sign Up Failed';
					}
				}
				else die('Could not finish database operation: ' . mysql_error());
			}
		}
		else die('Could not finish database operation: ' . mysql_error());
	}
	mysql_close($conn);
}
?>