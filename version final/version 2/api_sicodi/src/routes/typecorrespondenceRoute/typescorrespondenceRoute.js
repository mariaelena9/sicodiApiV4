//IMPORTACIÓN DE DEPENDENCIA DE EXPRESS PARA EL ROUTER
const {Router} = require('express');

//DEFINICIÓN DE CONSTANTE TIPO ROUTER
const router = Router();

//IMPORTACIÓN DE LA CLASE DE BASE DE DATOS
const db = require("../../database")

//Rutas

//POST:
router.get('/gettypes', (req, res) => {
    const sql = (`SELECT * FROM TipoCorrespondencia`)
    db.query(sql, (error, results ) => {
        if(error) throw error;
            if(results.length > 0){
                res.json(results)
            }else{
                res.send('Sin resultados');
            }
    });
});

//Exportacion
module.exports = router;