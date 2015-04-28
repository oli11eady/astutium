var main = function(){

	console.log(document.cookie);

	var cookie = document.cookie;
	var selections = cookie.split(",");


	$('#continue').click(function(){
		var empty = false;
		var elements = $(".required");

		for(var i = 0; i < elements.length; i++){

			if(elements[i].value === ""){

				empty = true;
			}
		}

		if(empty){

			alert("You need to enter a regsitrant name!");
		}

		else{

			window.location.href = "orderform.html";
		}
	
	
	});


	$('#cartText').html("("+selections.length+")");
	for(var i = 0; i<selections.length; i++){
		var split = selections[i].split("-");
		$('#options').append("<div class ='eachDomain'>"+ split[0] +"</div><div class='optionsTable' id='"+i+"'></div>");

		
		$('#' + i).append("<label>Hosting:</label> <span class='optionsItem'>Domain only</span>"+
              "<br/>"+
              "<label>Registration Period:</label> <span class'optionsItem'>" + split[1] +"</span>"+
              "<br/>"+
              "<label>Company ID number:</label> <span class='optionsItem'><input type='text'></span>"+
              "<br/>"+
              "<label>Registrant name:</label>   <span class='optionsItem'><input type='text' class='required'></span>"+
              "<br/>"+
              "<label>WHOIS Opt-Out:</label> <span class='optionsItem'><input type='checkbox'></span>");

	}


}



$(document).ready(main);