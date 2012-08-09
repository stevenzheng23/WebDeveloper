<?php
$data_json = json_decode($_POST["json"], true);

//make validation array
$validation_array = array("username" => "", "email" => "");

$username = $data_json["username"];
$email = $data_json["email"];

$sql1 = "SELECT * FROM user WHERE username = '$username'";
$sql2 = "SELECT * FROM user WHERE email = '$email'";

$conn = mysql_connect("localhost", "root", "");
if(!$conn) die('Could not connect to database: ' . mysql_error());
else
{
	mysql_select_db("user_db", $conn);
	if(strlen($username) != 0)
	{
		$res = mysql_query($sql1);
		if($res)
		{
			if($field = mysql_fetch_array($res)) $validation_array['username'] = '<font color=\'red\'>The username is used by other people</font>';
			else $validation_array['username'] = '<font color=\'green\'>The username is good</font>';
		}
		else die('Could not finish database operation: ' . mysql_error());
	}
	else $validation_array['username'] = '';
	if(strlen($email) != 0)
	{
		$res = mysql_query($sql2);
		if($res)
		{
			if($field = mysql_fetch_array($res)) $validation_array['email'] = '<font color=\'red\'>The email is associated with an existing account</font>';
			else $validation_array['email'] = '<font color=\'green\'>The email is good</font>';
		}
		else die('Could not finish database operation: ' . mysql_error());
	}
	else $validation_array['email'] = '';
}

//convert array to json
$validation_json = json_encode($validation_array);

echo $validation_json;
?>