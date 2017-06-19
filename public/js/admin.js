
var titulo, imagen, fecha, cuerpo, parrafo, img, noticia, modal,
	nombre, apellido, doc, categoria, edad, alumno;

var $body=$('body');




modal='<div class="alert alert-success" style="display:none;">'+
         
          '<strong>Exito!</strong> Tu correo ha sido enviado con exito!'+
    '</div>';
$body.find('.admin').prepend(modal);



//inicio
$(document).ready(function()
{
	


	//animacion de la barra de navegacion lateral
	$('.navbar.navbar-default').animate({left:'0'},1000);



	

	//resetear modal cuando se oculta
	$('.modal').on('hidden.bs.modal', function () {

	    $(this).find('form').trigger('reset');
	});

});