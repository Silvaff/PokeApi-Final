const { Router } = require('express');
const router = Router();

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

router.get('/', (req, res) => {
    res.json({"Title": "Api pokemon"});
});

/*
router.get('/pokemon/', (req, res) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=905`)
    .then((res) => res.json())
    .then((data) => res.json(data.results))
});
*/

router.get('/offset/:id', (req, res) =>{
    let id = req.params.id;
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${id}&limit=10`)
    .then((res) => res.json())
    .then((data) => res.json(data))
});

router.get('/pokemon/:id', (req, res) =>{
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

module.exports = router;