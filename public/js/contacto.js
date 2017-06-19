$(document).ready(function(){





	//enviar correo seccion contacto
	$('.contacto .mail-contacto .mail-form').submit(function(e){

		e.preventDefault();

		$.ajax
		({

		 	type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function(data) 
            {	
        		if(data=='error')
        		{

        		}
        		else
        		{
        			$('.contacto .alert').css({'display':'block'});
        			$('.mail-form').each(function(){
            			this.reset();
            		});

            		setTimeout(function() {
            			$('.contacto .alert').fadeOut();
					}, 4000);
        		}
            	
            }

		});

	});


});