const mysql2 = require('mysql2')
require('dotenv').config();
const connection = mysql2.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
})
connection.connect((err)=>{
    if (err) {
        console.error('Error al conectarse a la base de datos', err)
    return;
    }
    console.log('conexion exitosa  ')
    connection.end();
})
