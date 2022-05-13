//IMPORTACIÓN DE DEPENDENCIA DE EXPRESS PARA EL ROUTER
const {Router} = require('express');

//DEFINICIÓN DE CONSTANTE TIPO ROUTER
const router = Router();

//IMPORTACIÓN DE LA CLASE DE BASE DE DATOS
const db = require("../../database")

//GET por correo:
router.get('/getcredentials/:email/:password', (req, res) => {
    const sql = (`SELECT u.idusuario, u.nombre, u.apPaterno, u.apMaterno, u.email, u.fkrol, u.cargo,
                d.fkdependencia FROM usuarios u INNER JOIN departamentos d ON d.iddpto = u.fkdpto 
                WHERE email = "${req.params.email}" AND password = "${req.params.password}"`)
    db.query(sql, (error, results ) => {
        if(error) throw error;
            if(results.length > 0){
                res.json(results[0])
            }else{
                res.send('Usuario no registrado');
            }
    });

});

//Exportacion
module.exports = router;