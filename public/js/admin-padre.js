



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

            nombre='<h4>Nombre: '+nombre+' '+apellido+'</h4>';

            doc='<p>Documento: '+doc+'</p>';

            categoria='<p>Categoria: '+categoria+'</p>';

            edad='<p>Edad: '+edad+' años</p>';

            alumno='<div class="col-xs-12 col-sm-4">'+
                        nombre+
                        doc+                                
                    '</div>'+

                    '<div class="col-xs-12 col-sm-4">'+
                        edad+
                        categoria+
                    '</div>'+

                    '<div class="col-xs-12 col-sm-4">'+
                        '<div class="botones">'+
                            alumnoid+
                            '<span class="icon-edit edit"></span>'+
    
                            '<span class="icon-minus remove"></span>'+

                            '<span class="icon-credit pay"></span>'+
                            
                        '</div>'+

                    '</div>';

            alumno='<div class="row fila-alumno">'+alumno+'</div>';
            res+=alumno;

        }
    }
    else
    {
        res='<h2>No existen alumnos registrados!</h2>';
    }
    return res;
}