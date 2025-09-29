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
titulo.textContent = "AlacenaApp | Gestiona tus alimentos";


// Gestor de alacena.

let producto = prompt("Ingrese el nombre del producto:");
let cantidad = prompt("Ingrese la cantidad:");
let fechaCaducidad = prompt("Ingrese la fecha de vencimiento del producto (DD/MM/AAAA):");

console.log("Producto agregado: " + producto);
console.log("Cantidad: " + cantidad);
console.log("Fecha de vencimiento: " + fechaCaducidad);

alert("Producto agregado: " + producto + "\nCantidad: " + cantidad + "\nFecha de vencimiento: " + fechaCaducidad);