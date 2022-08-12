import{ hacerListaCarrito,modalCarrito} from "./modalCarrito.js";
import { abrirImagen } from "./modalImgs.js";
//vars
let carrito = [];
const navTienda =  document.getElementById("nav");
let listBD = [];
let cantidadEnCarrito = document.getElementById("contadorCarrito"); 
let inputBusqueda = document.getElementById("inBusqueda");

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
  carriteado.carrito = true;
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
  if(inputBusqueda.value == ""){
    tienda(listaDeProductos);
  }else{
    let tiendaFiltrada = listaDeProductos.filter( i => i.mueble.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && i.carrito == false)
//dom
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
//evento añadir carrito
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
const fetcheado = async() =>{
  try {
    const fetchDeBD = await fetch("js/stock.json");//peticion(promise)
    listBD =await fetchDeBD.json();//continuacion de promise
    return listBD
  }catch (error) {
    console.log(error);
  }
};
//codigo
listBD = fetcheado();
listBD.then(listBD => {
  //render de tienda inicial
  tienda(listBD);
  //busqueda
  inputBusqueda.addEventListener("input", () => {
    busqueda(listBD);
  });
});

export{carrito,cantidadEnCarrito,listBD}; 
//////////////////////////////////////////////////////////////////////////////////////////////////////
//Hola tutor/profe, durante esta entrega rompi en parte la tienda de mi ecomerce
//los invito q buscar y ver como el height del conteiner <nav> en la tienda (xd, nunca pense q podia pasar eso)
//otra cosa, no pude hacer en el catch del trycatch formar un dom (un div q diga lo sentimos ocurrio un error)
//si pudieran ayudarme con esto estaria bueno
//dejo el codigo para ver que onda
/* 
try {
  listBD = fetcheado();
  listBD.then(listBD => {
    //render de tienda inicial
    tienda(listBD);
    //busqueda
    inputBusqueda.addEventListener("input", () => {
      busqueda(listBD);
    });
  });
} catch (error) {
  let modalError = document.createElement("div");
  modalError.innerHTML = `
    <div class="error">
      <h2>Lo sentimos!</h2>
      <p>a ocurrido un error</p>
      <p>precisamente ${error}</p>
    </div>
  `;
  modalError.classlist.add("ModalError");
  bodyHtml.append(modalError);
}
pd: no agrege estilos aun y el error para que entre en el catch q le estoy dando es cambiar la ruta del fetch a una erronea
*/