var $body=$('body');
var noticiaid, titulo, imagen, cuerpo, fecha, parrafo, img, noticia,modal;
$(document).ready(function(){



	modal=
	'<div class="modal fade" id="leer-noticia" role="dialog">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+

					'<div class="modal-header">'+
						'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
						'<h4 class="titulo">'+'</h4>'+
						'<p class="fecha">'+'</p>'+
					'</div>'+

					'<div class="modal-body">'+

						'<div class="imagen">'+
							'<img src="">'+
						'</div>'+

						'<p class="cuerpo">'+'</p>'+
					'</div>'+

					'<div class="modal-footer">'+
					'</div>'+					
				'</div>'+
			'</div>'+
		'</div>';
		$body.append(modal);



	//cargar noticias (index y noticias)
		
		$.post('/noticias_index', function(data){
			
			data=eval(data);
			tam=data.length;
			if(tam>4 && document.title=='CañonerosCucuta')
			{
				tam=4;
			}
			
			for(var i=0;i<tam;i++)
			{
				titulo=data[i].titulo;
				cuerpo=data[i].cuerpo;
				imagen=data[i].nombre;
				fecha=data[i].fecha;
				noticiaid=data[i].noticiaid; 
				


				noticiaid='<p class="id" style="display:none;">'+noticiaid+'</p>';

				parrafo='<p>'+cuerpo+'</p>';

				img='<div class="imagen">'+
						'<img src="./imagesUpload/'+imagen+'">'+
					'</div>';

				titulo='<h3>'+titulo+'</h3>';

				fecha=new Date(fecha*1000);
				fecha=getFecha(fecha);
				fecha='<p class="fecha">'+fecha+'</p>';
				
				if(document.title=='Noticias')
				{

					noticia='<div class="row noticia" data-toggle="modal" data-target="#leer-noticia">'+
								'<div class="row">'+
									'<div class="col-xs-12 col-sm-10 col-sm-offset-1">'+
										'<div class="col-xs-12 col-sm-4 col-md-3">'+
											img+
										'</div>'+
										'<div class="col-xs-12 col-sm-8 col-md-9">'+
											noticiaid+titulo+fecha+parrafo+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>';

					

					$('.noticias .final').before(noticia);

				}
				else
				{
					noticia='<div class="noticia" data-toggle="modal" data-target="#leer-noticia">'+noticiaid+img+titulo+fecha+parrafo+'</div>';
					noticia='<div class="col-xs-12 col-sm-3">'+noticia+'</div>';
					$('.noticias .contenido').append(noticia);
					
				}
			}
		});




		//click en una noticia, cargar modal lector de noticias
		$('.noticias').on('click','.noticia', function(){
			
			noticiaid=$(this).find('.id').text();
			
			$.ajax
			({
				type:'POST',
				url:'/leernoticia',
				data:
				{
					id:noticiaid
				},
				success: function(data)
				{
					data=eval(data);
			
					titulo=data[0].titulo;
					cuerpo=data[0].cuerpo;
					imagen=data[0].nombre;
					imagen='./imagesUpload/'+imagen;
					fecha=data[0].fecha;

					fecha=new Date(fecha*1000);
					fecha=getFecha(fecha);


					
					$body.find('.modal .modal-header .titulo').text(titulo);
					$body.find('.modal .modal-header .fecha').text(fecha);
					$body.find('.modal .modal-body .imagen img').attr('src',imagen);
					$body.find('.modal .modal-body .cuerpo').text(cuerpo);
				}
			});
		});





});