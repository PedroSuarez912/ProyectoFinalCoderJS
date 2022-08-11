/* import {listaProductos,} from "./stock.js"; */
import{hacerListaCarrito,modalCarrito} from "./modalCarrito.js";
import { abrirImagen } from "./modalImgs.js";
//funciones a utilizar
export function contadorParaBotonCarrito(){
  if(carrito.length != 0){
    cantidadEnCarrito.innerText = carrito.length;
    cantidadEnCarrito.classList.remove("puntitoOculto");
  }else{
    cantidadEnCarrito.classList.toggle("puntitoOculto");
  }
};

export function comprarCarrito(){
  Swal.fire({
    title:"Listo!!!",
    text:"Gracias por comprar en Los Muebles De Pablo",
    icon:"success",
    confirmButtonText:"cerrar",
  });
  carrito = [];
  contadorParaBotonCarrito();
};

function añadir_aCarrito(id,listaDeProductos){
  let carriteado = listaDeProductos.find(i => i.id == id);
  carriteado.meterEnCarrito();
  carrito.push(carriteado);
  tienda(listaDeProductos);
  if(modalCarrito.className == "modalAbierto"){
    hacerListaCarrito();}
  contadorParaBotonCarrito();
}

//DOM
export function tienda(listaDeProductos){
  navTienda.innerHTML = " "
  let productosEnVenta = listaDeProductos.filter( i => i.carrito == false);

  productosEnVenta.forEach( (i) => {
    let carta = document.createElement("div");
    carta.className = "contenedor-carta";
    carta.innerHTML = `
        <div class="carta">
            <h2>${i.mueble}</h2>
            <img id="img${i.id}" src=${i.imagen} alt="">
            <p>${i.precio}<p>
            <button class="botonDeCarta"id="B${i.id}A">Añadir al carrito!</button>
        </div>`;
    navTienda.appendChild(carta);

    let imgClickeable = document.getElementById(`img${i.id}`);
    imgClickeable.addEventListener("click",()=>{
      abrirImagen(i);
    });
  })

  productosEnVenta.forEach((i) => {
    const botonAñadirCarro = document.getElementById(`B${i.id}A`);
    botonAñadirCarro.addEventListener("click",()=>{
      añadir_aCarrito(i.id, listaDeProductos)
      Toastify({
        duration:1200,
        text: "Añadiste un producto a tu carrito!",
        className: "info",
      }).showToast();
    })
  })
};

const busqueda = (listaDeProductos) =>{
  console.log(inputBusqueda.value);

  if(inputBusqueda.value == ""){
    tienda(listaDeProductos);
  }else{

    let tiendaFiltrada = listaDeProductos.filter( i => i.mueble.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && i.carrito == false)

    navTienda.innerHTML = " "
    tiendaFiltrada.forEach(i => {
      let carta = document.createElement("div");
      carta.className = "contenedor-carta";
      carta.innerHTML = `
          <div class="carta">
              <h2>${i.mueble}</h2>
              <img id="img${i.id}" src=${i.imagen} alt="">
              <p>${i.precio}<p>
              <button id="B${i.id}" class="botonDeCarta">Añadir al carrito!</button>
          </div>`;
      navTienda.appendChild(carta);

      const botonAñadirCarro = document.getElementById(`B${i.id}`);
      botonAñadirCarro.addEventListener("click",()=>{
      añadir_aCarrito(i.id, listaDeProductos);
      })
    })
    tiendaFiltrada.forEach(i =>{
      let  imgClickeablBusqueda = document.getElementById(`img${i.id}`);
      imgClickeablBusqueda.addEventListener("click",()=>{
      abrirImagen(i);
      });
    });
 };
};

//vars a utilizar
let carrito = [];
const navTienda =  document.getElementById("nav");

let cantidadEnCarrito = document.getElementById("contadorCarrito"); 

// llamo al boton x su id y le agrego un listener
let inputBusqueda = document.getElementById("inBusqueda");


//codigo
const fetcheado = async() =>{
  try {
    const fetchDeBD = await fetch("js/stock.json");
    const listBD =await fetchDeBD.json();
    inputBusqueda.addEventListener("input", () => {
      busqueda(listBD);
    })
    tienda(listBD);
  } catch (error) {
    console.log(error);
  }
}

fetcheado();

export{carrito,cantidadEnCarrito};