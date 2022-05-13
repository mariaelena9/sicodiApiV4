//IMPORTACIÓN DE DEPENDENCIA DE EXPRESS PARA EL ROUTER
const {Router} = require('express');

//DEFINICIÓN DE CONSTANTE TIPO ROUTER
const router = Router();

//IMPORTACIÓN DE LA CLASE DE BASE DE DATOS
const db = require("../../database")

//======================================================
//Rutas
//======================================================
//GET:
router.get('/getdependence', (req, res) => {
    const sql = (`SELECT * FROM Dependencias`)
    db.query(sql, (error, results ) => {
        if(error) throw error;
            if(results.length > 0){
                res.json(results)
            }else{
                res.send('Sin resultados');
            }
    });
});

//Exportación
module.exports = router;