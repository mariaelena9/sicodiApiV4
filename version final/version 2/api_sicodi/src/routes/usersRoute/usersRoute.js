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
router.get('/getuser', (req, res) => {
    const sql = (`select * from usuarios`);
    db.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results)
        } else {
            res.send('Sin resultados');
        }
    });
});

//GET por id:
router.get('/getuser/:id', (req, res) => {
    const sql = (`select u.idusuario, CONCAT(u.nombre, " ", u.apPaterno, " ", u.apMaterno) AS "UserName", u.telefono, u.email, u.cargo, dpto.nombre AS "Departamento", d.iddependencia, d.nombre AS "Dependencia" from usuarios u inner join departamentos dpto ON dpto.iddpto = u.fkdpto inner join dependencias d ON d.iddependencia=dpto.fkdependencia where idusuario = ${req.params.id}`)
    db.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0])
        } else {
            res.send('Sin resultados');
        }
    });
});

//GET por dependencia
router.get('/getUserByDep/:id', (req, res) => {
    const sql = (`SELECT u.idusuario, u.nombre, u.apPaterno, u.apMaterno, u.email FROM usuarios u 
                INNER JOIN departamentos d ON d.iddpto = u.fkdpto WHERE d.fkdependencia = ${req.params.id}`);
    db.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Sin resultados');
        }
    });
});

//POST:
router.post('/insertuser', (req, res) => {
    const sql = (`insert into usuarios set ? `)
    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellidos,
        correo: req.body.correo
    }

    db.query(sql, usuario, (error) => {
        if (error) throw error;
        res.send('Insert exitoso')
    });
});


//Exportacion
module.exports = router;