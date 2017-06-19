

var express=require('express'),
	path=require('path'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	database=require('./models/DB'),
	nodemailer = require('nodemailer'),
	sgTransport = require('nodemailer-sendgrid-transport'),
	fs=require('fs'),
	multer=require('multer'),
	storage = multer.diskStorage({
	    destination: function (req, file, cb) {
	        cb(null, './public/imagesUpload/');
	    },
	    filename: function (req, file, cb) {
	        cb(null, Date.now() + '-' + file.originalname);
	  }
	}),
	upload =  multer({ storage: storage });
	
var app=express();


app.use(express.static("public"));
app.use(session({secret: 'ssshhhhh', resave: 'false', saveUninitialized: 'false'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(favicon(__dirname + '/public/images/favicon.ico'));





app.get("/", function(req, res){
	
       res.sendFile(__dirname + '/views//index.html');
});

app.get("/controllers", function(req, res){
	
       res.sendFile(__dirname + '/controllers');
});






/*************login del admin***************/
var ses,contraseña,usuario;
app.post("/login-submit", function(req, res){

	

	usuario=req.body.nombre;
	contraseña=req.body.contraseña;

	console.log('usuario= '+usuario);
	console.log('contraseña= '+contraseña);

	req.session.usuario=usuario;
	req.session.contraseña=contraseña;


	var consulta='SELECT * FROM admin WHERE usuario= ? AND contraseña= ?;';
	datos=[usuario, contraseña];
	database.consulta(consulta, datos, function(rows){
		if(rows.length>0)
		{
			res.send('exito');
		}
		else
		{
			res.send('error');
		}
	});

});




//cargar noticias previews
app.post('/noticias_index', function(req, res){
	

	var consulta="SELECT n.id as noticiaid, n.titulo, n.cuerpo, unix_timestamp(n.fecha) as fecha, i.nombre "+
				"FROM noticia n inner join "+
				"imagen i on i.noticia=n.id ORDER BY n.id DESC;";

	database.consulta2(consulta, function(rows){

		if(rows.length>0)
		{
			res.send(JSON.stringify(rows));
		}
		else
		{
			res.send('error');
		}
	});

});



//cargar noticias modulo admin
app.post('/admin-noticias', function(req, res){

	


	var consulta=req.body.consulta;
	if(consulta=='all')
	{
		consulta="SELECT n.id as noticiaid, n.titulo, n.cuerpo, unix_timestamp(n.fecha) as fecha, i.nombre "+
				"FROM noticia n inner join "+
				"imagen i on i.noticia=n.id ORDER BY n.id DESC;";
	}
	else
	{
		consulta="SELECT n.id as noticiaid, n.titulo, n.cuerpo, unix_timestamp(n.fecha) as fecha, i.nombre "+
				"FROM noticia n inner join "+
				"imagen i on i.noticia=n.id WHERE n.titulo like '%"+consulta+"%' ORDER BY n.id DESC;";

	}


	database.consulta2(consulta, function(rows){

		if(rows.length>0)
		{
			res.send(JSON.stringify(rows));
		}
		else
		{
			res.send('error');
		}
	});


});


//cargar alumnos modulo admin
app.post('/admin-alumnos', function(req, res){

	consulta=req.body.consulta;
	if(consulta=='all')
	{
		consulta="SELECT a.id as alumnoid, a.nombre, a.apellido, a.fecha_nac, a.documento, c.nombre as categoria "+
					"FROM alumno a inner join categoria c on a.categoria=c.id ORDER BY a.apellido, a.nombre;";

	}
	else
	{
		consulta="SELECT a.id as alumnoid, a.nombre, a.apellido, a.fecha_nac, a.documento, c.nombre as categoria "+
					"FROM alumno a inner join categoria c on a.categoria=c.id WHERE CONCAT(a.nombre,' ', a.apellido) like '%"+consulta+"%' ORDER BY a.apellido, a.nombre;";

	}


	database.consulta2(consulta, function(rows){

		if(rows.length>0)
		{
			res.send(JSON.stringify(rows));
		}
		else
		{
			res.send('error');
		}
	});
});



/***************enviar correo contacto************/
app.post('/mail', function(req, res){
	nombre=req.body.nombre;
	correo=req.body.correo;
	telefono=req.body.telefono;
	asunto=req.body.asunto;
	cuerpomail=req.body.cuerpomail;

	cuerpomail='Nombre: '+nombre+'\nTelefono: '+telefono+'\nCorreo: '+correo+'\n\n'+cuerpomail;
	

	var respuesta='exito';

	mailer = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'julian21olarte@gmail.com',
	        pass: 'explosiondegalaxias',
	    },
	});

	var options={
		from: correo,
		to: 'julian21olarte@gmail.com',
		subject: asunto,
		text: cuerpomail
	}

	mailer.sendMail(options, function(error, response)
	{
		if (error) {
			respuesta='error';
		}
	});
     res.send(respuesta);
});




app.post('/leernoticia', function(req, res){

	

	var consulta="SELECT n.titulo, n.cuerpo, unix_timestamp(n.fecha) as fecha, i.nombre "+
				"FROM noticia n inner join "+
				"imagen i on i.noticia=n.id "+
				"WHERE n.id="+req.body.id+";";

	database.consulta2(consulta, function(rows){

		if(rows.length>0)
		{
			res.send(JSON.stringify(rows));
		}
		else
		{
			res.send('error');
		}
	});

});




//registrar noticias nuevas en la base de datos
var titulo, cuerpo, imagen, ext;
app.post('/nueva-noticia', upload.single('imagenes'), function(req, res, next){

	
	titulo=req.body.titulo;
	cuerpo=req.body.cuerponoticia;
	imagen=req.file;
	id=req.body.idnoticia;


	if(id=='new')
	{
		console.log('entra a new');
		consulta="insert into noticia(titulo, cuerpo, fecha) values(?, ?, curdate());";

		datos=[titulo, cuerpo];

		database.consulta(consulta, datos, function(rows){

			if(imagen!=undefined)
			{
				idnoticia=rows.insertId;
				consulta="insert into imagen(nombre, noticia) values(?, ?);";
				datos=[imagen.filename, idnoticia];

				database.consulta(consulta, datos, function(rows){
				
				});
			}
		});
		res.send('exito');
	}
	else
	{

		console.log('entra al else');
		consulta="SELECT i.nombre, i.id FROM noticia n inner join imagen i on i.noticia=n.id WHERE n.id=?;";
		datos=[id];

		database.consulta(consulta,datos, function(rows){
			if(rows.length>0)
			{
				if(imagen1=undefined)
				{
					fs.unlink('./public/imagesUpload/'+rows[0].nombre);
					consulta="UPDATE imagen i set i.nombre=? WHERE i.id=?;";
					datos=[imagen.filename, rows[0].id];
					database.consulta(consulta, datos, function(rows){

					});

				}
				consulta="UPDATE noticia n set n.titulo=?, n.cuerpo=? WHERE n.id=?;";
				datos=[titulo, cuerpo, idnoticia];
				database.consulta(consulta, datos, function(rows){

					database.consulta(consulta,datos,function(rows){
						res.send('exito')
					});

				});
			}
			else
			{
				res.send('error');
			}

		});
		
	}

});




//registrar nuevo alumno en la base de datos
app.post('/nuevo-alumno', function(req, res){

	var nombre=req.body.nombre;
	var apellido=req.body.apellido;
	var lugar=req.body.lugar;
	var fecha=req.body.fecha;
	var documento=req.body.documento;
	var estatura=req.body.estatura;
	var peso=req.body.peso;
	var telefono=req.body.tel;
	var categoria=req.body.categoria;
	var estudios=req.body.estudios;
	var proyeccion=req.body.proyeccion;
	var tiposangre=req.body.tiposangre;
	var exist=false;
	var consulta;

	console.log(nombre+' '+apellido+' '+lugar+' '+fecha+' '+documento+' '+estatura+' '+peso+' '+telefono+
		' '+categoria+' '+estudios+' '+proyeccion+' '+tiposangre);

	consulta="SELECT a.id as id FROM alumno a WHERE a.nombre=? AND a.documento=?;";
	datos=[nombre, documento];
	database.consulta(consulta, datos, function(rows){

		alumno=rows[0].id;
		if(rows.length>0)
		{
			consulta="UPDATE alumno a SET a.nombre=?, a.apellido=?, a.lugar_nac=?, a.fecha_nac=?, a.documento=?, "+
			"a.estatura=?, a.peso=?, a.telefono=?, a.categoria=?, a.estudios=?, a.proyeccion=?, a.tipo_sangre=? "+
			"WHERE a.id="+alumno+";";
		}
		else
		{
			consulta="INSERT INTO alumno(nombre, apellido, lugar_nac, fecha_nac, documento, estatura, "+
			"peso, telefono, categoria, estudios, proyeccion, tipo_sangre) "+
			"VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
		}
		datos=[nombre, apellido, lugar, fecha, documento, estatura, peso, telefono, 
	categoria, estudios, proyeccion, tiposangre];

		database.consulta(consulta, datos, function(rows){

			nombrepadre=req.body.nombrepadre.trim();
			telpadre=req.body.telpadre.trim();
			ocupacionpadre=req.body.ocupacionpadre.trim();
			nombremadre=req.body.nombremadre.trim();
			telmadre=req.body.telmadre.trim();
			ocupacionmadre=req.body.ocupacionmadre.trim();

			
			if(nombrepadre!='' && telpadre!='' && ocupacionpadre!='')
			{

				
				consulta="SELECT p.nombre FROM padre p inner join padre_alumno pa on pa.padre=p.id and pa.alumno="+
				alumno+" AND p.genero='M';";

				database.consulta2(consulta, function(rows){

					if(rows.length>0)
					{
						consultap="UPDATE padre p inner join padre_alumno pa on pa.padre=p.id and pa.alumno="+
						alumno+" AND p.genero='M' set nombre=?, telefono=?, ocupacion=?;";
						
						exist=true;
					}
					else
					{
						consultap="INSERT INTO padre(nombre, telefono, ocupacion, genero) values(?, ?, ?, 'M');";
						
						exist=false;
					}

					datos=[nombrepadre, telpadre, ocupacionpadre];

					database.consulta(consultap, datos, function(rowsp){

						if(!exist)
						{
							consulta="insert into padre_alumno(padre, alumno) values(?, ?);";
							datos=[rowsp.insertId, alumno];
							database.consulta(consulta, datos, function(rows){
								
							
							});
						}
					});

				});
					
			}

			if(nombremadre!='' && telmadre!='' && ocupacionmadre!='')
			{

				consulta="SELECT p.nombre FROM padre p inner join padre_alumno pa on pa.padre=p.id and pa.alumno="+
				alumno+" AND p.genero='F';";

				database.consulta2(consulta, function(rows){
					
					if(rows.length>0)
					{
						consultam="UPDATE padre p inner join padre_alumno pa on pa.padre=p.id and pa.alumno="+
						alumno+" AND p.genero='F' set nombre=?, telefono=?, ocupacion=?;";
						exist=true;
					}
					else
					{
						consultam="INSERT INTO padre(nombre, telefono, ocupacion, genero) values(?, ?, ?, 'F');";
						exist=false;	
					}


					datos=[nombremadre, telmadre, ocupacionmadre];

					database.consulta(consultam, datos, function(rowsm){
						
						if(!exist)
						{
							consulta="insert into padre_alumno(padre, alumno) values(?, ?);";
							datos=[rowsm.insertId, alumno];
							database.consulta(consulta, datos, function(rows){
								
								
							});
						}
					});
				});

			}

			res.send('exito');


		});

	});	
});





//cargar combobox select categoria formulario de nuevo alumno.
app.post('/cargar-categoria', function(req, res){

	var consulta="select id, nombre, edad_min, edad_max from categoria;";

	database.consulta2(consulta, function(rows){

		if(rows.length>0)
		{
			res.send(JSON.stringify(rows));
		}
		else
		{
			res.send('error');
		}
	});
});




//consultar los datos de un alumno determinado
app.post('/consulta-alumno', function(req, res){

	var id=req.body.id;
	
	var consulta="select a.*, MAX(p.fecha_pago) as pago from alumno a left join pago p on a.id=p.alumno where a.id="+id+";";

	database.consulta2(consulta, function(rows){
		if(rows.length>0)
		{
			res.send(JSON.stringify(rows));
		}
		else
		{
			res.send('error');
		}
	});
});



app.post('/consulta-noticia', function(req, res){

	idnoticia=req.body.id;

	consulta="SELECT n.titulo, n.cuerpo "+
				"FROM noticia n "+
				"WHERE n.id=?;";
	datos=[idnoticia];

	database.consulta(consulta, datos, function(rows){
		if(rows.length>0)
		{
			
			res.send(JSON.stringify(rows));
		}
		else
		{
			
			res.send('error');
		}

	});


});



//consultar los padres de un alumno determinado
app.post('/consulta-padre_alumno',function(req, res){

	
	consulta="select p.nombre, p.ocupacion, p.telefono, p.genero from padre p inner join padre_alumno pa on pa.padre=p.id and "+
	"pa.alumno=?;";
	datos=[req.body.id];
	database.consulta(consulta, datos, function(rows){
		
		if(rows.length>0)
		{
			
			res.send(JSON.stringify(rows));
		}
		else
		{
			
			res.send('error');
		}
	});
});





app.post('/eliminar-alumno', function(req, res){

	consulta="delete from alumno where id=?;";
	datos=[req.body.id];

	console.log('elimina al alumno= '+req.body.id);
	database.consulta(consulta, datos, function(rows){
		res.send('exito');
	});
});






app.post('/eliminar-noticia', function(req, res){


	idnoticia=req.body.id;

	consulta="SELECT i.nombre, i.id FROM noticia n inner join imagen i on i.noticia=n.id WHERE n.id=?;";
	datos=[idnoticia];

	database.consulta(consulta, datos, function(rows){

		fs.unlink('./public/imagesUpload/'+rows[0].nombre);

	});

	consulta="DELETE FROM imagen WHERE noticia=?;";
	datos=[idnoticia];

	database.consulta(consulta, datos, function(rows){

	});



	consulta="delete from noticia where id=?;";
	datos=[idnoticia];

	console.log('elimina al alumno= '+req.body.id);

	database.consulta(consulta, datos, function(rows){
		res.send('exito');
	});
});





app.post('/registrar-pago', function(req, res){

	id=req.body.id;

	console.log('alumno= '+id);

	consulta="INSERT INTO pago(alumno, fecha_pago) values(?, curdate());";
	datos=[id];

	database.consulta(consulta, datos, function(rows){
		res.send('exito');
	});
});


//////////////////peticones GET///////////////////////////////






/**************pagina de administrador***********/
app.get("/Admin", function(req, res){

	if(typeof req.session.usuario!='undefined' && typeof req.session.contraseña!='undefined')
	{	
		
		 res.sendFile(__dirname+'/views/admin.html');
	}
	else
	{
		 res.redirect('/');
	}
});




/*******************salir de la pagina del administrador***********/
app.get('/salir', function(req,res){

	delete req.session.usuario;
	delete req.session.contraseña;
	 res.redirect('/');
});






/***************pagina de noticias***************/
app.get('/Noticias', function(req, res){

	 res.sendFile(__dirname+'/views/noticias.html');
});



/***************contacto de la pagina**************/
app.get('/Contacto', function(req, res){

	 res.sendFile(__dirname+'/views/contacto.html');
});



app.get('/Noticia', function(req, res){
	 res.sendFile(__dirname+'/views/noticia.html');
});

app.get('/Inscripciones', function(req, res){
	 res.sendFile(__dirname+'/views/inscripciones.html');
});




app.get('/admin-noticias', function(req, res){
	 res.sendFile(__dirname+'/views/admin-noticias.html');
});



app.get('/docinscripciones', function(req, res){

	res.download(__dirname+'/public/docs/docinscripciones.doc');
});


app.listen(8080);
console.log('corriendo!');