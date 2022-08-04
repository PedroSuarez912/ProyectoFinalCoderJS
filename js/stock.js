class Productos{
    constructor(identificacion,nombreMueble,imagen,categoria,precio){
      this.id = identificacion
      this.mueble = nombreMueble;
      this.imagen = imagen;
      this.categoria = categoria;
      this.precio = precio+"$";
      this.vendido = false;
      this.carrito = false;
    }
    sold(){
      this.vendido = true;
    }      
    meterEnCarrito(){
      this.carrito = true;
    }
}

const producto1 = new Productos(1,"Comoda Americana","./fotos/producto1.jpg","mueble de dormitorio",10000);
const producto2 = new Productos(2,"Comoda francesa","./fotos/producto2.jpg","mueble de dormitorio",15000);
const producto3 = new Productos(3,"Mesa de Luz","./fotos/producto3.jpg","mueble de dormitorio",14000);
const producto4 = new Productos(4,"Mesa ratona","./fotos/producto4.jpg","mueble de dormitorio",12000);
const producto5 = new Productos(5,"Espejo Español","./fotos/producto5.jpg","mueble de dormitorio",18000);
const producto6 = new Productos(6,"Placard romano","./fotos/producto6.jpg","mueble de dormitorio",10000);
const producto7 = new Productos(7,"Sillon italiano","./fotos/producto7.jpg","mueble de dormitorio",9000);
const producto8 = new Productos(8,"cama francesa","./fotos/producto8.jpg","mueble de dormitorio",5000);
const producto9 = new Productos(9,"cama austriaca","./fotos/producto9.jpg","mueble de dormitorio",7500);
const producto10 = new Productos(10,"Comoda Americana","./fotos/producto1.jpg","mueble de dormitorio",10000);
const producto11 = new Productos(11,"Comoda francesa","./fotos/producto2.jpg","mueble de dormitorio",15000);
const producto12 = new Productos(12,"Mesa de Luz","./fotos/producto3.jpg","mueble de dormitorio",14000);
const producto13 = new Productos(13,"Mesa ratona","./fotos/producto4.jpg","mueble de dormitorio",12000);
const producto14 = new Productos(14,"Espejo Español","./fotos/producto5.jpg","mueble de dormitorio",18000);
const producto15 = new Productos(15,"Placard romano","./fotos/producto6.jpg","mueble de dormitorio",10000);
const producto16 = new Productos(16,"Sillon italiano","./fotos/producto7.jpg","mueble de dormitorio",9000);
const producto17 = new Productos(17,"cama francesa","./fotos/producto8.jpg","mueble de dormitorio",5000);
const producto18 = new Productos(18,"cama austriaca","./fotos/producto9.jpg","mueble de dormitorio",7500);



let listaProductos = [];
listaProductos.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8,producto9);
listaProductos.push(producto10,producto11,producto12,producto13,producto14,producto15,producto16,producto17,producto18)
let mensajeLogeo = "SI PASA LOS DATOS";

export {listaProductos,Productos, mensajeLogeo};