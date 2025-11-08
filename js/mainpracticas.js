
// Registro de usuario utilizando localStorage.
// Array para guardar la información del usuario.
let usuarioRegistrado = JSON.parse(localStorage.getItem("usuarios")) || [];

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

    // Guardar el array actualizado en localStorage.
    localStorage.setItem("usuarios", JSON.stringify(usuarioRegistrado));

    console.log("¡Bienvenido " + nuevoUsuario + "! Tu cuenta fue creada exitosamente.");
    alert("¡Bienvenido " + nuevoUsuario + "! Tu cuenta fue creada exitosamente.");
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

            if (isuarioValido.contraseña === contraseñaInput) {
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

saludar("Alejandro");

// Uso de Función constructora para saludar al usuario.

function Usuario(nombre, mail, contraseña) {
    this.nombre = nombre;
    this.mail = mail;
    this.contraseña = contraseña;
    this.saludar = function() {
        console.log("Hola " + this.nombre + ". Bienvenido a AlmacenApp!");
        alert("Hola " + this.nombre + ". Bienvenido a AlmacenApp!");
    }
}

let usuario1 = new Usuario("Alejandro", ale_bailomail, "1234");
usuario1.saludar();


// ----------------------------------------------------------------

// Ingreso de productos con función, while y array.
// Arrays para guardar los ingresos.
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let cantidades = JSON.parse(localStorage.getItem("cantidades")) || [];
let fechasCaducidad = JSON.parse(localStorage.getItem("fechasCaducidad")) || [];
let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

function agregarProductoAlista(producto, cantidad, fechaCaducidad) {
    if (producto && !isNaN(cantidad) && cantidad > 0 && fechaCaducidad) {
        productos.push(producto);
        cantidades.push(cantidad);
        fechasCaducidad.push(fechaCaducidad);
        categorias.push(categoria);

        // Guardar los arrays actualizados en localStorage.
        localStorage.setItem("productos", JSON.stringify(productos));
        localStorage.setItem("cantidades", JSON.stringify(cantidades));
        localStorage.setItem("fechasCaducidad", JSON.stringify(fechasCaducidad));
        localStorage.setItem("categorias", JSON.stringify(categorias));

        console.log("Producto agregado: " + producto + ", Cantidad: " + cantidad + ", Vence el: " + fechaCaducidad);
        alert("Producto agregado: " + producto + "\nCantidad: " + cantidad + "\nCategoría: " + categoria + "\nFecha de vencimiento: " + fechaCaducidad);
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
    let categoria = prompt("Ingrese la categoría del producto (Lácteos, Carnes, Verduras, Frutas, Bebidas, Limpieza, Cuidado personal):");

    agregarProductoAlista(producto, cantidad, fechaCaducidad, categoria);

    // Pregunta para continuar o no.
    let continuar = prompt("¿Desea agregar otro producto? (si/no):").toLowerCase();
    if (continuar !== "si") {
        agregarProducto = false;
    }
}

console.log("Gracias, puede agregar un nuevo producto cuando lo desees.");
alert("Gracias, puede agregar un nuevo producto cuando lo desees.");

// Recuperar los productos agregados que son nuevos.

let productoRecuperado = localStorage.getItem("productos");
let cantidadRecuperada = parseInt(localStorage.getItem("cantidades"));
let fechaRecuperada = parseInt(localStorage.getItem("fechasCaducidad"));
let categoriaRecuperada = parseInt(localStorage.getItem("categorias"));


// ----------------------------------------------------------------

// Suma de cantidad de items agregados con método reduce.
let totalItems = cantidades.reduce((total, num) => total + num, 0);

console.log("Total de items agregados (método reduce): " + totalItems);
alert("Total de items agregados (método reduce): " + totalItems);

// Mostar resumen de productos agregados.
console.log("Productos ingresados:", productos);
console.log("Cantidades:", cantidades);
console.log("Fechas de vencimiento ingresadas:", fechasCaducidad);
console.log("Categorías ingresadas:", categorias);

// Resumen: Lista de productos agregados.
let resumen = "Lista de productos:\n\n";

for (let i = 0; i < productos.length; i++) {
    resumen += `Producto: ${productos[i]}\nCantidad: ${cantidades[i]}\nCategoría: ${categorias[i]}\nVence el: ${fechasCaducidad[i]}\n\n`;
}

console.log(resumen);
alert(resumen);

// Borrar datos de localStorage
let borrarLista = prompt("¿Desea borrar la lista de productos guardada? (si/no):").toLowerCase();
if (borrarLista === "si") {
    localStorage.removeItem("productos");   
    localStorage.removeItem("cantidades");   
    localStorage.removeItem("fechasCaducidad");   
    console.log("La lista de productos fue borrada con éxito.");
    alert("La lista de productos fue borrada con éxito.");
} else {
    console.log("La lista de productos guardada correctamente.");
    alert("La lista de productos guardada correctamente.");
}   


// ----------------------------------------------------------------

// Metodo filter para mostrar productos por categoría.
let productosLacteos = productos.filter((p, i) => categorias[i].toLowerCase === "lácteos");
let productosCarnes = productos.filter((p, i) => categorias[i].toLowerCase === "carnes");  
let productosVerduras = productos.filter((p, i) => categorias[i].toLowerCase === "verduras");
let productosFrutas = productos.filter((p, i) => categorias[i].toLowerCase === "frutas");
let productosBebidas = productos.filter((p, i) => categorias[i].toLowerCase === "bebidas");
let productosLimpieza = productos.filter((p, i) => categorias[i].toLowerCase === "limpieza");
let productosCuidadoPersonal = productos.filter((p, i) => categorias[i].toLowerCase === "cuidado personal");

// Mostrar los productos por categoría.
console.log("Lácteos:", productosLacteos);
console.log("Carnes:", productosCarnes);
console.log("Verduras:", productosVerduras);
console.log("Frutas:", productosFrutas);
console.log("Bebidas:", productosBebidas);
console.log("Limpieza:", productosLimpieza);
console.log("Cuidado Personal:", productosCuidadoPersonal);

// ----------------------------------------------------------------

// Buscador de productos con método find.
let buscador = prompt("Ingrese el nombre del producto que desea buscar:");
let productoEncontrado = productos.find((p) => p.toLowerCase() === buscador.toLowerCase());

if (productoEncontrado) {
    let index = productos.indexOf(productoEncontrado);
    console.log("Producto encontrado: " + productoEncontrado + ", Cantidad: " + cantidades[index] + ", Vence el: " + fechasCaducidad[index] + ", Categoría: " + categorias[index]);
    alert("Producto encontrado: " + productoEncontrado + "\nCantidad: " + cantidades[index] + "\nCategoría: " + categorias[index] + "\nFecha de vencimiento: " + fechasCaducidad[index]);
} else {
    console.log("Producto no encontrado en la lista.");
    alert("Producto no encontrado en la lista.");
}       

// ----------------------------------------------------------------

// Crear listado de listado de productos con método map.