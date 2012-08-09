window.onload = initial;

var url1 = "signup.php";
var url2 = "username&email_validation.php";
var url;
var para;
var req = false;
var tmp_username = '';
var tmp_email = '';
var tmp_pass = '';
var exe1;
var exe2;
var exe3;
var username_noEmpty = false;
var username_isValidFormat = false;
var username_isAvailable = false;
var email_noEmpty = false;
var email_isValidFormat = false;
var email_isAvailable = false;
var pass_noEmpty = false;
var pass_lengthRestriction = false;
var pass_isValidFormat = false;
var firstname_noEmpty = false;
var lastname_noEmpty = false;
var sex_ifSelected = false;
var birthday_ifSelected = false;

var MENU_DATE = [];
MENU_DATE[0] = new Option("Date:", "0");
MENU_DATE[1] = new Option("1", "1");
MENU_DATE[2] = new Option("2", "2");
MENU_DATE[3] = new Option("3", "3");
MENU_DATE[4] = new Option("4", "4");
MENU_DATE[5] = new Option("5", "5");
MENU_DATE[6] = new Option("6", "6");
MENU_DATE[7] = new Option("7", "7");
MENU_DATE[8] = new Option("8", "8");
MENU_DATE[9] = new Option("9", "9");
MENU_DATE[10] = new Option("10", "10");
MENU_DATE[11] = new Option("11", "11");
MENU_DATE[12] = new Option("12", "12");
MENU_DATE[13] = new Option("13", "13");
MENU_DATE[14] = new Option("14", "14");
MENU_DATE[15] = new Option("15", "15");
MENU_DATE[16] = new Option("16", "16");
MENU_DATE[17] = new Option("17", "17");
MENU_DATE[18] = new Option("18", "18");
MENU_DATE[19] = new Option("19", "19");
MENU_DATE[20] = new Option("20", "20");
MENU_DATE[21] = new Option("21", "21");
MENU_DATE[22] = new Option("22", "22");
MENU_DATE[23] = new Option("23", "23");
MENU_DATE[24] = new Option("24", "24");
MENU_DATE[25] = new Option("25", "25");
MENU_DATE[26] = new Option("26", "26");
MENU_DATE[27] = new Option("27", "27");
MENU_DATE[28] = new Option("28", "28");
MENU_DATE[29] = new Option("29", "29");
MENU_DATE[30] = new Option("30", "30");
MENU_DATE[31] = new Option("31", "31");

function initial(){
	document.getElementById('login_form').login.onclick = login_doit;
	document.getElementById('login_form').uoe.onkeypress = login_ifenter;
	document.getElementById('login_form').pass.onkeypress = login_ifenter;
	document.getElementById('signup_form').signup.onclick = signup_doit;
	document.getElementById('signup_form').username.onfocus = username_tip;
	document.getElementById('signup_form').username.onkeyup = username_wait;
	document.getElementById('signup_form').username.onkeypress = signup_ifenter;
	document.getElementById('signup_form').email.onfocus = email_tip;
	document.getElementById('signup_form').email.onkeyup = email_wait;
	document.getElementById('signup_form').email.onkeypress = signup_ifenter;
	document.getElementById('signup_form').pass.onfocus = pass_tip;
	document.getElementById('signup_form').pass.onkeyup = pass_wait;
	document.getElementById('signup_form').pass.onkeypress = signup_ifenter;
	document.getElementById('signup_form').firstname.onfocus = firstname_tip;
	document.getElementById('signup_form').firstname.onchange = firstname_check;
	document.getElementById('signup_form').firstname.onkeypress = signup_ifenter;
	document.getElementById('signup_form').lastname.onfocus = lastname_tip;
	document.getElementById('signup_form').lastname.onchange = lastname_check;
	document.getElementById('signup_form').lastname.onkeypress = signup_ifenter;
}
function username_tip(){
	if(document.getElementById('signup_form').username.value.length == 0)
	{
		document.getElementById('username_alert').innerHTML = '<font color=\'grey\' size=1>Pick a username. If you have no ispiration now, you can refer to our suggestions, then change it later.</font>';
	}
}
function username_wait(event){
	var e;
	
	if(window.event) e = window.event.keyCode;
	else e = event.which;
	
	if(document.getElementById('signup_form').username.value != tmp_username)
	{
		tmp_username = document.getElementById('signup_form').username.value;
		if(e != 13)
		{
			document.getElementById('username_alert').innerHTML = '';
			if(exe1) clearTimeout(exe1);
			exe1 = setTimeout("username_check()", 1000);
		}
	}
}
function username_check(){
	var username = document.getElementById('signup_form').username;
	username_noEmpty = false;
	username_isValidFormat = false;
	username_isAvailable = false;
	//username validation
	//username empty check
	if(notEmpty(username, 'We need your username'))
	{
		username_noEmpty = true;
		document.getElementById('username_alert').innerHTML = '';
		//username format check
		if(isValidFormat(username, /^([A-Za-z0-9\_])+$/, 'Username should only contain alphanumerics and special character \'_\''))
		{
			username_isValidFormat = true;
			document.getElementById('username_alert').innerHTML = "<img src='ajax-loader3.gif' width=20 height=20 class='loading'></img><font color=\'grey\' size=2 class='loading'>Validating...</font>";
			//username availability check
			var JSONObject = new Object;
			JSONObject.username = document.getElementById('signup_form').username.value;
			JSONObject.email = '';
			var JSONString = JSON.stringify(JSONObject);
			doAjax(url2, 'json=' + JSONString);
		}
		else username_isValidFormat = false;
	}
	else username_noEmpty = false;
}
function email_tip(){
	if(document.getElementById('signup_form').email.value.length == 0)
	{
		document.getElementById('email_alert').innerHTML = '<font color=\'grey\' size=1>We need your e-mail address, it\'s important for us and your convenience!</font>';
	}
}
function email_wait(event){
	var e;
	
	if(window.event) e = window.event.keyCode;
	else e = event.which;
	
	if(document.getElementById('signup_form').email.value != tmp_email)
	{
		tmp_email = document.getElementById('signup_form').email.value;
		if(e != 13)
		{
			document.getElementById('email_alert').innerHTML = '';
			if(exe2) clearTimeout(exe2);
			exe2 = setTimeout("email_check()", 1000);
		}
	}
}
function email_check(){
	var email = document.getElementById('signup_form').email;
	email_noEmpty = false;
	email_isValidFormat = false;
	email_isAvailable = false;
	//email validation
	//email empty check
	if(notEmpty(email, 'We need your e-mail address'))
	{
		email_noEmpty = true;
		document.getElementById('email_alert').innerHTML = '';
		//email format check
		if(isValidFormat(email, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, 'It doesn\'t look like an e-mail address, please give us a valid address'))
		{
			email_isValidFormat = true;
			document.getElementById('email_alert').innerHTML = "<img src='ajax-loader3.gif' width=20 height=20 class='loading'></img><font color=\'grey\' size=2 class='loading'>Validating...</font>";
			//email availability check
			var JSONObject = new Object;
			JSONObject.username = '';
			JSONObject.email = document.getElementById('signup_form').email.value;
			var JSONString = JSON.stringify(JSONObject);
			doAjax(url2, 'json=' + JSONString);
		}
		else email_isValidFormat = false;
	}
	else email_noEmpty = false;
}
function pass_tip(){
	if(document.getElementById('signup_form').pass.value.length == 0)
	{
		document.getElementById('pass_alert').innerHTML = '<font color=\'grey\' size=1>Set a 4~18 characters password. Make it tricky! Tips: combine with numbers, letters and special characters.</font>';
	}
}
function pass_wait(event){
	var e;
	
	if(window.event) e = window.event.keyCode;
	else e = event.which;
	
	if(document.getElementById('signup_form').pass.value != tmp_pass)
	{
		tmp_pass = document.getElementById('signup_form').pass.value;
		if(e != 13)
		{
			document.getElementById('pass_alert').innerHTML = '';
			if(exe3) clearTimeout(exe3);
			exe3 = setTimeout("pass_check()", 1000);
		}
	}
}
function pass_check(){
	var pass = document.getElementById('signup_form').pass;
	pass_noEmpty = false;
	pass_lengthRestriction = false;
	pass_isValidFormat = false;
	//pass validation
	//pass empty check
	if(notEmpty(pass, 'You need a password to secure your account'))
	{
		pass_noEmpty = true;
		document.getElementById('pass_alert').innerHTML = '';
		if(lengthRestriction(pass, 4, 18, 'password'))
		{
			pass_lengthRestriction = true;
			document.getElementById('pass_alert').innerHTML = '';
			if(isValidFormat(pass, /^(\S)+$/, 'The password you give us should not contain whitespaces'))
			{
				pass_isValidFormat = true;
				document.getElementById('pass_alert').innerHTML = '<font color=\'green\'>Your password is okay</font>';
			}
			else pass_isValidFormat = false;
		}
		else pass_lengthRestriction = false;
	}
	else pass_noEmpty = false;
}
function firstname_tip(){
	if(document.getElementById('signup_form').firstname.value.length == 0)
	{
		document.getElementById('firstname_alert').innerHTML = '<font color=\'grey\' size=2>Please enter your first name here.</font>';
	}
}
function firstname_check(){
	var firstname = document.getElementById('signup_form').firstname;
	firstname_noEmpty = false;
	//firstname validation
	//firstname empty check
	if(notEmpty(firstname, 'We wanna know how to call you'))
	{	
		firstname_noEmpty = true;
		document.getElementById('firstname_alert').innerHTML = '<font color=\'green\' size=2>Your name looks good!</font>';
	}
	else firstname_noEmpty = false;
}
function lastname_tip(){
	if(document.getElementById('signup_form').lastname.value.length == 0)
	{
		document.getElementById('lastname_alert').innerHTML = '<font color=\'grey\' size=2>Please enter your last name here.</font>';
	}
}
function lastname_check(){
	var lastname = document.getElementById('signup_form').lastname;
	lastname_noEmpty = false;
	//lastname validation
	//lastname empty check
	if(notEmpty(lastname, 'Mr./Ms./Mrs.?'))
	{	
		lastname_noEmpty = true;
		document.getElementById('lastname_alert').innerHTML = '<font color=\'green\' size=2>Your name looks good!</font>';
	}
	else lastname_noEmpty = false;
}
function login_ifenter(event){
	var e;
	
	if(window.event) e = window.event.keyCode;
	else e = event.which;

	if(e == 13) document.getElementById('login_form').login.click();
}
function signup_doit(){
	var username = document.getElementById('signup_form').username;
	var email = document.getElementById('signup_form').email;
	var pass = document.getElementById('signup_form').pass;
	var firstname = document.getElementById('signup_form').firstname;
	var lastname = document.getElementById('signup_form').lastname;
	var sex = document.getElementById('signup_form').sex;
	var bmonth = document.getElementById('signup_form').bmonth;
	var bdate = document.getElementById('signup_form').bdate;
	var byear = document.getElementById('signup_form').byear;
	
	sex_ifSelected = false;
	birthday_ifSelected = false;
	//check unselected sex
	if(sex.value != 'Select Sex:')
	{
		sex_ifSelected = true;
		document.getElementById('sex_alert').innerHTML = '';
	}
	else
	{
		sex_ifSelected = false;
		document.getElementById('sex_alert').innerHTML = '<font color=\'red\' size=2>Please select sex</font>';
	}
	//check unselected birthday
	if(bmonth.value != 0 && bdate.value != 0 && byear.value != 0)
	{
		birthday_ifSelected = true;
		document.getElementById('birthday_alert').innerHTML = '';
	}
	else
	{
		birthday_ifSelected = false;
		document.getElementById('birthday_alert').innerHTML = '<font color=\'red\' size=2>We need you to tell us your birthday</font>';
	}
	//check wether all field filled or not
	if(username.value.length == 0)
	{
		username_noEmpty = false;
		document.getElementById('username_alert').innerHTML = '<font color=\'red\' size=2>We need your username</font>';
	}
	else username_noEmpty = true;
	if(email.value.length == 0)
	{
		email_noEmpty = false;
		document.getElementById('email_alert').innerHTML = '<font color=\'red\' size=2>We need your e-mail address</font>';
	}
	else email_noEmpty = true;
	if(pass.value.length == 0)
	{
		pass_noEmpty = false;
		document.getElementById('pass_alert').innerHTML = '<font color=\'red\' size=2>You need a password to secure your account</font>';
	}
	else pass_noEmpty = true;
	if(firstname.value.length == 0)
	{
		firstname_noEmpty = false;
		document.getElementById('firstname_alert').innerHTML = '<font color=\'red\' size=2>We wanna know how to call you</font>';
	}
	else firstname_noEmpty = true;
	if(lastname.value.length == 0)
	{
		lastname_noEmpty = false;
		document.getElementById('lastname_alert').innerHTML = '<font color=\'red\' size=2>Mr./Ms./Mrs.?</font>';
	}
	else lastname_noEmpty = true;
	
	/*alert('username_noEmpty: '+username_noEmpty);
	if(username_noEmpty)
	{
		alert('username_isValidFormat: '+username_isValidFormat);
		if(username_isValidFormat)
		{
			alert('username_isAvailable: '+username_isAvailable);
			if(username_isAvailable)
			{
				alert('email_noEmpty: '+email_noEmpty);
				if(email_noEmpty)
				{
					alert('email_isValidFormat: '+email_isValidFormat);
					if(email_isValidFormat)
					{
						alert('email_isAvailable: '+email_isAvailable);
						if(email_isAvailable)
						{
							alert('pass_noEmpty: '+pass_noEmpty);
							if(pass_noEmpty)
							{
								alert('pass_lengthRestriction: '+pass_lengthRestriction);
								if(pass_lengthRestriction)
								{
									alert('pass_isValidFormat: '+pass_isValidFormat);
									if(pass_isValidFormat)
									{
										alert('firstname_noEmpty: '+firstname_noEmpty);
										if(firstname_noEmpty)
										{
											alert('lastname_noEmpty: '+lastname_noEmpty);
											if(lastname_noEmpty)
											{
												alert('sex_ifSelected: '+sex_ifSelected);
												if(sex_ifSelected)
												{
													alert('birthday_ifSelected: '+birthday_ifSelected);
													if(birthday_ifSelected)
													{
														alert('ok');
														para = username.name + '=' + username.value + '&' + email.name + '=' + email.value + '&' + pass.name + '=' + pass.value + '&'
															 + firstname.name + '=' + firstname.value + '&' + lastname.name + '=' + lastname.value + '&' + sex.name + '=' + sex.value + '&'
															 + bmonth.name + '=' + bmonth.value + '&' + bdate.name + '=' + bdate.value + '&' + byear.name + '=' + byear.value;
														doAjax(url2, para);
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}*/
	
	if(username_noEmpty && username_isValidFormat && username_isAvailable && email_noEmpty && email_isValidFormat && email_isAvailable &&
	   pass_noEmpty && pass_lengthRestriction && pass_isValidFormat && firstname_noEmpty && lastname_noEmpty && sex_ifSelected && birthday_ifSelected)
	{
		para = username.name + '=' + username.value + '&' + email.name + '=' + email.value + '&' + pass.name + '=' + pass.value + '&'
			 + firstname.name + '=' + firstname.value + '&' + lastname.name + '=' + lastname.value + '&' + sex.name + '=' + sex.value + '&'
			 + bmonth.name + '=' + bmonth.value + '&' + bdate.name + '=' + bdate.value + '&' + byear.name + '=' + byear.value;
		doAjax(url1, para);
	}
}
function signup_ifenter(event){
	var e;
	
	if(window.event) e = window.event.keyCode;
	else e = event.which;
	
	if(e == 13) document.getElementById('signup_form').signup.click();
}
function edit_date_month_year(month, date, year){
	var mon = month[month.selectedIndex].value;
	var dt = date[date.selectedIndex].value;
	var yr = year[year.selectedIndex].value;
	var flag = 0;
	
	if(mon != 0 && yr != 0)
	{
		if(mon == 1 || mon == 3 || mon == 5 || mon == 7 || mon == 8 || mon == 10 || mon == 12) flag = 31;
		else if(mon == 4 || mon == 6 || mon == 9 || mon == 11) flag = 30;
		else if(mon == 2)
		{
			if((yr%4 == 0 && yr%100 != 0) || yr%400 == 0) flag = 29;
			else flag = 28;
		}
		for(var i = MENU_DATE.length-1; i > 0; i--){
			if(i > flag) date.options[i] = null;
			else date.options[i] = MENU_DATE[i];
		}
		date.options[dt].selected='selected';
		return true;
	}
	else return false;
}
function notEmpty(elem, helpMsg){
	if(elem.value.length == 0){
		var id_name = elem.name + '_alert';
		document.getElementById(id_name).innerHTML = '<font color=\'red\' size=2>' + helpMsg + '</font>';
		//elem.focus();//set the focus to this input
		return false;
	}
	else return true;
}
function isValidFormat(elem, format, helpMsg){
	if(!format.test(elem.value)){
		var id_name = elem.name + '_alert';
		document.getElementById(id_name).innerHTML = '<font color=\'red\' size=1>' + helpMsg + '</font>';
		//elem.focus();
		return false;
	}
	else return true;
}
function lengthRestriction(elem, lim1, lim2, helpMsg){
	var uInput = elem.value;
	if(uInput.length < lim1 || uInput.length > lim2){
		var Msg = 'The ' + helpMsg + ' length should be between ' +  lim1 + ' ~ ' + lim2 + ' characters.';
		var id_name = elem.name + '_alert';
		document.getElementById(id_name).innerHTML = '<font color=\'red\' size=2>' + Msg + '</font>';
		//elem.focus();
		return false;
	}
	else return true;
}
function doAjax(url, para){
	req = false;
	if(window.XMLHttpRequest){
		try{
			req = new XMLHttpRequest();
		}
		catch(e){
			req = false;
		}
	}
	else if(window.ActiveXObject){
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e){
			try{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				req = false;
			}
		}
	}
	if(req)
	{
		//POST method
		if(url == url1) req.onreadystatechange = signupCB;
		else if(url == url2) req.onreadystatechange = username_email_validation;
		req.open("POST", url, true);
		//set http header
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.setRequestHeader("Content-length", para.length);
		req.setRequestHeader("Connection", "close");
		req.send(para);
		//GET method
		/*if(url == url1) req.onreadystatechange = signupCB;
		else if(url == url2) req.onreadystatechange = username_email_validation;
		req.open("GET", url + '?' + para, true);
		req.send(null);*/
	}
	else alert("Sorry, but I couldn't create an XMLHttpRequest");
}
function signupCB(){
	if(req.readyState == 4){
		if(req.status == 200){
			if(req.responseText)
			{
				//document.getElementById("warning").innerHTML = req.responseText;
				if(req.responseText == 'Sign Up Completed') window.location = "homepage.php";
				else window.location = "login&signup.php";
			}
			else{
				alert("There was a problem with the request " + req.status);
			}
		}
		else{
			alert("There was a problem with the request " + req.status);
		}
	}
}
function username_email_validation(){
	if(req.readyState == 4){
		if(req.status == 200){
			if(req.responseText)
			{
				var jsonText = req.responseText;
				var jsonObject = JSON.parse(jsonText);
				if(jsonObject.username.length != 0)
				{
					if(jsonObject.username == '<font color=\'green\'>The username is good</font>') username_isAvailable = true;
					else username_isAvailable = false;
					document.getElementById('username_alert').innerHTML = jsonObject.username;
				}
				if(jsonObject.email.length != 0)
				{
					if(jsonObject.email == '<font color=\'green\'>The email is good</font>') email_isAvailable = true;
					else email_isAvailable = false;
					document.getElementById('email_alert').innerHTML = jsonObject.email;
				}
			}
			else alert("There was a problem with the request " + req.status);
		}
		else alert("There was a problem with the request " + req.status);
	}

}