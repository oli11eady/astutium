var main =  function(){
		
	$("#check").click(function(){


		var availableText = document.getElementById("avail"); //gets the available text 

		var element = document.getElementById("price");
		availableText.innerHTML = "<img src= 'img/ajax-loader.gif'/>";
		
		var dom = $("#end").find(":selected").text();  //gets domain suffix selected
		var currency = $("#currency").find(":selected").text();  //gets currency selected
	    var y = document.getElementsByTagName("option");


		var available = false;
		var domasasa = document.getElementById("domain");		//users inputted domain name
			
		var patt = new RegExp("^[a-zA-Z0-9-]+$");   //Characters that are valid
		
		
		if(patt.test(domasasa.value))
		{
		var domain = document.getElementById("domain").value + dom;  
		var api = "http://arp.astutium.com/whoisrs/whois/domain/"+domain+"?_type=json"   //original astutium api
		
		url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + api +'"') + '&format=xml';  //Have to go through this API because of CORS
		
	
	    checkAvailibilty(url, domain, availableText);

	    priceCheck(dom, element, currency);

		}

	else {
		availableText.innerHTML = "Please enter a valid domain name, they can contain letters, numbers and hyphens.";
	}
	
	

});

}

//Checks prices
function priceCheck(dom,element,currency){

	$.ajax({

			url: "prices.xml",
			dataType: "xml",
			success: function(data){

				$(data).find("domain").each(function(){


					var suf = $(this).find("suffix").text();

					

					if(suf === dom){
						var price = $(this).find(currency).text();
						console.log(price);
						element.innerHTML = "Estimated Price: " + price;	
					}});


			}


		});
	}

//Checks availibility of doamin name.
function checkAvailibilty(url, domain, availableText){

	
	$.ajax({
			type: "GET",
			url: url,
			success: function(text){
				
				if(text.indexOf("<body>")=== -1){
					availableText.innerHTML = "Sorry " + domain + " is not valid";
				}
				else{text = text.split("<body>")[1].split("</body>")[0];  //gets rid of the extra stuff the api added
				
				var json = JSON.parse(text);			//converts it back to json
			

				var available = json.available;		//gets the available attribute
    
				if(available === true){

					availableText.innerHTML = "Congratulations! <span id='result'>www." + domain + "</span> is available ";

				}

				else if(available === false){
							

					availableText.innerHTML = "Sorry " + domain + " is not available";
				}

			}



			},
			error: function(){
				alert("Error");
			},
			dataType: "text"


		});



}

$(document).ready(main);

/*
		var option = document.getElementsByTagName("option");
		for(var i =0; i < option.length; i++){
		var dom2 = option[i].value;
		
		var domain2 ="dsdasfsdfdfdsfdfsdf"+ dom2;  
		var api2 = "http://arp.astutium.com/whoisrs/whois/domain/"+domain2+"?_type=json"   //original astutium api
		var url2 = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + api2 +'"') + '&format=xml';
	
		(function (i, url2, dom2){
		  $.ajax({

			type: "GET",
			url: url2,
			success: function(text){

					
				if(text.indexOf("<body>")=== -1){
					console.log("Surely not?" + dom2);
				}
				else{text = text.split("<body>")[1].split("</body>")[0];  //gets rid of the extra stuff the api added
				
				var json = JSON.parse(text);			//converts it back to json
			

				var available = json.available;		//gets the available attribute
    
				if(available === true){


				}

				else if(available === false){
					console.log("Surely not?!");
							
				}

			}



			},
			error: function(){
				alert("Error");
			},
			dataType: "text"
		});
		})(i,url2,dom2);
	}
	*/		
