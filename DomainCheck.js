var main =  function(){

	
	$("#check").click(function(){
		var element = document.getElementById("price");
		
	    var dom = $("#end").find(":selected").text();
	    var currency = $("#currency").find(":selected").text();
	    $.ajax({

	    	url: "prices.xml",
	    	dataType: "xml",
	    	success: function(data){

	    		$(data).find("domain").each(function(){
	    			

	    			var suf = $(this).find("suffix").text();
	    			

					if(suf === dom){
					var price = $(this).find(currency).text();		

						element.innerHTML = "Estimated Price: " + price;	
	    		}});
	    	}


	    });





	});


}
$(document).ready(main);