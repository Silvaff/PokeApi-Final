const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');

// Funcion constructor que almacena los datos del Pokemon
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

// Ruta inicial de la api
router.get('/', (req, res) => {
    res.json({"Title": "Api pokemon"});
});

// Ruta que obtiene una id para la paginacion de Pokemon
router.get('/offset/:id', (req, res) =>{
    let id = req.params.id;
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${id}&limit=10`)
    .then((res) => res.json())
    .then((data) => res.json(data))
});

// Ruta que obtiene una id y busca un Pokemon a traves de ella
router.get('/pokemon/:id', (req, res) =>{
    let id = req.params.id;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        pokemonData = new pokemon(id, data.name, data.height, data.weight, data.types, data.forms, data.abilities, data.location_area_encounters, data.sprites.front_default); //Guarda los datos en el constructor
        console.log(pokemonData);
        res.json(pokemonData);
    })
});

module.exports = router;