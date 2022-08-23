let divContenedorMaps = document.getElementById("mapses");

let botonCordillera = document.getElementById("cordilleraButton");
let botonCatamarca = document.getElementById("catamarcaButton")

let mapCordillera = `<iframe class="maps" id="maps2"src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d851.6903976653604!2d-64.22263057076094!3d-31.365557553717913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432993ce15977c5%3A0x5503cf5c35efbbad!2sLa%20Cordillera%203511%2C%20X5009%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1660953785523!5m2!1ses-419!2sar" width="460" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

let mapCatamarca = `<iframe class="maps" id="maps1" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1702.5372248401848!2d-64.18082804173332!3d-31.41207480624334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a399b8516503%3A0x775da9ed10b91b5e!2sLos%20Muebles%20de%20Pablo!5e0!3m2!1ses-419!2sar!4v1660953704208!5m2!1ses-419!2sar" width="460" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

botonCordillera.addEventListener("click", ()=>{
    divContenedorMaps.innerHTML == mapCordillera? divContenedorMaps.innerHTML = "" : divContenedorMaps.innerHTML = mapCordillera
});
botonCatamarca.addEventListener("click", ()=>{
    divContenedorMaps.innerHTML == mapCatamarca ? divContenedorMaps.innerHTML = "" : divContenedorMaps.innerHTML = mapCatamarca
});