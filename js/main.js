//AlmacenApp | Gestor de alimentos.

// Registro de usuario.
// Array para guardar la información del usuario.
let usuarioRegistrado = [];

// Formulario de registro de usuario.
let mail = prompt("Ingrese un email para registrarse:");
let nuevoUsuario = prompt("Ingrese su nombre de usuario:");
let nuevaContraseña = prompt("Ingrese una contraseña para su cuenta:");
let confirmarContraseña = prompt("Confirme su contraseña:");

// Validación de la información y contraseña.
if (!mail || !nuevoUsuario || !nuevaContraseña) {
    alert("Todos los campos son obligatorios.");
} else if (nuevaContraseña !== confirmarContraseña) {
    alert("Las contraseñas no coinciden. Intente nuevamente.");
} else {
    // Guardar la información del usuario en el array.
    usuarioRegistrado.push({
        mail: mail,
        usuario: nuevoUsuario,
        contraseña: nuevaContraseña
    });

    console.log("¡Bienvenido " + nuevoUsuario + "!");
    alert("¡Bienvenido " + nuevoUsuario + "!");
}

// Ingreso de usuario registrado.
let ingresar = true;

while (ingresar) {
    let usuarioInput = prompt("Ingrese su nombre de usuario o mail:");

    // Validar los datos con el Array.
    let usuarioValido = usuarioRegistrado.find((u) => u.usuario === usuarioInput || u.mail === usuarioInput);

    if (!usuarioValido) {
        alert("Usuario no encontrado. Verifique que los datos sean correctos.");
    } else {
        let intentos = 3;
        let contraseñaCorrecta = false;

        for (let i = 0; i < intentos; i++) {
            let contraseñaInput = prompt("Ingrese su contraseña nuevamente (Intento " + (i + 1) + " de " + intentos + "):");

            if (usuarioValido.contraseña === contraseñaInput) {
                accesoConcedido = true;
                alert("¡Bienvenido " + usuarioValido.usuario + ".");
                console.log("¡Bienvenido " + usuarioValido.usuario + ".");
                ingresar = false;
                break;
            } else {
                alert("Contraseña incorrecta. Intente nuevamente." + (i + 1) + " de " + intentos + " intentos.");
                console.log("Contraseña incorrecta. Intente nuevamente." + (i + 1) + " de " + intentos + " intentos.");
            }
        }

        if (!accesoConcedido) {
            alert("Has realizado 3 intentos de contraseña. Vuelve a intentarlo mas tarde.");
            console.log("Has realizado 3 intentos de contraseña. Vuelve a intentarlo mas tarde.");
            ingresar = false;
        }
    }



    // Opción para reintentar o salir.
    if (ingresar) {
        let reintentar = prompt("¿Desea reintentar el ingreso? (si/no):").toLowerCase();
        if (reintentar !== "si") {
            ingresar = false;
            console.log("Vuelva a internarlo más tarde.");
            alert("Vuelva a internarlo más tarde.");
        }
    }
}


// ----------------------------------------------------------------

// Uso de Función para saludar al usuario.
function saludar(nombre) {
    console.log("Hola " + nombre + ", Bienvenido a AlmacenApp!");
    alert("Hola " + nombre + ", Bienvenido a AlmacenApp!");
}

saludar(nuevoUsuario);

// ----------------------------------------------------------------

// Ingreso de productos con función, while y array.
// Arrays para guardar los ingresos.
let productos = [];
let cantidades = [];
let fechasCaducidad = [];

function agregarProductoAlista(producto, cantidad, fechaCaducidad) {
    if (producto && !isNaN(cantidad) && cantidad > 0 && fechaCaducidad) {
        productos.push(producto);
        cantidades.push(cantidad);
        fechasCaducidad.push(fechaCaducidad);

        console.log("Producto agregado: " + producto + ", Cantidad: " + cantidad + ", Vence el: " + fechaCaducidad);
        alert("Producto agregado: " + producto + "\nCantidad: " + cantidad + "\nFecha de vencimiento: " + fechaCaducidad);
    } else {
        console.log("Producto inválido. Ingrese los campos correctamente.");
        alert("Producto inválido. Ingrese los campos correctamente.");
    }
}

// Bucle para agregar productos.

let agregarProducto = true;

while (agregarProducto) {
    let producto = prompt("Ingrese el producto:");
    let cantidad = Number(prompt("Ingrese la cantidad:"));
    let fechaCaducidad = prompt("Ingrese la fecha de vencimiento (DD/MM/AAAA):");

    agregarProductoAlista(producto, cantidad, fechaCaducidad);

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
const sumarItems = (arr) => arr.reduce((total, num) => total + num, 0);

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




