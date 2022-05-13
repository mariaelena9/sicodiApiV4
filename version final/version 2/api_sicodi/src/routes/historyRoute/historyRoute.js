//IMPORTACIÓN DE DEPENDENCIA DE EXPRESS PARA EL ROUTER
const {Router} = require('express');

//DEFINICIÓN DE CONSTANTE TIPO ROUTER
const router = Router();

//IMPORTACIÓN DE LA CLASE DE BASE DE DATOS
const db = require("../../database")

//POST:
//Insertar una nueva acción sobre la correspondencia
router.post('/insertAction', (req, res) => {
    const sql = (`INSERT INTO history(fk_Correspondencia, fk_usuario, actiondate, actiontype) 
        VALUES(${req.body.fk_Correspondencia}, ${req.body.fk_usuario}, ${req.body.actiontype})`);
        
    db.query(sql, (error, results ) => {
        if(error) throw error;
        res.send(results);
    });
});

//GET:
//Obtener el historial de determinada correspondencia por ID
router.get('/getHistoryById/:id', (req, res) => {
    const sql = (`SELECT * FROM history WHERE fk_Correspondencia = ${req.params.id}`);
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
})