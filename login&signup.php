<!-- login&signup.php -->
<?php
	session_start();
	session_unset();
	srand();
	$security = "";
	for ($i = 0; $i < 80; $i++) {
		$security .= dechex(rand(0, 15));
	}
	$_SESSION['security'] = $security;
?>
<html>
<header>
	<title>Welcome to iNetwork - Log In, Sign Up and Get to Know Us</title>
	<style href="">
		a {text-decoration: none}
	</style>
	<link rel="stylesheet" type="text/css" href="login&signup.css"></link>
	<script type="text/javascript" src="login&signup.js"></script>
	<script type="text/javascript" src="md5.js"></script>
	<script>
		function login_doit(){
			var loginform = document.getElementById('login_form');
			var submitform = document.getElementById('hidden_login_form');
			
			if(loginform.uoe.value.length != 0 && loginform.pass.value.length != 0)
			{
				if(loginform.rememberme.checked == true) submitform.rememberme.value = true;
				else submitform.rememberme.value = false;
				submitform.uoe.value = loginform.uoe.value;
				submitform.pass.value = hex_md5(loginform.pass.value + '<?php echo $security;?>');
				submitform.submit();
			}
			else
			{
				if(loginform.uoe.value.length == 0)
				{
					alert('username or email cannot be empty!');
					loginform.uoe.focus();
					return false;
				}
				else if(loginform.pass.value.length == 0)
				{
					alert('password cannot be empty!');
					loginform.pass.focus();
					return false;
				}
			}
		}
	</script>
</header>
<body>
	<div id='extend_headerbar' class='extend_headerbar'></div>
	<div id='container' class='container'>
			<div id='headerbar' class='headerbar'>
				<a href=''><img class='logoimg' src='logo.png'></img></a>
			</div>
			<div id='login' class='login'>
				<form method='POST' action='#' id='login_form' class='login_form'>
					<font>Username or E-mail</font><br/>
					<input type='text' name='uoe'></input><br></br>
					<font>Password</font><br/>
					<input type='password' name='pass'></input><br></br>
					<input type="checkbox" name='rememberme'></input><font>Remember me</font><br />
					<a href='default.html'><font color='blue'>Forgot your password?</font></a><br></br>
					<input type='button' name='login' value='Log In'></input>
				</form>
				<form method='POST' action='login.php' id='hidden_login_form'>
					<input type='hidden' name='uoe'></input>
					<input type='hidden' name='pass'></input>
					<input type='hidden' name='rememberme'></input>
				</form>
			</div>
			<div id='content' class='content'>
			</div>
			<div id='signup' class='signup'>
				<form id='signup_form' class='signup_form'>
					<div id='username_caption' class='caption'><font>Username: </font></div><div id='username_text' class='text'><input type='text' name='username' size=30 autocomplete='off'></input></div><div id='username_alert' class='alert'></div><br/>
					<div id='email_caption' class='caption'><font>E-mail: </font></div><div id='email_text' class='text'><input type='text' name='email' size=30 autocomplete='off'></input></div><div id='email_alert' class='alert'></div><br/>
					<div id='pass_caption' class='caption'><font>Password: </font></div><div id='pass_text' class='text'><input type='password' name='pass' size=30 autocomplete='off'></input></div><div id='pass_alert' class='alert'></div><br/>
					<div id='firstname_caption' class='caption'><font>First Name: </font></div><div id='firstname_text' class='text'><input type='text' name='firstname' size=30 autocomplete='off'></input></div><div id='firstname_alert' class='alert'></div><br/>
					<div id='lastname_caption' class='caption'><font>Last Name: </font></div><div id='lastname_text' class='text'><input type='text' name='lastname' size=30 autocomplete='off'></input></div><div id='lastname_alert' class='alert'></div><br/>
					<div id='sex_caption' class='caption'><font>Sex: </font></div><div id='sex_text' class='text'>
					<select id='sex' name='sex'>
						<option value='Select Sex:'selected='selected'>Select Sex:</option>
						<option value='Female'>Female</option>
						<option value='Male'>Male</option>
					</select></div><div id='sex_alert' class='alert'></div><br/>
					<div id='birthday_caption' class='caption'><font>Birthday: </font></div><div id='birthday_text' class='text'>
					<select id='bmonth' name='bmonth' onchange='edit_date_month_year(this, this.form.bdate, this.form.byear);'>
						<option value="0" selected="selected">Month:</option> 
						<option value="1">Jan</option> 
						<option value="2">Feb</option> 
						<option value="3">Mar</option> 
						<option value="4">Apr</option> 
						<option value="5">May</option> 
						<option value="6">Jun</option> 
						<option value="7">Jul</option> 
						<option value="8">Aug</option> 
						<option value="9">Sep</option> 
						<option value="10">Oct</option> 
						<option value="11">Nov</option> 
						<option value="12">Dec</option>
					</select>
					<select id='bdate' name='bdate'>
						<option value="0" selected="selected">Date:</option>
						<option value="1">1</option> 
						<option value="2">2</option> 
						<option value="3">3</option> 
						<option value="4">4</option> 
						<option value="5">5</option> 
						<option value="6">6</option> 
						<option value="7">7</option> 
						<option value="8">8</option> 
						<option value="9">9</option> 
						<option value="10">10</option> 
						<option value="11">11</option> 
						<option value="12">12</option> 
						<option value="13">13</option> 
						<option value="14">14</option> 
						<option value="15">15</option> 
						<option value="16">16</option> 
						<option value="17">17</option> 
						<option value="18">18</option> 
						<option value="19">19</option> 
						<option value="20">20</option> 
						<option value="21">21</option> 
						<option value="22">22</option> 
						<option value="23">23</option> 
						<option value="24">24</option> 
						<option value="25">25</option> 
						<option value="26">26</option> 
						<option value="27">27</option> 
						<option value="28">28</option> 
						<option value="29">29</option> 
						<option value="30">30</option> 
						<option value="31">31</option>
					</select>
					<select id='byear' name='byear' onchange='edit_date_month_year(this.form.bmonth, this.form.bdate, this);'>
						<option value="0" selected="selected">Year:</option>
						<option value="2011">2011</option>
						<option value="2010">2010</option> 
						<option value="2009">2009</option> 
						<option value="2008">2008</option> 
						<option value="2007">2007</option> 
						<option value="2006">2006</option> 
						<option value="2005">2005</option> 
						<option value="2004">2004</option> 
						<option value="2003">2003</option> 
						<option value="2002">2002</option> 
						<option value="2001">2001</option> 
						<option value="2000">2000</option> 
						<option value="1999">1999</option> 
						<option value="1998">1998</option> 
						<option value="1997">1997</option> 
						<option value="1996">1996</option> 
						<option value="1995">1995</option> 
						<option value="1994">1994</option> 
						<option value="1993">1993</option> 
						<option value="1992">1992</option> 
						<option value="1991">1991</option> 
						<option value="1990">1990</option> 
						<option value="1989">1989</option> 
						<option value="1988">1988</option> 
						<option value="1987">1987</option> 
						<option value="1986">1986</option> 
						<option value="1985">1985</option> 
						<option value="1984">1984</option> 
						<option value="1983">1983</option> 
						<option value="1982">1982</option> 
						<option value="1981">1981</option> 
						<option value="1980">1980</option> 
						<option value="1979">1979</option> 
						<option value="1978">1978</option> 
						<option value="1977">1977</option> 
						<option value="1976">1976</option> 
						<option value="1975">1975</option> 
						<option value="1974">1974</option> 
						<option value="1973">1973</option> 
						<option value="1972">1972</option> 
						<option value="1971">1971</option> 
						<option value="1970">1970</option> 
						<option value="1969">1969</option> 
						<option value="1968">1968</option> 
						<option value="1967">1967</option> 
						<option value="1966">1966</option> 
						<option value="1965">1965</option> 
						<option value="1964">1964</option> 
						<option value="1963">1963</option> 
						<option value="1962">1962</option> 
						<option value="1961">1961</option> 
						<option value="1960">1960</option> 
						<option value="1959">1959</option> 
						<option value="1958">1958</option> 
						<option value="1957">1957</option> 
						<option value="1956">1956</option> 
						<option value="1955">1955</option> 
						<option value="1954">1954</option> 
						<option value="1953">1953</option> 
						<option value="1952">1952</option> 
						<option value="1951">1951</option> 
						<option value="1950">1950</option> 
						<option value="1949">1949</option> 
						<option value="1948">1948</option> 
						<option value="1947">1947</option> 
						<option value="1946">1946</option> 
						<option value="1945">1945</option> 
						<option value="1944">1944</option> 
						<option value="1943">1943</option> 
						<option value="1942">1942</option> 
						<option value="1941">1941</option> 
						<option value="1940">1940</option> 
						<option value="1939">1939</option> 
						<option value="1938">1938</option> 
						<option value="1937">1937</option> 
						<option value="1936">1936</option> 
						<option value="1935">1935</option>
						<option value="1934">1934</option>
 						<option value="1933">1933</option> 
						<option value="1932">1932</option> 
						<option value="1931">1931</option> 
						<option value="1930">1930</option> 
						<option value="1929">1929</option> 
						<option value="1928">1928</option> 
						<option value="1927">1927</option> 
						<option value="1926">1926</option> 
						<option value="1925">1925</option> 
						<option value="1924">1924</option> 
						<option value="1923">1923</option> 
						<option value="1922">1922</option> 
						<option value="1921">1921</option> 
						<option value="1920">1920</option> 
						<option value="1919">1919</option> 
						<option value="1918">1918</option> 
						<option value="1917">1917</option> 
						<option value="1916">1916</option> 
						<option value="1915">1915</option> 
						<option value="1914">1914</option> 
						<option value="1913">1913</option> 
						<option value="1912">1912</option> 
						<option value="1911">1911</option> 
						<option value="1910">1910</option> 
						<option value="1909">1909</option> 
						<option value="1908">1908</option> 
						<option value="1907">1907</option> 
						<option value="1906">1906</option> 
						<option value="1905">1905</option>
						<option value="1904">1904</option>
						<option value="1903">1903</option>
						<option value="1902">1902</option>
						<option value="1901">1901</option>
						<option value="1900">1900</option>
					</select></div><div id='birthday_alert' class='alert'></div><br/>
					<div id='button_caption' class='caption'></div><div id='button_text' class='text'><input type='button' name='signup' value='Sign Up'></input></div><div id='button_alert' class='alert'></div><br/>
					<div id='warning' class='warning'></div>
				</form>
			</div>
			<div id='footbar' class='footbar'>@Mingzhi Zheng</div>
		</div>
<noscript>
</body>
</html>