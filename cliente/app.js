const pokelista = document.getElementById("ListaPoke")
const botones=document.getElementById("botones");
const BusquedaPoke=document.getElementById("BusquedaPoke");
var id=0;




function pokemon(id, nombre, altura, peso, tipo, forma, habilidades, ubicacion, sprite){ //Constructor para manipular los datos de los pokemon
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


function paginacion(i){     // Funcion para poder acceder a la pagina anterior y siguiente de los pokemones
  if(i==0){
    id-=10;
    LlamadaApi("http://localhost:3000/offset/"+id);
  }
  if(i==1){
    id+=10;
   LlamadaApi("http://localhost:3000/offset/"+id);
  }
}


function LlamadaApi(url) {
  pokelista.innerHTML="";
    fetch(url)                    //Mediante la funcion fetch realizamos el request a la API creada para obtener acceso a los datos
    .then(res=>res.json())
    .then(res=> {
      for(let i of res.results){
        fetch(i.url)
          .then(x=>x.json())
          .then(x=>{
            let tipo="";
            x.types.forEach(element => {        //Mediante la utilidad forEach() accedemos de forma individual a los objetos que se encuentran dentro de los arreglos de JSON
              tipo+=`<br>${element.type.name}`;  //Para poder almacenar dicha informacion en una variable que posteriormente sera desplegada en pantalla.
            });
            let formas="";
            x.forms.forEach(element =>{       //Mediante la utilidad forEach() accedemos de forma individual a los objetos que se encuentran dentro de los arreglos de JSON
              formas+=`<br>${element.name}`;  //Para poder almacenar dicha informacion en una variable que posteriormente sera desplegada en pantalla.
            });
            let habilidades="";
            x.abilities.forEach(element =>{   //Mediante la utilidad forEach() accedemos de forma individual a los objetos que se encuentran dentro de los arreglos de JSON
              habilidades+=`<br>${element.ability.name} `;  //Para poder almacenar dicha informacion en una variable que posteriormente sera desplegada en pantalla.
            });

          //Mediante la utilidad innerHTML desplegamos en pantalla los datos del pokemon.
            pokelista.innerHTML+= `<div class="card" >
            <img src="${x.sprites.front_default}">
              <div class="card-body">
                <h5 class="card-title" align="center">${x.name}</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${x.id}</li>
                  <li class="list-group-item">Altura: ${x.height/10} m</li>
                  <li class="list-group-item">Peso: ${x.weight/10} Kg</li>
                  <li class="list-group-item">Tipo: ${tipo} </li>        
                  <li class="list-group-item">Formas: ${formas}</li>  
                  <li class="list-group-item">Habilidades: ${habilidades}</li> 
                </ul> 
              </div>
          </div>
          `
          
          });
      };
        // Mostramos Los botones a los enlaces de siguiente o anterior de la paginacion de los pokemones 
        //Boton hacia atrás
        botones.innerHTML = (res.previous) ?`<button type="button" onclick="paginacion(0)" class="btn btn-secondary">Atras</button>` : "";
        
        //Botón hacia adelante
        botones.innerHTML += (res.next) ? `<button type="button" onclick="paginacion(1)" class="btn btn-secondary">Siguiente</button>` : ""; 
  });
}

LlamadaApi(`http://localhost:3000/offset/"${id}`); //Llamada inicial a la funcion LlamadaApi para mostrar los primeros 10 pokemones del listado

function buscar(){
  BusquedaPoke.innerHTML="";
 var idpoke= document.getElementById("pokeid").value;
 fetch(`http://localhost:3000/pokemon/${idpoke}/`)  //Mediante la funcion fetch realizamos el request a la API creada para obtener acceso a los datos
 .then(res=>res.json())
 .then(res=> {
  
  let auxTipo="";
  res.tipo.forEach(element => {      //Mediante la utilidad forEach() accedemos de forma individual a los objetos que se encuentran dentro de los arreglos de JSON
    auxTipo+=`<br> ${element.type.name}`;  //Para poder almacenar dicha informacion en una variable que posteriormente sera desplegada en pantalla.
  });
  let auxForma="";
  res.forma.forEach(element =>{     //Mediante la utilidad forEach() accedemos de forma individual a los objetos que se encuentran dentro de los arreglos de JSON
    auxForma+=`<br> ${element.name}`;  //Para poder almacenar dicha informacion en una variable que posteriormente sera desplegada en pantalla.
  });
  let auxHabilidades="";
  res.habilidades.forEach(element =>{     //Mediante la utilidad forEach() accedemos de forma individual a los objetos que se encuentran dentro de los arreglos de JSON
    auxHabilidades+=` <br>${element.ability.name}`; //Para poder almacenar dicha informacion en una variable que posteriormente sera desplegada en pantalla.
  });
  

  //Mediante la utilidad innerHTML desplegamos en pantalla los datos del pokemon.
  BusquedaPoke.innerHTML+= `
  <img src="${res.sprite}">
    <div class="card-body mr-5 ml-5">
      <h5 class="card-title" align="center">${res.nombre}</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${res.id}</li>
        <li class="list-group-item">Altura: ${res.altura/10} m</li>
        <li class="list-group-item">Peso: ${res.peso/10} Kg</li>
        <li class="list-group-item">Tipo: ${auxTipo} </li>        
        <li class="list-group-item">Formas: ${auxForma}</li>  
        <li class="list-group-item">Habilidades: ${auxHabilidades}</li> 
      </ul> 
    </div>
 `

 })
}
