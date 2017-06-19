

//hallar una edad a partir de una fecha de nacimiento desde date mysql
function getEdad(fecha)
{
    var date=new Date();
    var edad= date.getFullYear()-fecha.getFullYear();
    if(fecha.getMonth()>date.getMonth() && fecha.getDate()>date.getDate())
    {
        edad--;
    }
    return edad;
}

function getMes()
{
    var date=new Date().getMonth();

    if(date==0)return 'Enero';
    else if(date==1)return 'Febrero';
    else if(date==2)return 'Marzo';
    else if(date==3)return 'Abril';
    else if(date==4)return 'Mayo';
    else if(date==5)return 'Junio';
    else if(date==6)return 'Julio';
    else if(date==7)return 'Agosto';
    else if(date==8)return 'Septiembre';
    else if(date==9)return 'Octubre';
    else if(date==10)return 'Noviembre';
    else if(date==11)return 'Diciembre';
}





//hallar fecha formateada 
function sqlToDate(sql)
{

    var today = new Date(sql);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm} 
    today = yyyy+'-'+mm+'-'+dd;   
    return today;  
    
}

function getFecha(fecha)
{
    var meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
     'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

     return fecha.getDate()+' de '+meses[fecha.getMonth()]+' de '+fecha.getFullYear();
}


function getEstadoPago(fecha)
{
    date=new Date();
    if(fecha!=null)
    {
        fecha=new Date(fecha);
    }
    else
    {
        return 'debe';
    }

    if(fecha.getMonth()==date.getMonth() && fecha.getFullYear()==date.getFullYear())
    {
        return 'pagado';
    }
    else
    {
        return 'debe';
    }
}





//carga los alumnos del panel de alumnos a partir del resultado de una consulta sql
function cargarAlumnos(data)
{
    var res="";

    if(data!='error')
    {
        data=eval(data);
        for(var i=0;i<data.length;i++)
        {
            nombre=data[i].nombre;
            apellido=data[i].apellido;
            doc=data[i].documento;
            categoria=data[i].categoria;
            alumnoid=data[i].alumnoid;

            alumnoid='<p class="id" style="display:none;">'+alumnoid+'</p>';

            edad=new Date(data[i].fecha_nac);
            
            edad=getEdad(edad);

            //nombre='<h5><b>'+nombre+' '+apellido+'</b></h5>';

            //doc='<h5><b>'+doc+'</b></h5>';

            //categoria='<h5 class="hidden-xs hidden-sm"><b>'+categoria+'</b></h5>';

            //edad='<h5 class="hidden-xs hidden-sm"><b>'+edad+'</b></h5>';

            alumno='<td>'+
                        nombre+' '+apellido+                             
                    '</td>'+
                    '<td class="hidden-xs">'+
                        doc+                
                    '</td>'+
                    '<td class="hidden-sm hidden-xs">'+
                        edad+ 
                    '</td>'+ 
                    '<td class="hidden-sm hidden-xs">'+
                        categoria+ 
                    '</td>'+ 
 
                    '<td class="botones">'+
                        alumnoid+
                        '<span class="icon-edit edit"></span>'+

                        '<span class="icon-minus remove"></span>'+

                        '<span class="icon-credit pay"></span>'+
                    '</td>';

            alumno='<tr>'+alumno+'</tr>';
            res+=alumno;
        }
            res = 
            '<div class="col-xs-12">'+    
                '<table class="table table-hover table-alumnos">'+
                    '<thead>'+ 
                        '<tr>'+
                            '<th>NOMBRE</th>'+
                            '<th class="hidden-xs">DOCUMENTO</th>'+
                            '<th class="hidden-sm hidden-xs">EDAD</th>'+
                            '<th class="hidden-sm hidden-xs">CATEGORIA</th>'+
                            '<th class="hidden-sm hidden-xs">CONTROLES</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                        res+
                    '</tbody>'+
                '</table>'+
            '</div>';
    }
    else
    {
        res='<h2>No existen alumnos registrados!</h2>';
    }
    return res;
}





//funcion para dibujar el panel de alumnos
function panelAlumnos()
{
    var code=
    '<div class="row">'+
        '<div class="col-xs-12">'+
            
            '<h2 class="titulo-panel">Alumnos <small>Panel Administrador</small></h2>'+
        '</div>'+
    '</div>'+
    
    '<div class="row">'+
        '<div class="col-xs-12">'+
            '<button href="#" class="btn btn-success nuevo-alumno" data-toggle="modal" data-target="#crear-alumno"><span class="icon-plus"></span> Nuevo alumno</button>'+
            '<div class="input-group col-xs-12 col-sm-6">'+
                '<input id="buscaralumno" class="form-control input-medium" type="text" placeholder="Buscar alumno por nombre" name="buscarlaumno">'+
                '<div class="input-group-btn">'+
                    '<button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="row">'+
        '<div class="col-xs-12">'+
            '<div class="alumnos">'+

            '</div>'+
        '</div>'+

    '</div>';
    $('.admin .marco').html(code);
}



    //modal crear alumnos
modal='<div class="modal fade" id="crear-alumno" role="dialog">'+
    
    '<div class="modal-dialog modal-lg">'+
        '<div class="modal-content">'+
            '<div class="container-nuevo-alumno">'+
                '<form role="form" class="form-nuevo-alumno form-horizontal" action="/nuevo-alumno" method="POST" accept-charset="utf-8">'+
                    '<input class="id" style="display:none;" name="idalumno" type="text" value"new">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                        '<h4 class="titulo-nuevo-alumno">Registrar Alumno</h4>'+   
                    '</div>'+

                    '<div class="modal-body">'+
                        '<div class="row">'+  
                        
                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Nombre:</label>'+
                                    '<input id="prueba" class="form-control" type="text" placeholder="Nombres" name="nombre" required="">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Fecha de nacimiento:</label>'+
                                    '<input class="form-control" type="date" placeholder="Fecha de nacimiento" name="fecha" required="">'+
                                '</div>'+
                            '</div>'+
                            
                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Documento:</label>'+
                                    '<input class="form-control" type="number" min="0" max="9999999999" placeholder="Documento" name="documento" required="">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Estatura (cm):</label>'+
                                    '<input class="form-control" type="number" min="0" max="400" placeholder="Estatura en cm" name="estatura" required="">'+
                                '</div>'+
                             '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Categoria:</label>'+
                                    '<select class="form-control select-categoria" name="categoria" required><option value="cat" disabled selected hidden>Categoria</option></select>'+
                                '</div>'+
                            '</div>'+
                            
                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Estudios:</label>'+
                                    '<input class="form-control" type="text" placeholder="Estudios" name="estudios" required="">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Apellido:</label>'+
                                    '<input class="form-control" type="text" placeholder="Apellidos" name="apellido" required="">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Lugar de nacimiento:</label>'+
                                    '<input class="form-control" type="text" placeholder="Lugar de nacimiento" name="lugar" required="">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Telefono:</label>'+
                                    '<input class="form-control" type="tel" placeholder="Telefono" name="tel" required="">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Peso (kg):</label>'+
                                    '<input class="form-control" type="number" min="0" max="300" placeholder="Peso en kg" name="peso" required="">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Tipo de  sangre:</label>'+
                                    '<select class="form-control select-sangre" name="tiposangre" required>'+
                                        '<option value="" disabled selected hidden>Tipo de sangre</option>'+
                                        '<option value="A+">A+</option>'+
                                        '<option value="A-">A-</option>'+
                                        '<option value="B+">B+</option>'+
                                        '<option value="B-">B-</option>'+
                                        '<option value="AB+">AB+</option>'+
                                        '<option value="AB-">AB-</option>'+
                                        '<option value="O+">O+</option>'+
                                        '<option value="O-">O-</option>'+
                                    '</select>'+
                                '</div>'+
                            '</div>'+


                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Proyeccion futura:</label>'+
                                    '<textarea class="form-control" placeholder="Proyeccion futura" name="proyeccion" required=""></textarea>'+
                                '</div>'+
                            '</div>'+


                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Nombre del padre:</label>'+
                                    '<input class="form-control" type="text" placeholder="Nombre del padre" name="nombrepadre">'+
                                '</div>'+

                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Telefono del padre:</label>'+
                                    '<input class="form-control" type="tel" placeholder="Telefono" name="telpadre">'+
                                '</div>'+

                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Ocupacion del padre:</label>'+
                                    '<input class="form-control" type="text" placeholder="Ocupacion" name="ocupacionpadre">'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-sm-12 col-md-6">'+
                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Nombre de la madre:</label>'+
                                    '<input class="form-control" type="text" placeholder="Nombre de la madre" name="nombremadre">'+
                                '</div>'+

                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Telefono de la madre:</label>'+
                                    '<input class="form-control" type="tel" placeholder="Telefono" name="telmadre">'+
                                '</div>'+

                                '<div class="form-group col-sm-12">'+
                                    '<label for="prueba">Ocupacion de la madre:</label>'+
                                    '<input class="form-control" type="text" placeholder="Ocupacion" name="ocupacionmadre">'+
                                '</div>'+
                            '</div>'+
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
'</div>'+

//registrar pagos
'<div class="modal fade" id="crear-pago" role="dialog">'+
    
    '<div class="modal-dialog">'+
        '<div class="modal-content">'+
            '<div class="container-nuevo-pago">'+
                '<form class="form-nuevo-pago" action="/registrar-pago" method="POST" accept-charset="utf-8" enctype="multipart/form-data">'+
                    '<input class="id" style="display:none;" name="idpago" type="text" value"new">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                        '<h4 class="titulo-nuevo-pago">Registrar pago</h4>'+
                        
                    '</div>'+

                    '<div class="modal-body row">'+

                        
                        
                    '</div>'+

                    '<div class="modal-footer">'+
                        '<button type="button" class="btn cancelar" data-dismiss="modal">Cancelar</button>'+
                        '<input id="enviar" type="submit" class="form-control" name="guardar" value="Registrar">'+
                    '</div>'+       
                    
                    
                '</form>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>';


$body.append(modal);





$(document).ready(function(){



    $('body').on('click', '.nueva.nuevo-alumno',function(e){

        $('#crear-alumno h4').text('Registrar Alumno');
        $('#crear-alumno .id').val('new');
    });




//cargar select categorias del formularo agregar alumno
$.post('/cargar-categoria', function(data){
    data=eval(data);
    var cat='';
    for(var i=0;i<data.length; i++)
    {
        cat+='<option value="'+data[i].id+'">'+data[i].nombre+' ('+data[i].edad_min+' años - '+data[i].edad_max+' años)</option>';
    }
    $('.select-categoria').append(cat);
});



    //cargar la lista de alumnos del panel de admin-alumnos
    $('#admin-alumnos').on('click', function(e){

        e.preventDefault();

        panelAlumnos();

        datos={consulta: 'all' };

        $.post('/admin-alumnos', datos, function(data){
            
            $('.admin .marco .alumnos').html(cargarAlumnos(data));

            //cerrar menu despues del click
            $('.navbar-collapse.in').collapse('hide');
        });
    });



    //envio de formulario de nuevo alumno /nuevo-alumno
    $('.form-nuevo-alumno').on('submit', function(e){
        e.preventDefault();

        $.ajax({

            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function(data) 
            {   
                //alert(data);
                
                $('#crear-alumno').modal('hide');
                $('.alert').html('<strong>Exito!</strong> Alumno registrado correctamente!');
                $('.alert').css({'display':'block'});
                
                setTimeout(function() 
                {
                    $('.alert').fadeOut();

                }, 4000);
            }


        });
    });




    //editar alumnos registrados
    $('.admin .marco').on('click','.alumnos .botones .edit', function(e){


        id=$(this).siblings('p.id').text();
        formalumno=$('#crear-alumno');

        formalumno.find('input.id').val(id);
        
        $.ajax({

            type: 'POST',
            url: '/consulta-alumno',
            data: {id:id},
            success: function(data) 
            {   
                data=eval(data);
                
                formalumno.find('input[name="nombre"]').val(data[0].nombre);
                formalumno.find('input[name="apellido"]').val(data[0].apellido);
                formalumno.find('input[name="fecha"]').val(sqlToDate(data[0].fecha_nac));
                formalumno.find('input[name="documento"]').val(data[0].documento);
                formalumno.find('input[name="estatura"]').val(data[0].estatura);
                formalumno.find('select[name="categoria"]').val(data[0].categoria);
                formalumno.find('input[name="estudios"]').val(data[0].estudios);
                formalumno.find('input[name="lugar"]').val(data[0].lugar_nac);
                formalumno.find('input[name="tel"]').val(data[0].telefono);
                formalumno.find('input[name="peso"]').val(data[0].peso);
                formalumno.find('select[name="tiposangre"]').val(data[0].tipo_sangre);
                formalumno.find('textarea[name="proyeccion"]').val(data[0].proyeccion);

                formalumno.find('h4').text('Editar alumno '+data[0].nombre+' '+data[0].apellido);
                
                //formalumno.modal('show');
            }

        });
        

        $.ajax({

            type: 'POST',
            url: '/consulta-padre_alumno',
            data: {id:id},
            success: function(data) 
            {   
                
                if(data!='error')
                {
                    
                    data=eval(data);

                    if(data.length>1)
                    {
                        
                        var padre=data[1];
                        var madre=data[0];

                        if(data[0].genero=='M')
                        {
                            padre=data[0];
                            madre=data[1];
                        }

                        formalumno.find('input[name="nombrepadre"]').val(padre.nombre);
                        formalumno.find('input[name="nombremadre"]').val(madre.nombre);
                        formalumno.find('input[name="telpadre"]').val(padre.telefono);
                        formalumno.find('input[name="telmadre"]').val(madre.telefono);
                        formalumno.find('input[name="ocupacionpadre"]').val(padre.ocupacion);
                        formalumno.find('input[name="ocupacionmadre"]').val(madre.ocupacion);
                        
                    }
                    else
                    {
                        
                        var p=data[0];
                        
                        if(p.genero=='M')
                        {
                            formalumno.find('input[name="nombrepadre"]').val(p.nombre); 
                            formalumno.find('input[name="telpadre"]').val(p.telefono);                          
                            formalumno.find('input[name="ocupacionpadre"]').val(p.ocupacion);
                            
                            
                        }
                        else
                        {
                            formalumno.find('input[name="nombremadre"]').val(p.nombre);
                            formalumno.find('input[name="telmadre"]').val(p.telefono);
                            formalumno.find('input[name="ocupacionmadre"]').val(p.ocupacion);
                            
                        }

                    }
                }

                formalumno.find('input.id').val(id);
                formalumno.modal('show');
            }

        });
    });





    //eliminar alumnos registrados
    $('.admin .marco').on('click', '.alumnos .botones .remove', function(e){

        id=$(this).siblings('p.id').text();
        formalumno=$('#crear-alumno');
        
        $.ajax({

            type: 'POST',
            url: '/consulta-alumno',
            data: {id:id},
            success: function(data1) 
            {   
                data1=eval(data1);

                var res=confirm('Desea eliminar al alumno: '+data1[0].nombre+'?');

                if(res)
                {
                    $.post('/eliminar-alumno', {id:id},function(data2){
                        alert('Alumno '+data1[0].nombre+' eliminado correctamente!');
                    });
                }

            }

        });
    });


    $('.admin .marco').on('click', '.alumnos .botones .pay', function(e){

        
        id=$(this).siblings('p.id').text();
        formpago=$('#crear-pago');
        
        $.ajax({

            type: 'POST',
            url: '/consulta-alumno',
            data: {id:id},
            success: function(data1) 
            {   
                data1=eval(data1);
                
                edad=new Date(data1[0].fecha_nac);  
                edad=getEdad(edad);
                v='';
                

                nombre='<h5>Nombre: '+data1[0].nombre+' '+data1[0].apellido+'</h5>';
                doc='<h5>Documento: '+data1[0].documento+'</h5>';
                edad='<h5>Edad: '+edad+' años</h5>';
                fechapago=data1[0].pago;
                pago=getEstadoPago(fechapago);
                ultimopago=fechapago==null?'nunca':getFecha(new Date(fechapago));
                if(pago=='pagado')
                {
                    pago='<h5 style="color:green;">Estado del mes de '+getMes()+': '+pago+'</h5>';
                    ultimopago='<h5 style="color:green;">Ultimo pago: '+ultimopago+'</h5>';
                    $('#crear-pago #enviar').css({'display':'none'});
                }
                else
                {
                    pago='<h5 style="color:red;">Estado del mes de '+getMes()+': '+pago+'</h5>';
                    v='<h5>Desea registrar el pago del mes de '+getMes()+
                    ' para el alumno '+data1[0].nombre+' '+data1[0].apellido+'?</h5>';
                    ultimopago='<h5 style="color:red;">Ultimo pago: '+ultimopago+'</h5>';
                    $('#crear-pago #enviar').css({'display':'inline-block'});
                }

                res=nombre+doc+edad+pago+ultimopago+'<br>'+v;

                

                res='<div class="col-xs-12">'+res+'</div>';

                $('#crear-pago .modal-body').html(res);
             
                $('#crear-pago').find('input.id').val(id);

                $('#crear-pago').modal('show');

               

            }

        });
    });


    $('.form-nuevo-pago').on('submit', function(e){

        e.preventDefault();

        id=$(this).find('input.id').val();
        

        $.post('/registrar-pago', {id:id}, function(data){

            $('#crear-pago').modal('hide');
            $('.alert').html('<strong>Exito!</strong> Pago registrado exitosamente!');
            $('.alert').css({'display':'block'});
            
            setTimeout(function() 
            {
                $('.alert').fadeOut();

            }, 4000);

        });
    });







    //funcion para filtrar los alumnos por el nombre (search bar)
    $('.admin .marco').on('keyup', '#buscaralumno', function(e){



        //if((e.which>=65 && e.which<=90) || e.which==8 || e.which==32)
            var res=($(this).val());
        if(res.match(/^[a-zA-Z\s]+$|^$/))
        {
                console.log('letra= '+e.which);

            var datos={consulta: res.trim()};

            $.post('/admin-alumnos', datos, function(data){
                
                $('.admin .marco .alumnos').html(cargarAlumnos(data));

            });
                
        }
    });

});