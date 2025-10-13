// Variable: espacio de memoria reservado para información importante de nuestro sitio web.

// Declaración:
let cliente;

//Asignación de variables:
cliente = "Alejandro Bailo";
console.log("Alumno: " + cliente);

//Inicializar variables: 
let edad = 34;
console.log("Edad: " + edad);

//Const: es una variable que no puede ser modificada.
const nacimiento = 1990;
console.log("Fecha de nacimiento: " + nacimiento);

// Otras practicas.
const titulo = document.getElementById("titulo");
titulo.textContent = "AlacenaApp";

// ----------------------------------------------------------------

//AlmacenApp | Gestor de alimentos.

// Registrar usuario por primera vez.
let nuevoUsuario = prompt("Ingrese un nombre de usuario para registrarse:");
usuariosRegistrados.push(nuevoUsuario);
console.log("Nuevo usuario registrado: " + nuevoUsuario);

let nuevaContraseña = prompt("Cree una contraseña para su cuenta:");
console.log("Contraseña creada para el usuario " + nuevoUsuario);
alert("Usuario creado exitosamente!");

// Validación de usuario: Usuario registrado. (que pasa cuando no es uno de estos?)
const usuariosRegistrados = ["Alejandro", "Maria", "Juan"];
if (usuariosRegistrados.includes(usuario)) {
    console.log("Usuario " + usuario + " reconocido. Puedes colaborar en la lista.");
} else {
    console.log("Usuario no reconocido. Por favor, regístrate para colaborar.");
}

// Uso de For para crear 3 intentos de ingreso de contraseña.
let intentos = 3;
let accesoConcedido = false;

for (let i = 0; i < intentos; i++) {
    let usuarioIngreso = prompt("Ingrese su nombre de usuario:");
    let contraseñaIngreso = prompt("Ingrese su contraseña:");

    if (usuarioIngreso === nuevoUsuario && contraseñaIngreso === nuevaContraseña) {
        accesoConcedido = true;
        console.log("Bienvenido " + usuarioIngreso + "!");
        alert("Bienvenido " + usuarioIngreso + "!");
        break;
    } else {
        console.log("Contraseña incorrecta. Intento " + (i + 1) + " de " + intentos + ".");
        alert("Contraseña incorrecta. Intento " + (i + 1) + " de " + intentos + ".");
    }
}

if (!accesoConcedido) {
    console.log("Excediste los 3 intentos, vuelve a intentarlo más tarde.");
    alert("Excediste los 3 intentos, vuelve a intentarlo más tarde.");
}

// Uso de Función para saludar al usuario.
function saludar(nombre) {
    console.log("Hola " + nombre + ", bienvenido a AlmacenApp!");
    alert("Hola " + nombre + ", bienvenido a AlmacenApp!");
}

saludar("Alejandro");
saludar("Juan");
saludar("María");

// ----------------------------------------------------------------

// Ingreso de productos con While y array.
let agregarProducto = true;

// Arrays para guardar los ingresos.
let productos = [];
let cantidades = [];
let fechasCaducidad = [];

while (agregarProducto) {
    let producto = prompt("Ingrese el producto:");
    let cantidad = Number(prompt("Ingrese la cantidad:"));
    let fechaCaducidad = prompt("Ingrese la fecha de vencimiento (DD/MM/AAAA):");

    console.log("Producto: " + producto + ", Cantidad: " + cantidad + ", Vence el: " + fechaCaducidad);
    alert("Producto agregado: " + producto + "\nCantidad: " + cantidad + "\nFecha de vencimiento: " + fechaCaducidad);

    // Guardar en arrays.
    if (producto && !isNaN(cantidad) && cantidad > 0 && fechaCaducidad) {
        productos.push(producto);
        cantidades.push(cantidad);
        fechasCaducidad.push(fechaCaducidad);
    }

     // Pregunta para continuar o no.
    let continuar = prompt("¿Desea agregar otro producto? (si/no):").toLowerCase();
    if (continuar !== "si") {
        agregarProducto = false;
    }
}

console.log("Gracias, puede agregar un nuevo producto cuando lo desees.");
alert("Gracias, puede agregar un nuevo producto cuando lo desees.");

// ----------------------------------------------------------------


// Suma de cantidad de items agregados con Función flecha.
const sumarItems = (arr) => arr.reduce(( total, num) => total + num, 0);

let totalItems = sumarItems(cantidades); 

console.log("Total de items agregados: " + totalItems);
alert("Total de items agregados: " + totalItems);

// Mostar resumen de productos agregados.
console.log("Productos ingresados:", productos);
console.log("Cantidades:", cantidades);
console.log("Fechas de vencimiento ingresadas:", fechasCaducidad);

// Resumen: Lista de productos agregados.
let resumen = "Lista de productos:\n\n";

for (let i = 0; i < productos.length; i++) {
    resumen += `Producto: ${productos[i]}\nCantidad: ${cantidades[i]}\nVence el: ${fechasCaducidad[i]}\n\n`;
}

console.log(resumen);
alert(resumen);


// ----------------------------------------------------------------




