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


//AlmacenApp | Gestor de alimentos.

// Registrar usuario por primera vez.
let nuevoUsuario = prompt("Ingrese un nombre de usuario para registrarse:");
usuariosRegistrados.push(nuevoUsuario);
console.log("Nuevo usuario registrado: " + nuevoUsuario);

let nuevaContraseña = prompt("Cree una contraseña para su cuenta:");
console.log("Contraseña creada para el usuario " + nuevoUsuario);
alert("Usuario creado exitosamente!");


// Ingreso de productos.
let producto = prompt("Ingrese el nombre del producto:");
let cantidad = prompt("Ingrese la cantidad:");
let fechaCaducidad = prompt("Ingrese la fecha de vencimiento del producto (DD/MM/AAAA):");

console.log("Producto agregado: " + producto);
console.log("Cantidad: " + cantidad);
console.log("Fecha de vencimiento: " + fechaCaducidad);

alert("Producto agregado: " + producto + "\nCantidad: " + cantidad + "\nFecha de vencimiento: " + fechaCaducidad);

// Condicionales para validar las cantidades y la fecha de vencimiento.
if (cantidad >= 0 && fechaCaducidad) {
    console.log("El producto " + producto + " ha sido agregado correctamente.");
} else {
    console.log("La cantidad debe ser mayor a cero.");
}

if (fechaCaducidad >= "01/01/2025") {
    console.log("El producto " + producto + " está dentro de la fecha de vencimiento.");
} else {
    console.log("El producto " + producto + " ha vencido.");
}

// Ingreso de usuarios para lista colaborativa en caso de que no haya que registrarse.
let usuario = prompt("Ingrese su nombre de usuario:");
console.log("Usuario registrado: " + usuario);
alert("Bienvenido, " + usuario + "! Ahora puedes colaborar en la lista de alimentos.");


// Validación de usuario: Usuario registrado. (que pasa cuando no es uno de estos?)
const usuariosRegistrados = ["Alejandro", "Maria", "Juan"];
if (usuariosRegistrados.includes(usuario)) {
    console.log("Usuario " + usuario + " reconocido. Puedes colaborar en la lista.");
} else {
    console.log("Usuario no reconocido. Por favor, regístrate para colaborar.");
}



