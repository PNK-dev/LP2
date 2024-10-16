const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'dbnode'
});
connection.connect((err)=>{
    if(err){
        console.log("Error de conexion a MYSQL: ", err);
        return;
    }else{
        console.log("Conectado a BD MYSQL")
        return;
    }
});