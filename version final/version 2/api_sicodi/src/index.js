//IMPORTACIÓN DE DEPENDENCIAS
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

//IMPORTACIÓN DE LAS RUTAS
const usersRoute = require("./routes/usersRoute/usersRoute");
const loginRoute = require("./routes/loginRoute/loginRoute");
const correspondenceRoute = require("./routes/correspondenceRoute/correspondenceRoute");
const filesRoute = require("./routes/filesRoute/filesRoute");
const dependenceRoute = require("./routes/dependenceRoute/dependenceRoute");
const typecorrespondenceRoute = require("./routes/typecorrespondenceRoute/typescorrespondenceRoute");

class Server {
    //CONSTRUCTOR DEL SERVIDOR
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    //CONFIGURACIÓN BÁSICA DEL SERVIDOR
    config() {
        this.app.set('port', process.env.PORT || 3000); //Definir puerto fijo y de respaldo
        this.app.use(morgan('dev')); //Visualizar petición en consola
        this.app.use(cors()); //Peticiones a servidor desde ReactJS
        this.app.use(express.json()); //Interprete de JSON
        this.app.use(express.urlencoded({ extended: false })); //Validar formuarios HTML
    }

    //RUTAS DE LA API
    routes() {
        this.app.use('/api/user', usersRoute); //Rutas de usuarios
        this.app.use('/api/login', loginRoute); //Rutas de login
        this.app.use('/api/correspondence', correspondenceRoute); //Rutas de correspondencia
        this.app.use('/api/files', filesRoute); //Rutas de archivos
        this.app.use('/api/dependence', dependenceRoute); //Rutas de dependencias
        this.app.use('/api/typesco', typecorrespondenceRoute); //Rutas de tipos de correspondencia
    }

    //FUNCIÓN DE ARRANQUE DEL SERVIDOR
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Servidor en puerto: ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();