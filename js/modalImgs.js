import{bodyHtml} from "./modalCarrito.js";

export function abrirImagen(i){
    let modalDeImg = document.createElement("div");
    modalDeImg.innerHTML = `
    <div class="conteiner_modalDeImg">
        <div class="containerModal_tituloBoton">
            <h2>${i.mueble}</h2>
            <img id="boton${i.id}SalirModal" class="botonCerrarModal" id="boton${i.id}SalirModal" src= "./fotos/cerrarIcono.png" alt="">
        </div>
        <img class="producto"id="img${i.id}" src=${i.imagen} alt="">
        <p>${i.precio}<p>
    </div>
        
        `;
    modalDeImg.classList.add("conteinerconteiner_modalDeImg");
    bodyHtml[0].appendChild(modalDeImg);
    let botonSalirModal = document.getElementById(`boton${i.id}SalirModal`);
    console.log(botonSalirModal);
    botonSalirModal.addEventListener("click", ()=>{
        bodyHtml[0].removeChild(modalDeImg);
    });
};