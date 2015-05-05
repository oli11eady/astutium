var prePhrases = ["the", "my"];
var postPhrases = ["shop", "online", "services", "shop"];
var purchases = [];
var extensions = [".com", ".co.uk", ".org.uk", ".uk", ".me.uk", ".org", ".net", ".biz", ".info", ".us", ".me", ".mobi", ".ag", ".asia", ".aero", ".blue", ".global", ".kim", ".mn", ".onl", ".pro", ".pink", ".red", ".rich", ".sc", ".shiksha", ".vc", ".vegas", ".vote", ".voto", ".xxx", ".com.ag", ".org.ag", ".im", ".co.im", ".org.im", ".com.im", ".net.im", ".in", ".org.in", ".firm.in", ".co.in", ".net.in", ".ind.in", ".gen.in", ".plc.co.im", ".uk.com", ".jp.net", ".eu.com", ".us.org", ".gb.com", ".gb.net", ".ae.org", ".co.com", ".br.com", ".uk.net", ".africa.com", ".ar.com", ".de.com", ".gr.com", ".hu.com", ".hu.net", ".jpn.com", ".kr.com", ".in.net", ".plc.uk", ".ltd.uk", ".net.uk", ".qc.com", ".mex.com", ".ru.com", ".no.com", ".se.com", ".sa.com", ".se.net", ".uy.com", ".za.com", ".ltd.co.im", ".us.com", ".cn.com"];
var xml;
var cartCounter = 0;
var main = function() {



    //loads xml file in, a sync so no gurantee to be done when called, however in the context it is almost 100% 	
    $.ajax({

        type: 'GET',
        url: 'prices.xml',
        dataType: 'xml',
        success: function(data) {

            xml = data;
        }




    });
    var reasonCount = 0;
    //adds more reasons to purchase hosting when clicked
    $('h3').click(function(){

       if(reasonCount % 2 === 0){
        $(this).append("<ul class='reasons'><li>Local presence services for required country-code registrations</li>"+
            "<li>1-stop-shop for all your domain and hosting requirements</li>"+
            "<li>Total coverage - Every Global & Country TLD supported</li>"+
            "<li>Fully automated online registration process (where registry supports it)</li>"+
            "<li>Cheapest overall prices in Europe</li>"+
            "<li>Free self-managed DNS Zone included with domains</li>"+
            "<li>Extensive additional domain services available inc. Trademark Monitoring and Domain Recovery</li>"+
            "</ul>");}
        else{
            $(this).html("Need more reasons? Click me!");
        }
            reasonCount++;

    });

    //deals with customer wanting to continue, checks cart, if nothing is in the cart user can't continue
    $('#continue').click(function() {
    

        if (cartCounter === 0) {

            alert("You haven't got anything in your cart!");
        } else {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "path=/"; //gets rid of cookie, in context clears it so you can write a new one
            document.cookie = purchases + ";" + "path=/"; //sets cookie to what's in the cart

            window.location.href = "pricing.html"; //redirects to pricing
        }

    });

    //when a user wants to add their chosen domain name to cart
    $("#avail").on('click', '#addCart', function() {

        cartCounter++;
        var liDomain = $(this).parent().find("#result").text(); //domain selected
        var itemPrice = $(this).parent().find(":selected").text(); //item's price
        purchases.push(liDomain + "-" + itemPrice); //puts it in the array of items

        $("#cartText").html("(" + cartCounter + ")"); //sets vart counter in the document (top right)
        $(this).val("Remove"); //Changes value of the button pressed
        $(this).parent().find("select").attr('disabled', true); //disables being able to select period of time to avoid confusion
        this.id = "removeCart"; //changes the id so we can now listen for remove instead of addcart and so we can change the look

        if (cartCounter > 0) {

            $('#currency').attr('disabled', true); //stops being able to have multiple currencies in the basket
        }
        updateCartTotal(); //does nothing, to be inplemented later (when you hover over cart total will be displayed)

    });


    $("#avail").on('click', '#removeCart', function() {
        cartCounter--;
        var liDomain = $(this).parent().find("#result").text(); //domain selected
        var itemPrice = $(this).parent().find(":selected").text(); //item price
        var search = liDomain + "-" + itemPrice; //search value, so we can remove item from purchase array essentially the basket

        for (var i = purchases.length - 1; i >= 0; i--) { //iterates through backwards
            if (purchases[i] === search) {
                purchases.splice(i, 1); //removes element with index i aka the item we were searching for
            }

        }

        $("#cartText").html("(" + cartCounter + ")");
        $(this).val("Add to Cart");
        this.id = "addCart";
        $(this).parent().find("select").attr('disabled', false); //disables being able to select periods of time until removed from basket 
        if (cartCounter === 0) {
            $('#currency').attr('disabled', false); //enables the currency to be chosen again as nothing is in the basket, currency conflicts can't happen
        }
    });


    $("#protect").on('click', '#addCart', function() {
        cartCounter++;
        var liDomain = $(this).parent().find(".liDomain").text(); //domain
        var itemPrice = $(this).parent().find(":selected").text(); //price
        purchases.push(liDomain + "-" + itemPrice); //"basket" value

        //repeat, see above methods for comments
        $("#cartText").html("(" + cartCounter + ")");
        $(this).val("Remove");
        $(this).parent().find("select").attr('disabled', true);
        this.id = "removeCart";
        $('#purchaseValues').val(purchases);
        if (cartCounter > 0) {

            $('#currency').attr('disabled', true);
        }

    });

    //repeat, see above methods for comments
    $("#protect").on('click', '#removeCart', function() {
        cartCounter--;
        var liDomain = $(this).parent().find(".liDomain").text();
        var itemPrice = $(this).parent().find(":selected").text();
        console.log(itemPrice);
        var search = liDomain + "-" + itemPrice;

        for (var i = purchases.length - 1; i >= 0; i--) {
            if (purchases[i] === search) {
                purchases.splice(i, 1);
            }

        }

        $("#cartText").html("(" + cartCounter + ")");
        $(this).val("Add to Cart");
        this.id = "addCart";
        $(this).parent().find("select").attr('disabled', false);
        if (cartCounter === 0) {

            $('#currency').attr('disabled', false);
        }

    });


    //When user wants to check the availabilty if their chosen domain
    $("#check").click(function() {


        var availableText = document.getElementById("avail"); //gets the available text 

        var element = document.getElementById("price"); //not sure this is used? Probably not
        availableText.innerHTML = "<img src= 'img/ajax-loader.gif'/>"; //loading dail

        var y = document.getElementsByTagName("option"); //not sure this used? Probably not

        var domasasa = document.getElementById("domain"); //user's inputted domain name

        var patt = new RegExp("^[a-zA-Z0-9-]+$"); //Characters that are valid (0-9, a-z (case insensitive) and hyphens)

        var extension = $("#end").find(":selected").text(); //gets domain suffix selected
        var currency = $("#currency").find(":selected").text(); //gets currency user selects (4 options)

        if (patt.test(domasasa.value)) //checks if url has a valid structure
        {
            var domain = document.getElementById("domain").value + extension; //adds extention to the domain selected
            var api = "http://arp.astutium.com/whoisrs/whois/domain/" + domain + "?_type=json" //original astutium api

            url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + api + '"') + '&format=xml'; //Have to go through this API because of CORS


            checkAvailibilty(url, domain, availableText, extension, currency); //checks availability of domain selected and deals with inner html
            checkOtherExtensions(domasasa.value, extension, currency); //checks other extentsions so the user can chose alternatives

        } else {
            availableText.innerHTML = "Please enter a valid domain name, they can contain letters, numbers and hyphens."; //happens when vaildity check is failed
        }



    });

}

//to be implemented
function updateCartTotal() {



}

//Method to write the html for a select option within other extensions. Currency checks.
function innerHtmlFormat(extension, currency) {

    var domainValue = priceCheck(extension, currency);
    if (currency === "GBP") {
        return "<select>" +
            "<option>1 Year: &pound;" + domainValue[0] + "</option>" +
            "<option>2 Years: &pound;" + domainValue[1] + "</option>" +
            "<option>3 Years: &pound;" + domainValue[2] + "</option>" +
            "<option>4 Years: &pound;" + domainValue[3] + "</option>" +
            "<option>5 Years: &pound;" + domainValue[4] + "</option>" +
            "<option>6 Years: &pound;" + domainValue[5] + "</option>" +
            "<option>7 Years: &pound;" + domainValue[6] + "</option>" +
            "<option>8 Years: &pound;" + domainValue[7] + "</option>" +
            "<option>9 Years: &pound;" + domainValue[8] + "</option>" +
            "<option>10 Years: &pound;" + domainValue[9] + "</option></select>";
    } else if (currency == "USD") {
        return "<select>" +
            "<option>1 Year:  &#36;" + domainValue[0] + "</option>" +
            "<option>2 Years: &#36;" + domainValue[1] + "</option>" +
            "<option>3 Years: &#36;" + domainValue[2] + "</option>" +
            "<option>4 Years: &#36;" + domainValue[3] + "</option>" +
            "<option>5 Years: &#36;" + domainValue[4] + "</option>" +
            "<option>6 Years: &#36;" + domainValue[5] + "</option>" +
            "<option>7 Years: &#36;" + domainValue[6] + "</option>" +
            "<option>8 Years: &#36;" + domainValue[7] + "</option>" +
            "<option>9 Years: &#36;" + domainValue[8] + "</option>" +
            "<option>10 Years: &#36;" + domainValue[9] + "</option></select>";
    } else if (currency === "EURO") {

        return "<select>" +
            "<option>1 Year:  &euro;" + domainValue[0] + "</option>" +
            "<option>2 Years: &euro;" + domainValue[1] + "</option>" +
            "<option>3 Years: &euro;" + domainValue[2] + "</option>" +
            "<option>4 Years: &euro;" + domainValue[3] + "</option>" +
            "<option>5 Years: &euro;" + domainValue[4] + "</option>" +
            "<option>6 Years: &euro;" + domainValue[5] + "</option>" +
            "<option>7 Years: &euro;" + domainValue[6] + "</option>" +
            "<option>8 Years: &euro;" + domainValue[7] + "</option>" +
            "<option>9 Years: &euro;" + domainValue[8] + "</option>" +
            "<option>10 Years: &euro;" + domainValue[9] + "</option></select>";
    } else if (currency === "SEK") {
        return "<select>" +
            "<option>1 Year:  " + domainValue[0] + "kr</option>" +
            "<option>2 Years: " + domainValue[1] + "kr</option>" +
            "<option>3 Years: " + domainValue[2] + "kr</option>" +
            "<option>4 Years: " + domainValue[3] + "kr</option>" +
            "<option>5 Years: " + domainValue[4] + "kr</option>" +
            "<option>6 Years: " + domainValue[5] + "kr</option>" +
            "<option>7 Years: " + domainValue[6] + "kr</option>" +
            "<option>8 Years: " + domainValue[7] + "kr</option>" +
            "<option>9 Years: " + domainValue[8] + "kr</option>" +
            "<option>10 Years: " + domainValue[9] + "kr</option></select>";

    } else {
        return "error";
    }
};


//checks the xml file for the price, returns prices for 1-10 years, note that prices are just multiples of the 1 year value
function priceCheck(extension, currency) {

    var price;
    var prices = [];



    $(xml).find("domain").each(function() { //function for each domain element present

        var suf = $(this).find("suffix").text();



        if (suf === extension) { //checks if domain has our extension
            price = $(this).find(currency).text();

            for (var i = 1; i < 11; i++) {


                prices.push((price * i).toFixed(2)); //returns price to 2dp, note that using to.fixed makes it a string



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
function checkAvailibilty(url, domain, availableText, extension, currency) {

    //asynchronous, gets url on success does what we want to do
    $.ajax({
        type: "GET",
        url: url,
        success: function(text) {

            if (text.indexOf("<body>") === -1) { //if there's no body then there's been an error, indexOf not supported on some browsers?
                availableText.innerHTML = "<span class = 'error'>Sorry there's been an error checking www." + domain + ".</span>"; //Sometimes an error occurs, could be many reasons, but sometimes astutium's api just doesn't work
            } else {
                text = text.split("<body>")[1].split("</body>")[0]; //gets rid of the extra stuff the api added

                var json = JSON.parse(text); //converts it back to json
                var available = json.available; //gets the available attribute


                if (available === true) {
                    var message = "Congratulations! <span id='result'>www." + domain + "</span> is available!";
                    var addToCart = "<input type = 'button' id='addCart' value ='Add to Cart'>";
                    var selectPlan = innerHtmlFormat(extension, currency);

                    availableText.innerHTML = message + selectPlan + addToCart; //adds what we need to the doc


                } else if (available === false) {


                    availableText.innerHTML = "<span id='sorry'>Sorry www." + domain + " is not available.</span>"; //If a Domain is taken
                }

            }


        },
        error: function() {
            alert("I haven't finished checking your domain for you!");
        },
        dataType: "text"
    });

}

var counter = 0;
var i = 0;

//resets i and 0 everytime it's called, also resets the html.
function checkOtherExtensions(dom, extension, currency) {
    i = 0 //don't why i is here, 
    counter = 0;
    $('#protect').empty(); //empties what we had
    $('#looking').html("Other Domains you might be interested in"); //basic, this could be improved, could include loading dails.
    checkOtherExtenionsQuick(dom, extension, currency); //async version


}


function checkOtherExtenionsQuick(dom, extension, currency) {

    for (var i = 0; i < extensions.length; i++) {

        if (extensions[i] === extension) {

            //don't set up a ajax request if domain is the same
        } else {

            var domain = dom + extensions[i]; //adds current extentsion
            var api = "http://arp.astutium.com/whoisrs/whois/domain/" + domain + "?_type=json";
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + api + '"') + '&format=xml';
            extensionOptionAdder(url, domain, extensions[i], currency); //sets up extension.length amount of a async processes(approx 80). Note all these requests are dealt with asynchronously 
        }

    }
}

//non async way, sometimes wanted this, because of usage limits on the api
/*
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
*/


//deals with adding extra domain names for the user to select
function extensionOptionAdder(url, domain, extension, currency) {
    return $.ajax({
        type: "GET",
        url: url,
        success: function(text) {

            if (text.indexOf("<body>") === -1) { //if an error occurs, however we don't need to deal with this here.

            } else {
                text = text.split("<body>")[1].split("</body>")[0]; //gets rid of the extra stuff the api added

                var json = JSON.parse(text); //converts it back to json

                available = json.available; //gets the available attribute

                if (available === true) {
                    if (counter < 6) //don't display after 6 have been found, don't want to overload the user. Still regardless of results all requests are sent
                    {

                        var message = "<span class='liDomain'>www." + domain + "</span>";
                        var addToCart = "<input type = 'button' id='addCart' value ='Add to Cart'>";
                        var selectPlan = innerHtmlFormat(extension, currency); //passes it to the format method



                        $("#protect").append("<li>" + message + selectPlan + addToCart + "</li>");

                    }
                    counter++;


                } else if (available === false) {

                    //irrelevant
                }

            }


        },
        error: function() {
        
        },
        dataType: "text"
    });


}




//waits for the document to load before executing any javascript
$(document).ready(main);
