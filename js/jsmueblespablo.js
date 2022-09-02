import{ hacerListaCarrito,modalCarrito, reduceCasero,bodyHtml} from "./modalCarrito.js";
import { abrirImagen } from "./modalImgs.js";
//vars
let carrito = localStorage?.carrito? JSON.parse(localStorage.carrito):[];
const navTienda =  document.getElementById("nav");
let listBD = [];
let cantidadEnCarrito = document.getElementById("contadorCarrito"); 
let inputBusqueda = document.getElementById("inBusqueda");
/* localStorage.removeItem("carrito") */
//funciones a utilizar
export function contadorParaBotonCarrito(){
  if(JSON.parse(localStorage.carrito).length != 0){
    console.log("entro en el if ");
    cantidadEnCarrito.innerText = JSON.parse(localStorage.carrito).length;
    cantidadEnCarrito.classList.remove("puntitoOculto");
  }else if(JSON.parse(localStorage.carrito).length == 0 ){
    console.log("entro en el else");
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
  localStorage.setItem("carrito",JSON.stringify(carrito));
  reduceCasero();
  hacerListaCarrito();
  contadorParaBotonCarrito();
};

function añadir_aCarrito(id,listaDeProductos){
  let carriteado = listaDeProductos.find(i => i.id == id);
  listaDeProductos[listaDeProductos.indexOf(carriteado)].carrito = true;
  carrito.push(carriteado);
  console.log(listaDeProductos);
  tienda(listaDeProductos);
  if(modalCarrito.className == "modalAbierto"){
    hacerListaCarrito();
  }
  localStorage.setItem("listaBD",JSON.stringify(listBD));
  localStorage.setItem("carrito",JSON.stringify(carrito));
  contadorParaBotonCarrito();
}
//DOM
export function tienda(listaDeProductos){
  navTienda.innerHTML = " "
  let productosEnVenta = [], push = true;

  if(localStorage?.carrito){
    let savedCarrito = JSON.parse(localStorage?.carrito);

    listaDeProductos.forEach((item)=>{
      savedCarrito.forEach((saved) =>{
        if(saved.id ===item.id) push=false
      })
      if(push) productosEnVenta.push(item)
      push = true;
    });
  }else{
    productosEnVenta = listaDeProductos.filter(i => i.carrito == false);
  }

  productosEnVenta.forEach( (i) => {
    let carta = document.createElement("div");
    carta.className = "contenedor-carta";
    carta.innerHTML = `
    <div class="carta">
    <h2>${i.mueble}</h2>
    <img id="img${i.id}" src=${i.imagen} alt="">
    <p>${i.precio}$<p>
    <button class="botonDeCarta"id="B${i.id}A">Añadir al carrito!</button>
    </div>`;
    navTienda.appendChild(carta);
    
    let imgClickeable = document.getElementById(`img${i.id}`);
    imgClickeable.addEventListener("click",()=>{
      abrirImagen(i);
    });
  })
  
  //boton añadir al carrito 
  productosEnVenta.forEach((i) => {
    const botonAñadirCarro = document.getElementById(`B${i.id}A`);
    botonAñadirCarro.addEventListener("click",()=>{
      añadir_aCarrito(i.id, listaDeProductos);
      reduceCasero();
      hacerListaCarrito();
      Toastify({
        duration:1200,
        text: "Añadiste un producto a tu carrito!",
        className: "info",
      }).showToast();
      tienda(listBD);
    })
  })
};

const busqueda = (listaDeProductos) =>{
  if(inputBusqueda.value == ""){
    tienda(listaDeProductos);
  }else{
    let tiendaFiltrada = [], push = true;
    //////////////////////////
    if(localStorage?.carrito){
      let savedCarrito = JSON.parse(localStorage?.carrito);

      listaDeProductos.forEach((item)=>{
        savedCarrito.forEach((saved) =>{
          if(saved.id ===item.id) push=false
        })
        if(push) tiendaFiltrada.push(item)
        push = true;
      });

      tiendaFiltrada = tiendaFiltrada.filter( i => i.mueble.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && i.carrito == false);
    }else{
      tiendaFiltrada = listaDeProductos.filter( i => i.mueble.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && i.carrito == false);
    }
    //////////////////
    //dom
    navTienda.innerHTML = " "
    tiendaFiltrada.forEach(i => {
      let carta = document.createElement("div");
      carta.className = "contenedor-carta";
      carta.innerHTML = `
      <div class="carta">
      <h2>${i.mueble}</h2>
      <img id="img${i.id}" src=${i.imagen} alt="">
      <p>${i.precio}$<p>
      <button id="B${i.id}" class="botonDeCarta">Añadir al carrito!</button>
      </div>`;
      navTienda.appendChild(carta);
      //evento añadir carrito
      const botonAñadirCarro = document.getElementById(`B${i.id}`);
      //boton añadir al carrito
      botonAñadirCarro.addEventListener("click",()=>{
        añadir_aCarrito(i.id, listaDeProductos);
        reduceCasero();
        hacerListaCarrito();
      })
    })
    //abrir img 
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
    return listBD =await fetchDeBD.json();//continuacion de promise
  }catch (error) {
    let modalError = document.createElement("div");
    modalError.innerHTML = `
    <div class="error">
    <h2>Lo sentimos!</h2>
    <p>a ocurrido un error</p> 
    <p>precisamente "${error}"</p>
    </div>
    `;
    modalError.className = "ModalError";
    bodyHtml[0].appendChild(modalError);
  }
};
//codigo
listBD = fetcheado();
listBD.then(listBD => {
  //render de tienda inicial
  tienda(listBD);
  contadorParaBotonCarrito();
  //busqueda
  inputBusqueda.addEventListener("input", () => {
    busqueda(listBD);
  });
});

if(localStorage.getItem("carrito")){
  carrito = JSON.parse(localStorage.getItem("carrito"));
  contadorParaBotonCarrito();
}

export{carrito,cantidadEnCarrito,listBD}; 