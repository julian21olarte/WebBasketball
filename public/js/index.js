$(document).ready(function(){

		//animacion banner
	$('.principal .banner').animate({top:'50', opacity: 1},2000);





	//animacion boton subir
	window.addEventListener("scroll", function() {
	    if($(window).width() >768)
	    {
	    	if (window.scrollY > 100) {

	        $('.navbar-default').fadeOut();   
		    }
		    else {

		        $('.navbar-default').fadeIn();
		    }
	    }
	    else
	    {
	    	 $('.navbar-default').fadeIn();
	    }

	    if(window.scrollY > 200)
	    {
	    	$('.subir').addClass('girar');
	    }
	    else
	    {
	    	 $('.subir').removeClass('girar');
	    }
	},false);

	$('.subir').on('click', function(){
	    $("html, body").animate({ scrollTop: 0 }, 600);
	    return false;
	 });


	
});