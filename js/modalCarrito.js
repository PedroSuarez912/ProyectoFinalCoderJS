import{carrito,tienda,comprarCarrito,contadorParaBotonCarrito,listBD} from "./jsmueblespablo.js" ;
import { abrirImagen } from "./modalImgs.js";
//vars
const botonCarrito = document.getElementById("botonCarrito");
const bodyHtml = document.getElementsByTagName("body");
let modalCarrito = document.createElement("div");
/* let totalCarrito = carrito.reduce((start,elemento) => start + elemento.precio, 0); */
let precioTotalCarrito = 0;
//tuve que hacerle una función pq no me andaba con .reduce() xd
export function reduceCasero(){
    precioTotalCarrito = 0;
    if (carrito.lenght == 0) {
        precioTotalCarrito = 0;
    }else{
    for(let i of carrito){
        console.log(i.precio);
        precioTotalCarrito += parseInt(i.precio);}
    }
}

function quitarElementoCarrito(i){
    let ItemAQuitar = carrito.find(x => x.id == i.id);//encontramos elemento en el carrito x su id
    ItemAQuitar.carrito = false;
    let indiceItem = carrito.indexOf(ItemAQuitar);//le sacamos su indice
    carrito.splice(indiceItem, 1);//eliminamos el objeto q se encuentre en esa posición del array
    hacerListaCarrito();//volvemos a cargar el modal
    tienda(listBD);//update a la tienda
    contadorParaBotonCarrito();//actualiza el contador del carrito
    reduceCasero();
};

export function hacerListaCarrito(){
    //DOM del modal 
    modalCarrito.innerHTML = `
    <div class="contenedor_titulo_carrito">
        <div class="titulo_carrito"> CARRITO </div>
        <div class="total">total=${precioTotalCarrito}$</div>
        <button id="boton_comprar_carrito">Comprar carrito</button>
    </div>
    <div id="carrito_en_si">
    </div>
    `;
    bodyHtml[0].appendChild(modalCarrito); 
    let botonComprarCarrito = document.getElementById("boton_comprar_carrito");
    botonComprarCarrito.addEventListener("click",()=>{
        comprarCarrito(carrito);
        hacerListaCarrito();
    });

    let carrito_listado = document.getElementById("carrito_en_si");
    //lista items del carrito
    carrito_listado.innerHTML=" "
    carrito.forEach( i => {
        let divCarrito = document.createElement("div");
        divCarrito.innerHTML = `
                <img id="imgCarrito${i.id}" src="${i.imagen}" alt="">
                <div>
                    <p>${i.mueble}</p>
                    <p>${i.precio}</p>
                </div>
                <button id="${i.id}Quitar">X</button>
        `;
        divCarrito.classList.add("divCarrito");
        carrito_listado.appendChild(divCarrito);
        
        //botones para quitar
        const botonQuitarCarrito = document.getElementById(`${i.id}Quitar`);
        const imgCarrito = document.getElementById(`imgCarrito${i.id}`);
        //evento quitardelcarrito
        botonQuitarCarrito.addEventListener("click",()=>{
            quitarElementoCarrito(i);
        })
        //evento abrir modal de img
        imgCarrito.addEventListener("click",()=>{
            abrirImagen(i);
        });
    } );
};

//evento para abrir y cerrar el carrito x un botón
botonCarrito.addEventListener("click", () =>{
    if(modalCarrito.className == "modalAbierto"){
        modalCarrito.classList.toggle("modalAbierto");  
        bodyHtml[0].removeChild(modalCarrito);
    }else{
        bodyHtml[0].appendChild(modalCarrito);   
        hacerListaCarrito();
        modalCarrito.classList.toggle("modalAbierto");
    }
});

export{modalCarrito,bodyHtml};