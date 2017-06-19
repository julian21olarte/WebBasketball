

//hallar fecha formateada desde date de mysql
function getFecha(fecha)
{
	var meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
	 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	 return fecha.getDate()+' de '+meses[fecha.getMonth()]+' de '+fecha.getFullYear();
}

var $body=$('body');




$(document).ready(function()
{

   

	/**$('.images').backstretch(["./images/img10.jpg","./images/img12.jpg",
							"./images/img27.jpg",
							"./images/img30.jpg","./images/img31.jpg",
							"./images/img32.jpg","./images/img8.jpg"
							],{fade:1000,duration:7000});*/





	//login admin

	$('.navbar ul li .login-form').submit(function(e){		
		e.preventDefault();
		var nombre=$('.navbar ul li login-form input[name=nombre]');
		var pass=$('.navbar ul li login-form input[name=contraseña]');

		$.ajax
        ({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function(data) 
            {	
            	if(data=='error')
            	{
            		$('.login-form p').css({'display':'block'});

            		$('.login-form').each(function(){
            			this.reset();
            		});
            	}
            	else
            	{
            		window.location.href='/Admin';
            	}
            }
        });       


	});






	//boton "ver mas" de la seccion noticias.
	$('.noticias .noti').click(function(){
		window.location.href='/Noticias';
	});





});