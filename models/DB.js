var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'julian21olarte',
   database: 'cañoneros',
   port: 3306
});


//abrir coneccion a la base de datos

  connection.connect(function(error){
    if(error){
          throw error;
    }else{
          console.log('Conexion correcta.');
    }

  });


var consulta=function(consulta, datos, callback)
{
      
      connection.query(consulta, datos, function(err, rows){

         if(err) throw err;
         else if(callback)
         {
            return callback(rows);
         }
      });
}

var consulta2=function(consulta, callback)
{

   connection.query(consulta, function(err, rows){

      if(err) throw err;
      else if(callback)
      {
         return callback(rows);
      }
   });
}


module.exports=
{
   consulta,
   consulta2
};