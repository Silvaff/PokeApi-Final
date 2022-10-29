// Dependencias
const express = require('express'); //Entorno de trabajo para aplicaciones web
const app = express();
const morgan = require('morgan'); //Middleware de nivel de solicitud HTTP
const cors = require('cors'); //Paquete de node js que provee un middleware a coneccion/express

// Configuraciones
app.set('port', process.env.PORT || 3000); //Inicia el servidor segun el archivo .env o en el puerto 3000
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Rutas
app.use(require('./routes/pokemon'));

// Empezando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});