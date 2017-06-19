
//hallar fecha formateada desde date de mysql
function getFecha(fecha)
{
	var meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
	 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	 return fecha.getDate()+' de '+meses[fecha.getMonth()]+' de '+fecha.getFullYear();
}




//carga las noticias a partir de una consulta sql 
function cargarNoticias(data)
{

	var res="";

	if(data!='error')
	{
		data=eval(data);

		for(var i=0;i<data.length;i++)
		{
			titulo=data[i].titulo;
			imagen=data[i].nombre;
			fecha=data[i].fecha;
			cuerpo=data[i].cuerpo;
			noticiaid=data[i].noticiaid;

			if(cuerpo.length>99)
			{
				cuerpo=cuerpo.substr(0, 99)+'...';
				
			}

			cuerpo='<p>'+cuerpo+'</p>';

			noticiaid='<p class="id" style="display:none;">'+noticiaid+'</p>';


			titulo='<p>'+titulo+'</p>';

			img='<div class="imagen">'+
					'<img src="./imagesUpload/'+imagen+'">'+
				'</div>';

			fecha=new Date(fecha*1000);
			fecha=getFecha(fecha);
			fecha='<p class="fecha">'+fecha+'</p>';

			noticia='<div class="col-xs-12 col-sm-2">'+
						img+
					'</div>'+

					'<div class="col-xs-12 col-sm-4">'+
						'<b>'+titulo+'</b>'+
						fecha+
					'</div>'+

					'<div class="col-xs-12 col-sm-3">'+
						cuerpo+
					'</div>'+

					'<div class="col-xs-12 col-sm-3">'+
						'<div class="botones">'+
							noticiaid+

							'<span class="icon-edit edit"></span>'+

							'<span class="icon-minus remove"></span>'+
							
						'</div>'+

					'</div>';

			noticia='<div class="row fila-noticia">'+noticia+'</div>';
			res+=noticia;

		}
	}
	else
	{
		res='<h2>No existen noticias registradas!</h2>';
	}
	return res;
}





//funcion para dibujar el panel de noticias
function panelNoticias()
{
	var code=
	'<div class="row">'+
		'<div class="col-xs-12">'+
			
			'<h2 class="titulo-panel">Noticias <small>Panel Administrador</small></h2>'+
		'</div>'+
	'</div>'+
	
	
	'<div class="row">'+
		'<div class="col-xs-12">'+
			'<button class="btn btn-success nueva-noticia" data-toggle="modal" data-target="#crear-noticia"><span class="icon-plus"></span> Nueva noticia</button>'+
			'<div class="input-group col-xs-12 col-sm-6">'+
				'<input id="buscarnoticia" class="form-control input-medium" type="text" placeholder="Buscar noticia por titulo" name="buscarnoticia">'+
				'<div class="input-group-btn">'+
						'<button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>'+

	'<div class="row">'+
		'<div class="col-xs-12">'+
			'<div class="noticias">'+

			'</div>'+
		'</div>'+

	'</div>';
	$('.admin .marco').html(code);
}




modal=
//modal crear noticias
'<div class="modal fade" id="crear-noticia" role="dialog">'+
	
	'<div class="modal-dialog modal-lg">'+
		'<div class="modal-content">'+
			'<div class="container-nueva-noticia">'+
				'<form class="form-nueva-noticia" action="/nueva-noticia" method="POST" accept-charset="utf-8" enctype="multipart/form-data">'+
					'<input class="id" style="display:none;" name="idnoticia" type="text" value"new">'+
					'<div class="modal-header">'+
						'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
						'<h4 class="titulo-nueva-noticia">Nueva Noticia</h4>'+
						
					'</div>'+

					'<div class="modal-body row">'+

						'<div class="form-group col-sm-12">'+
							'<label for="subir-imagen">Imagen Principal</label>'+
							'<input accept="image/*" id="subir-imagen" class="form-control" type="file" placeholder="Imagen Principal" name="imagenes">'+
						'</div>'+

						'<div class="form-group col-sm-12">'+
							'<label for="titulo-noticia">Titulo de la noticia</label>'+
							'<input id="titulo-noticia" class="form-control" type="text" placeholder="Titulo" name="titulo" required="">'+
						'</div>'+


						'<div class="form-group col-sm-12">'+
							'<label for="cuerpo-noticia">Cuerpo de la noticia</label>'+
							'<textarea id="cuerpo-noticia" class="form-control" placeholder="noticia" name="cuerponoticia" rows="5" required=""></textarea>'+
						'</div>'+
						
					'</div>'+

					'<div class="modal-footer">'+
						'<button type="button" class="btn cancelar" data-dismiss="modal">Cancelar</button>'+
						'<input id="enviar" type="submit" class="form-control" name="guardar" value="Guardar">'+
					'</div>'+		
					
					
				'</form>'+
			'</div>'+
		'</div>'+
	'</div>'+
'</div>';

$body.append(modal);





$(document).ready(function(){



	//*****************cargar panel de noticias del administrador
	$('#admin-noticias').on('click', function(e){

		e.preventDefault();

		panelNoticias();

		datos={consulta: 'all' };

		$.post('/admin-noticias', datos, function(data){

			
				$('.admin .marco .noticias').html(cargarNoticias(data));
				
				//cerrar menu despues del click
				$('.navbar-collapse.in').collapse('hide');

		});

	});






	$('body').on('click', '.nueva.nueva-noticia', function(e){

		$('#crear-noticia h4').text('Registrar noticia');
		$('#crear-noticia .id').val('new');
		//alert($('#crear-noticia .id').val());
	});




	//envio de formulario de nueva noticia /nueva-noticia
    $('.form-nueva-noticia').ajaxForm(function(){

    	//alert('si entre al form');
		
    	$('#crear-noticia').modal('hide');
    	$('.alert').html('<strong>Exito!</strong> Noticia creada correctamente');
    	$('.alert').css({'display':'block'});

    	
		setTimeout(function() 
		{
			$('.alert').fadeOut();

		}, 4000);
		
    });




    //editar noticias registradas
     $('.admin .marco').on('click','.noticias .botones .edit', function(e){


	    	id=$(this).siblings('p.id').text();
	    	formnoticia=$('#crear-noticia');

	    	$('#crear-noticia .id').val(id);

	    	//alert($('#crear-noticia .id').val());

	    	datos={id:id};
	    	$.post('/consulta-noticia', datos, function(data){

	    		data=eval(data);
            	
            	formnoticia.find('input[name="titulo"]').val(data[0].titulo);
            	formnoticia.find('textarea[name="cuerponoticia"]').val(data[0].cuerpo);

            	formnoticia.find('h4').text('Editar noticia');
            	
	    	});

	    	formnoticia.find('input.id').val(id);
	    	formnoticia.modal('show');

	    });





     //eliminar noticias registradas
    $('.admin .marco').on('click', '.noticias .botones .remove', function(e){

    	id=$(this).siblings('p.id').text();
    	formnoticia=$('#crear-noticia');
    	
    	$.ajax({

    		type: 'POST',
            url: '/consulta-noticia',
            data: {id:id},
            success: function(data1) 
            {	
            	data1=eval(data1);

    			var res=confirm('Desea eliminar la noticia: '+data1[0].titulo+'?');

    			if(res)
    			{
    				$.post('/eliminar-noticia', {id:id},function(data2){
    					alert('Noticia '+data1[0].titulo+' eliminada correctamente!');
    				});
    			}

            }

    	});
    });


    //funcion para filtrar los alumnos por el nombre (search bar)
    $('.admin .marco').on('keyup', '#buscarnoticia', function(e){



    	//if((e.which>=65 && e.which<=90) || e.which==8 || e.which==32)
	    	var res=($(this).val());
    	if(res.match(/^[a-zA-Z0-9\s]+$|^$/))
    	{
    			console.log('letra= '+e.which);

	    	var datos={consulta: res.trim()};

	    	$.post('/admin-noticias', datos, function(data){
				
				$('.admin .marco .noticias').html(cargarNoticias(data));

	    	});
    			
    	}
    });


});