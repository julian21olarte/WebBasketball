function panelEntrenamientos()
{
	var code=
	'<div class="row">'+
		'<div class="col-xs-12">'+
			
			'<h2 class="titulo-panel">Entrenamientos <small>Panel Administrador</small></h2>'+
		'</div>'+
	'</div>'+
	
	
	'<div class="row">'+
		'<div class="col-xs-12 col-sm-4">'+
			'<div class="nueva nuevo-entrenamiento">'+
				'<a href="#" title="" data-toggle="modal" data-target="#crear-noticia"><span class="icon-plus"></span> Nuevo entrenamiento</a>'+
			'</div>'+
		'</div>'+

		
	'</div>'+

	'<div class="row">'+
		'<div class="col-xs-12">'+
			'<div class="entrenamientos">'+

			'</div>'+
		'</div>'+

	'</div>';
	$('.admin .marco').html(code);
}




$(document).ready(function(){




	$('#admin-entrenamientos').on('click', function(e){

		e.preventDefault();

		panelEntrenamientos()();

	});



});