//IMPORTACIÓN DE DEPENDENCIA DE EXPRESS PARA EL ROUTER
const {Router} = require('express');

//DEFINICIÓN DE CONSTANTE TIPO ROUTER
const router = Router();

//IMPORTACIÓN DE LA CLASE DE BASE DE DATOS
const db = require("../../database");

//======================================================
//Rutas
//======================================================
//POST:
router.post('/insert/:id', (req, res) => {
    const sql = (`INSERT INTO archivos(nombre,extension,fkcorrespondencia) VALUES("${req.body.nombre}","${req.body.extension}", "${req.body.link}", ${req.params.id})`);
        console.log("body:",req.body,"params:",req.params);
        db.query(sql, (error, results) => {
            if(error) throw error;
            res.json(results);
        });
});

//Exportación
module.exports = router;