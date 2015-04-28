var prePhrases = ["the","my"];
var postPhrases = ["shop", "online", "services","shop"];
var purchases = [];

//".co.uk",".org.uk",".uk",".me.uk",".plc.uk",".ltd.uk",".net.uk",
var extensions = [".com",".org",".net",".biz",".info",".us",".me",".mobi",".ag",".asia",".aero",".blue",".global",".kim",".mn",".onl",".pro",".pink",".red",".rich",".sc",".shiksha",".vc",".vegas",".vote",".voto",".xxx",".com.ag",".org.ag",".im",".co.im",".org.im",".com.im",".net.im",".in",".org.in",".firm.in",".co.in",".net.in",".ind.in",".gen.in",".plc.co.im",".uk.com",".jp.net",".eu.com",".us.org",".gb.com",".gb.net",".ae.org",".co.com",".br.com",".uk.net",".africa.com",".ar.com",".de.com",".gr.com",".hu.com",".hu.net",".jpn.com",".kr.com",".in.net",".qc.com",".mex.com",".ru.com",".no.com",".se.com",".sa.com",".se.net",".uy.com",".za.com",".ltd.co.im",".us.com",".cn.com"];
var xml;
var cartCounter= 0;
var main = function(){
       



        $.ajax({

        	type: 'GET',
        	url: 'prices.xml',
        	dataType: 'xml',
        	success: function(data){

        		xml = data;
        	}

      

        
          });


    $('#continue').click(function(){

    	if(cartCounter === 0 ){

    		alert("You haven't got anything in your cart!");

    	}

    	else{
    		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" +"path=/";
    		document.cookie = purchases + ";" + "path=/";
    		
    		window.location.href = "pricing.html";
    	}

    });


    $("#avail").on('click', '#addCart', function(){

    	cartCounter++;
     	var liDomain = $(this).parent().find("#result").text();
     	var itemPrice = $(this).parent().find(":selected").text();
     	purchases.push(liDomain+"-"+itemPrice);

     	$("#cartText").html("("+cartCounter+")");
     	$(this).val("Remove");
     	$(this).parent().find("select").attr('disabled', true);
     	this.id = "removeCart";
     	$('#purchaseValues').val(purchases);
     	if(cartCounter > 0){

     		$('#currency').attr('disabled', true);	
     	}
     	updateCartTotal();

    });


        $("#avail").on('click', '#removeCart', function(){
    	cartCounter--;
     	var liDomain = $(this).parent().find("#result").text();
     	var itemPrice = $(this).parent().find(":selected").text();
     	var search = liDomain + "-" +itemPrice;

     	for(var i = purchases.length - 1; i >= 0; i--) {
    	if(purchases[i] === search) {
       	purchases.splice(i, 1);
    	}

}

     	$("#cartText").html("("+cartCounter+")");
     	$(this).val("Add to Cart");
     	this.id = "addCart";
     	$(this).parent().find("select").attr('disabled', false);
		$('#purchaseValues').val(purchases);
		if(cartCounter === 0){
		$('#currency').attr('disabled', false);
		}	
    });


    $("#protect").on('click', '#addCart', function(){
    	cartCounter++;
     	var liDomain = $(this).parent().find(".liDomain").text();
     	var itemPrice = $(this).parent().find(":selected").text();
     	purchases.push(liDomain+"-"+itemPrice);

     	$("#cartText").html("("+cartCounter+")");
     	$(this).val("Remove");
     	$(this).parent().find("select").attr('disabled', true);
     	this.id = "removeCart";
		$('#purchaseValues').val(purchases);
		if(cartCounter > 0){

     		$('#currency').attr('disabled', true);	
     	}

     	console.log(purchases);
    });

    $("#protect").on('click', '#removeCart', function(){
    	cartCounter--;
     	var liDomain = $(this).parent().find(".liDomain").text();
     	var itemPrice = $(this).parent().find(":selected").text();
     	var search = liDomain + "-" +itemPrice;

     	for(var i = purchases.length - 1; i >= 0; i--) {
    	if(purchases[i] === search) {
       	purchases.splice(i, 1);
    	}

		}

     	$("#cartText").html("("+cartCounter+")");
     	$(this).val("Add to Cart");
     	this.id = "addCart";
     	$(this).parent().find("select").attr('disabled', false);
		$('#purchaseValues').val(purchases);
		if(cartCounter === 0){

			$('#currency').attr('disabled', false);
		}

    });
	
	

	$("#check").click(function(){

		
		var availableText = document.getElementById("avail"); //gets the available text 

		var element = document.getElementById("price");
		availableText.innerHTML = "<img src= 'img/ajax-loader.gif'/>";
		
		  //gets currency selected
	    var y = document.getElementsByTagName("option");


		var domasasa = document.getElementById("domain");		//users inputted domain name
			
		var patt = new RegExp("^[a-zA-Z0-9-]+$");   //Characters that are valid
		
		var extension = $("#end").find(":selected").text();  //gets domain suffix selected
		var currency = $("#currency").find(":selected").text();

		if(patt.test(domasasa.value))
		{
		var domain = document.getElementById("domain").value + extension;  
		var api = "http://arp.astutium.com/whoisrs/whois/domain/"+domain+"?_type=json"   //original astutium api
		
		url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + api +'"') + '&format=xml';  //Have to go through this API because of CORS
		
	
	  	checkAvailibilty(url, domain, availableText, extension, currency);
	   checkOtherExtensions(domasasa.value, extension, currency);

	}	
	else {
		availableText.innerHTML = "Please enter a valid domain name, they can contain letters, numbers and hyphens.";
	}
		
	

});

}


function updateCartTotal(){



}

function innerHtmlFormat(extension, currency){
					
					var domainValue = priceCheck(extension, currency);
					if(currency === "GBP"){
					return "<select>" +
					"<option>1 Year: &pound;"+ domainValue[0] +"</option>"+
					"<option>2 Years: &pound;"+ domainValue[1]+"</option>"+
					"<option>3 Years: &pound;"+ domainValue[2]+"</option>"+
					"<option>4 Years: &pound;"+ domainValue[3]+"</option>"+
					"<option>5 Years: &pound;"+ domainValue[4]+"</option>"+
					"<option>6 Years: &pound;"+ domainValue[5]+"</option>"+
					"<option>7 Years: &pound;"+ domainValue[6]+"</option>"+
					"<option>8 Years: &pound;"+ domainValue[7]+"</option>"+
					"<option>9 Years: &pound;"+ domainValue[8]+"</option>"+
					"<option>10 Years: &pound;"+domainValue[9]+"</option></select>";
				}

				else if(currency == "USD")
				{
					return "<select>" +
					"<option>1 Year:  &#36;"+ domainValue[0] +"</option>"+
					"<option>2 Years: &#36;"+ domainValue[1]+"</option>"+
					"<option>3 Years: &#36;"+ domainValue[2]+"</option>"+
					"<option>4 Years: &#36;"+ domainValue[3]+"</option>"+
					"<option>5 Years: &#36;"+ domainValue[4]+"</option>"+
					"<option>6 Years: &#36;"+ domainValue[5]+"</option>"+
					"<option>7 Years: &#36;"+ domainValue[6]+"</option>"+
					"<option>8 Years: &#36;"+ domainValue[7]+"</option>"+
					"<option>9 Years: &#36;"+ domainValue[8]+"</option>"+
					"<option>10 Years: &#36;"+domainValue[9]+"</option></select>";
				}

				else if(currency === "EURO"){

					return "<select>" +
					"<option>1 Year:  &euro;"+ domainValue[0] +"</option>"+
					"<option>2 Years: &euro;"+ domainValue[1]+"</option>"+
					"<option>3 Years: &euro;"+ domainValue[2]+"</option>"+
					"<option>4 Years: &euro;"+ domainValue[3]+"</option>"+
					"<option>5 Years: &euro;"+ domainValue[4]+"</option>"+
					"<option>6 Years: &euro;"+ domainValue[5]+"</option>"+
					"<option>7 Years: &euro;"+ domainValue[6]+"</option>"+
					"<option>8 Years: &euro;"+ domainValue[7]+"</option>"+
					"<option>9 Years: &euro;"+ domainValue[8]+"</option>"+
					"<option>10 Years: &euro;"+domainValue[9]+"</option></select>";
				}

				else if(currency ==="SEK"){
					return "<select>" +
					"<option>1 Year:  "+ domainValue[0] +"kr</option>"+
					"<option>2 Years: "+ domainValue[1]+"kr</option>"+
					"<option>3 Years: "+ domainValue[2]+"kr</option>"+
					"<option>4 Years: "+ domainValue[3]+"kr</option>"+
					"<option>5 Years: "+ domainValue[4]+"kr</option>"+
					"<option>6 Years: "+ domainValue[5]+"kr</option>"+
					"<option>7 Years: "+ domainValue[6]+"kr</option>"+
					"<option>8 Years: "+ domainValue[7]+"kr</option>"+
					"<option>9 Years: "+ domainValue[8]+"kr</option>"+
					"<option>10 Years: "+domainValue[9]+"kr</option></select>";

				}

				else{ 
					return "error";
				}
};



function priceCheck(extension,currency){

	var price;
	var prices = [];
 	
 	

	$(xml).find("domain").each(function(){

		var suf = $(this).find("suffix").text();

					

		if(suf === extension){
		price = $(this).find(currency).text();

		for(var i = 1; i <11; i++){


			prices.push((price*i).toFixed(2));



		}
	
			}


	});
	return prices;
}


	/*
	$.ajax({

			url: "prices.xml",
			dataType: "xml",
			success: function(data){

				$(data).find("domain").each(function(){


					var suf = $(this).find("suffix").text();

					

					if(suf === extension){
						var price = $(this).find(currency).text();

					}});


			}


		});
	}
	*/


//Checks availibility of doamin name.
function checkAvailibilty(url, domain, availableText, extension, currency){


	$.ajax({
			type: "GET",
			url: url,
			success: function(text){
				
				if(text.indexOf("<body>")=== -1){
					availableText.innerHTML = "<span class = 'error'>Sorry there's been an error checking www." + domain+".</span>"; 
				}
				else{text = text.split("<body>")[1].split("</body>")[0];  //gets rid of the extra stuff the api added
				
				var json = JSON.parse(text);			//converts it back to json
				var available = json.available;		//gets the available attribute
	
    
				if(available === true){
					var message = "Congratulations! <span id='result'>www." + domain + "</span> is available!";
					var addToCart =  "<input type = 'button' id='addCart' value ='Add to Cart'>";
					
			
					var selectPlan = innerHtmlFormat(extension, currency);
					
					availableText.innerHTML =  message + selectPlan + addToCart;
					

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

var counter = 0;
var i = 0;

//resets i and 0 everytime it's called, also resets the html.
function checkOtherExtensions(dom, extension,currency){
		i = 0
		counter = 0;
		$('#protect').empty();
		$('#looking').html("Looking for domain names");
		checkOtherRecursive(dom, extension,currency);
		

    }

    function checkOtherRecursive(dom, extension,currency){
    	if(extensions[i] === extension){

    		i++
    		checkOtherRecursive(dom,extension, currency);
    	}
    else{	
    	var domain = dom + extensions[i];    //equals: input.extension

	    var api = "http://arp.astutium.com/whoisrs/whois/domain/"+domain+"?_type=json";   //original astutium api
	var	url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + api +'"') + '&format=xml';
	
	var yeah = extensionOptionAdder(url, domain,extensions[i], currency);
	i++

	$.when(yeah).done(function(){

		if(counter < 6){
			checkOtherRecursive(dom, extension, currency);

			
		}

		else{
			$('#looking').html("");
		}
	});
    }
}


function extensionOptionAdder(url, domain,extension,currency){
	return $.ajax({
			type: "GET",
			url: url,
			success: function(text){
				
				if(text.indexOf("<body>")=== -1){
					
				}
				else{text = text.split("<body>")[1].split("</body>")[0];  //gets rid of the extra stuff the api added
				
				var json = JSON.parse(text);			//converts it back to json
			
				 available = json.available;		//gets the available attribute
    
					if(available === true){
						if(counter<6)
						{
							
					var message = "<span class='liDomain'>www." + domain+"</span>";
					var addToCart =  "<input type = 'button' id='addCart' value ='Add to Cart'>";
				    var selectPlan = innerHtmlFormat(extension, currency);
				
					
						
						$("#protect").append("<li>" +message + selectPlan + addToCart + "</li>");

					}
						counter++;
					

				}

				else if(available === false){
							

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


