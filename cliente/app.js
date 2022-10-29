const pokelista = document.getElementById("ListaPoke")
const botones=document.getElementById("botones");
const BusquedaPoke=document.getElementById("BusquedaPoke");
var id=0;




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


function paginacion(i){
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
    fetch(url)
    .then(res=>res.json())
    .then(res=> {
      for(let i of res.results){
        fetch(i.url)
          .then(x=>x.json())
          .then(x=>{
            let tipo="";
            x.types.forEach(element => {
              tipo+=`<br>${element.type.name}`;
            });
            let formas="";
            x.forms.forEach(element =>{
              formas+=`<br>${element.name}`;
            });
            let habilidades="";
            x.abilities.forEach(element =>{
              habilidades+=`<br>${element.ability.name} `;
            });


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

LlamadaApi(`http://localhost:3000/offset/"${id}`);

function buscar(){
  BusquedaPoke.innerHTML="";
 var idpoke= document.getElementById("pokeid").value;
 fetch(`http://localhost:3000/pokemon/${idpoke}/`)
 .then(res=>res.json())
 .then(res=> {
  
  let auxTipo="";
  res.tipo.forEach(element => {
    auxTipo+=`<br> ${element.type.name}`;
  });
  let auxForma="";
  res.forma.forEach(element =>{
    auxForma+=`<br> ${element.name}`;
  });
  let auxHabilidades="";
  res.habilidades.forEach(element =>{
    auxHabilidades+=` <br>${element.ability.name}`;
  });
  
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
