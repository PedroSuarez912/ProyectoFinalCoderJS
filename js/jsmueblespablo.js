import {listaProductos,} from "./stock.js";
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

function añadir_aCarrito(id){
  let carriteado = listaProductos.find(i => i.id == id);
  carriteado.meterEnCarrito();
  carrito.push(carriteado);
  tienda(listaProductos);
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
      añadir_aCarrito(i.id, i.mueble)
      Toastify({
        duration:1200,
        text: "Añadiste un producto a tu carrito!",
        className: "info",
      }).showToast();
    })
  })
};

const busqueda = () =>{
  console.log(inputBusqueda.value);

  if(inputBusqueda.value == ""){
    tienda(listaProductos);
  }else{

    let tiendaFiltrada = listaProductos.filter( i => i.mueble.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && i.carrito == false)

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
      añadir_aCarrito(i.id, i.mueble);
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
inputBusqueda.addEventListener("input", () => {
  busqueda();
})

//codigo

tienda(listaProductos);

export{carrito,cantidadEnCarrito,};