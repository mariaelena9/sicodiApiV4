//IMPORTACIÓN DE DEPENDENCIA MYSQL
const mysql = require('mysql');

//CONSTANTE DE CONEXIÓN A LA BASE DE DATOS
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sicodi'
});

//VERIFICACIÓN DE CONEXIÓN A LA BD
connection.connect(error => {
    if (error) throw error
    console.log('Conexion exitosa');
})

module.exports = connection;