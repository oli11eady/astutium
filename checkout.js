	var cookie = document.cookie;
	var selections = cookie.split(",");
	var prev;
	var count = 0;
	var newOld;
	var welcome;

function personal(){
	count =2;
		$('#back').attr('disabled', true);
		var info = "<label>First Name</label><input type = 'text><br/>"+
		"<label>Last Name</label><input type = 'text'><br/>"+
		"<label>Comapany Name</label><input type = 'text'><br/>"+
		"<label>Email Adress</label><input type = 'text' name='email'><br/>"+
		"<label>First Name</label><input type = 'text'><br/>"+
		"<label>Password</label><input type = 'password'><br/>"+
		"<label>Confirm Password</label><input type ='password'>";



		$('.customerChoice').html(info);


}

function address(){
	$('#back').attr('disabled', false);
	count =3;
	var info = "<label>Address 1</label><input type='text'><br/>"+
	"<label>Address 2</label><input type='text'><br/>"+
	"<label>City</label><input type='text'><br/>"+
	"<label>County/State/Region</label><input type='text'><br/>"+
	"<label>Postcode</label><input type='text'><br/>"+
	"<label>Country</label><input type='text'><br/>"+
	"<label>Phone number</label><input type='text'><br/>";

	$('.customerChoice').html(info);

}

function security(){
	count =  4;
$('#back').attr('disabled', false);
	var info = "<label>Security question: </label><select><option value=1>Favourite Colour ?</option>"+
	"<option value=2>Favourite Pudding ? </option>"+
	"<option value=3>Favourite Drink ?</option>"+
	"<option value=5>Favourite Pet ?</option>"+
	"<option value=6>Favourite Name ?</option>"+
	"<option value=7>Favourite Place ?</option>"+
	"<option value=8>Favourite Film/TV ?</option>"+
	"<option value=9>Favourite Shop ?</option>"+
	"<option value=10>Favourite Month/Season ?</option>"+
	"<option value=11>Favourite Car ?</option>"+
	"<option value=12>Favourite Friend ?</option>"+
	"<option value=13>Place of Birth</option>"+
	"<option value=14>Mothers Maiden Name</option>"+
	"<option value=15>Favourite Band</option>"+
	"<option value=16>What is your Maternal Grandmother&#039;s maiden name?</option>"+
	"<option value=17>What is the name of your first pet?</option>"+
	"<option value=18>What is the name of childhood best friend?</option>"+
	"<option value=19>What was the name of street you lived on at the age of 10?</option>"+
	"<option value=20>What is your date of birth? (Date format: DD/MM/YYYY)?</option>"+
"</select>"+
"<br/><label>Answer: </label><input type='password'>"+
"<br/><label>Mobile Number</label><input type='text'>"+
"<br/><label>SMS invoice notifications: </label><input type='checkbox'>"+
"<br/><label>Date of Birth</label><input type='text' placeholder='dd/mm/yyyy'>"+
"<br/><label>Twitter handle: <label><input type='text' placeholder='Without the @'>"+
"<br/><label>Customer Type</label><select>"+
"<option>End user</option>"+
"<option>Designer/Developer</option>"+
"<option>Reseller</option>"+
"<option>Consultant</option>"+
"<option>ISP</option>"+
"<option>Other</option>"+
"</select></br>";

	$('.customerChoice').html(info);


}

function login(){

	$('.customerChoice').html(welcome);
	$('#back').remove();
	$('#next').remove();


	$('content').append();
}

var main = function(){

$('#back').attr('disabled', true);
$('input[name=custType]').click(function(){

	
	
	newOld = $('input[name=custType]:checked').val();
	if(newOld === "exist"){
		$('#append').remove();
		$('.customerChoice').append("<div id='append'><label>Email Adress<label><input type='text' name='email'><br/><label>Password</label><input type='password' name='pass'></div>");
		count=4;
		
	}

	else{
		$('#append').remove();
		
		count = 1;
	}

});	

	$('#back').click(function(){


		if(count === 4){

			address();
		}

		else if(count === 3){

			personal();

		}

	
	});


	$('#next').click(function(){

		

			
		if(count === 1){
				
				personal();
				
				}


		else if(count === 2){
		
		var email = $('input[name=email]').val();
		welcome = "Hello " + email + ". Thank you for signing up!";
			address();
		}

		else if(count ===3){

		
			security();
		}

		else if(count ===4){
			if(newOld === "exist"){

				var email = $('input[name=email]').val();
				welcome = "Welcome back " + email + ". Thank you for returning";	
			}
			login();

		}	
				

	});





	for(var i = 0; i<selections.length; i++){

	var split = selections[i].split(":"); 
	$('.tableBody').append("<tr><td>"+split[0]+"</td><td>"+split[1]+"</td></tr>");
	}

	var sub = subtotal();
	var vat = vatCalc(sub);
	$('.tableBody').append("<tr><td>Subtotal</td><td>£"+sub+"</td></tr>");
	$('.tableBody').append("<tr><td>VAT-GB @ 20.00%:</td><td>£"+vat+"</td><tr>")

	var total = parseFloat(sub) + parseFloat(vat);
	$('.tableBody').append("<tr><td>Total:</td><td>£"+total+"</td></tr>")
}

function vatCalc(subtotal){

	vat = subtotal * 0.2;
	vat = vat.toFixed(2);
	return vat;
}	



function subtotal(){
	var subtotal = 0;
	for(var i =0; i<selections.length; i++){

		var split = selections[i].split(':');
		var price = split[1].replace(/[^0-9.]/g, "");
		subtotal = parseFloat(price) + subtotal;
	}


	return subtotal;
}



$(document).ready(main);