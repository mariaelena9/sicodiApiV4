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
router.post('/insert', (req, res) => {
    const sql = (`INSERT INTO correspondencia(fechaEmisión, fechaRecepción, fk_DependenciaO, fk_UsuarioO, 
        fk_DependenciaD, fk_UsuarioD, fk_TipoCo, asunto, descripción, observaciones, fk_estatusco, leida, formato, numOficio) 
        VALUES("${req.body.fechaEmisión}", "${req.body.fechaRecepción}", "${req.body.fk_DependenciaO}", 
        "${req.body.fk_UsuarioO}", "${req.body.fk_DependenciaD}", "${req.body.fk_UsuarioD}", 
        "${req.body.fk_TipoCo}", "${req.body.asunto}", "${req.body.descripción}", "${req.body.observaciones}", 
        2, 0, "${req.body.formato}", "${req.body.numOficio}")`);
        
        db.query(sql, (error, results) => {
            if(error) res.send(error.code);
            res.json(results);
            console.log(results);
        });
});

//Poner como leída una correspondencia
router.put('/setRead/:id', (req, res) => {
    const sql = (`UPDATE correspondencia SET leida = 1 WHERE id_Correspondencia = ${req.params.id}`);
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
});

//GET:
router.get('/getAll', (req, res) => {
    const sql = ("SELECT c.id_Correspondencia, CONCAT(u.nombre,' ',u.apPaterno,' ',u.apMaterno) AS 'usuarioD',c.asunto, c.descripción, c.formato FROM correspondencia c INNER JOIN usuarios u ON u.idusuario=c.fk_UsuarioD");
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
});

//GET todos los enviados por determinado usuario
router.get('/getSent/:id', (req, res) => {
    const sql = (`SELECT c.id_Correspondencia, c.fechaEmisión, CONCAT(u.nombre,' ',u.apPaterno,' ',u.apMaterno) AS 'usuarioD',c.asunto, c.descripción, c.formato, ce.nombre AS 'estatus', c.leida, fk_estatusco, fk_TipoCo FROM correspondencia c INNER JOIN usuarios u ON u.idusuario=c.fk_UsuarioD INNER JOIN correstatus ce ON ce.idestatusco = c.fk_estatusco WHERE c.fk_UsuarioO = ${req.params.id} ORDER BY c.fechaEmisión`);
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
});

//GET todos los recibidos por determinado usuario
router.get('/getReceived/:id', (req, res) => {
    const sql = (`SELECT c.id_Correspondencia, c.fechaEmisión, c.fechaRecepción, CONCAT(u.nombre,' ',u.apPaterno,' ',u.apMaterno) AS 'usuarioO',c.asunto, c.descripción, c.formato, tc.nombre AS 'tipo', c.leida, fk_estatusco, fk_TipoCo FROM correspondencia c INNER JOIN usuarios u ON u.idusuario=c.fk_UsuarioO INNER JOIN tipocorrespondencia tc ON tc.idtipo = c.fk_TipoCo WHERE c.fk_UsuarioD = ${req.params.id} ORDER BY c.leida ASC`);
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
});

//GET información completa de correspondencia por ID
router.get('/getDetail/:id', (req, res) => {
    const sql = (`SELECT c.id_Correspondencia, c.numOficio, c.fechaEmisión, c.fechaRecepción, dpd.nombre AS 'dependenciaDestinatario', CONCAT(ud.nombre,' ',ud.apPaterno,' ',ud.apMaterno) AS 'destinatario', dpo.nombre AS 'dependenciaRemitente', CONCAT(ur.nombre,' ',ur.apPaterno,' ',ur.apMaterno) AS 'remitente', tc.idtipo , tc.nombre, c.asunto, c.descripción, c.observaciones, c.formato, c.leida`
    + ` FROM correspondencia c`
    + ` INNER JOIN usuarios ud ON ud.idusuario=c.fk_UsuarioD`
    + ` INNER JOIN usuarios ur ON ur.idusuario=c.fk_UsuarioO`
    + ` INNER JOIN dependencias dpo ON dpo.iddependencia = c.fk_DependenciaO`
    + ` INNER JOIN dependencias dpd ON dpd.iddependencia = c.fk_DependenciaD`
    + ` INNER JOIN tipocorrespondencia tc ON tc.idtipo = c.fk_TipoCo`
    + ` WHERE c.id_Correspondencia = ${req.params.id}`);
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results[0]);
    });
})

//GET todos los enviados por determinado usuario
router.get('/filterSent/:estatus/:id', (req, res) => {
    const sql = (`SELECT c.id_Correspondencia, c.fechaEmisión, CONCAT(u.nombre,' ',u.apPaterno,' ',u.apMaterno) AS 'usuarioD',c.asunto, c.descripción, c.formato, ce.nombre AS 'estatus', c.leida FROM correspondencia c INNER JOIN usuarios u ON u.idusuario=c.fk_UsuarioD INNER JOIN correstatus ce ON ce.idestatusco = c.fk_estatusco WHERE c.fk_estatusco = ${req.params.estatus} AND c.fk_UsuarioO = ${req.params.id} ORDER BY c.leida ASC`);
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
});

//GET todos los recibidos por determinado usuario
router.get('/filterReceived/:tipo/:fecha/:depO/:id', (req, res) => {
    const sql = (`SELECT c.id_Correspondencia, c.fechaEmisión, CONCAT(u.nombre,' ',u.apPaterno,' ',u.apMaterno) AS 'usuarioO',c.asunto, c.descripción, c.formato, tc.nombre AS 'estatus', c.leida FROM correspondencia c INNER JOIN usuarios u ON u.idusuario = c.fk_UsuarioO INNER JOIN tipocorrespondencia tc ON tc.idtipo = c.fk_TipoCo WHERE c.fk_TipoCo = ${req.params.tipo} AND c.fechaEmisión = ${req.params.fecha} AND c.fk_DependenciaO = ${req.params.depO} AND c.fk_UsuarioD = ${req.params.id} ORDER BY c.leida ASC`);
    db.query(sql, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
});

//Exportación
module.exports = router;