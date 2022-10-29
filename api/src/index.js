// Dependencias
const express = require('express');
const app = express();
const morgan = require('morgan');
const fetch = require('node-fetch');
const cors = require('cors');


// Constructor
/*
function pokemon(id, nombre, altura, peso, tipo, forma, habilidades, ubicacion, sprite){
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.tipo = tipo;
    this.forma = forma;
    this.habilidades = habilidades;
    this.ubicacion = ubicacion;
    this.sprite = sprite;
}
*/

// Fetch desde la API
/*
app.get('/pokemon/:id', (req, res) =>{
    let id = req.params.id;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    //.then((data) => res.json(data));
    .then((data) => {
        pokemonData = new pokemon(id, data.name, data.height, data.weight, data.types, data.forms, data.abilities, data.location_area_encounters, data.sprites.front_default);
        console.log(pokemonData);
        res.json(pokemonData);
    })
});
*/

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Rutas
app.use(require('./routes/pokemon'));

// Empezando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});