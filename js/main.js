// Crear listado de productos
// No esta contemplado las acciones de compartir listas ni el ingreso y edición a listas ya creadas.

document.addEventListener("DOMContentLoaded", () => {

    // Elementos en el html
    const formProducto = document.getElementById("formProductos");
    const listaProductos = document.getElementById("listaProductos");
    const agregarProducto = document.getElementById("agregarProducto");
    const botonCrearLista = document.getElementById("botonCrearLista");
    const botonBorrarTodo = document.getElementById("botonBorrarTodo");
    const botonCompartir = document.getElementById("botonCompartir");
    const inputLista = document.getElementById("lista");
    const misListas = document.getElementById("misListas");

    // Recuperar listas del localStorage 
    let productos = JSON.parse(localStorage.getItem("productosTemporales")) || [];
    let listas = JSON.parse(localStorage.getItem("listas")) || [];

    // Función para renderizar la lista de productos
    function crearProducto(producto) {
        const li = document.createElement("li");
        li.innerHTML = `${producto.nombre} - Cantidad: - Categoría: ${producto.categoria}
                        <button class="restar">-</button>
                        <span class="cantidad" ${producto.cantidad} </span>
                        <button class="sumar">+</button>
                        <button class="borrar">Borrar</button>`;

        // Botones para sumar, restar y borrar
        li.querySelector(".sumar").addEventListener("click", () => {
            producto.cantidad++;
            li.querySelector(".cantidad").textContent = producto.cantidad;
        });

        li.querySelector(".restar").addEventListener("click", () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
                li.querySelector(".cantidad").textContent = producto.cantidad;
            }
        });

        li.querySelector(".borrar").addEventListener("click", () => {
            listaProductos.removeChild(li);
            productos = productos.filter(p => p !== producto);
        });

        return li;


    }

    //Guardar productos en el localStorage al cargar la página
    function guardarProductos() {
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    //Cargar productos guardados al iniciar
    productos.forEach(producto => {
        listaProductos.appendChild(crearProducto(producto));
    });

    //Agregar producto desde el formulario
    formProducto.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("producto").value;
        const cantidad = parseInt(document.getElementById("cantidad").value);
        const categoria = document.getElementById("categoria").value;

        if (!nombre || isNaN(cantidad) || cantidad <= 0) {
            mostrarMensaje("Por favor, ingresa todos los campos correctamente.");
            return;
        }

        const nuevoProducto = { nombre, cantidad, categoria };
        productos.push(nuevoProducto);

        // Mostrar el producto en la lista
        listaProductos.appendChild(crearProducto(nuevoProducto));

        // Borar el formulario
        formProducto.reset();
    });

    // Crear la lista en localStorage
    botonCrearLista.addEventListener("click", () => {
        const nombreLista = inputLista.value.trim();
        if (!nombreLista) {
            mostrarMensaje("Por favor, ingresa un nombre para la lista.");
            return;
        }

        if (productos.length === 0) {
            mostrarMensaje("No hay productos en la lista para guardar.");
            return;
        }

        const nuevaLista = { nombre: nombreLista, productos: productos };
        listas.push(nuevaLista);
        localStorage.setItem("listas", JSON.stringify(listas));

        // Mostrar la lista en "Mis listas"
        const liLista = document.createElement("li");
        liLista.textContent = nombreLista;
        misListas.appendChild(liLista);

        productos = [];
        listaProductos.innerHTML = "";
        inputLista.value = "";

        mostrarMensaje("Lista creada exitosamente.");

    });

    // Borrar la lista actual
    botonBorrarTodo.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas borrar toda la lista?")) {
            productos = [];
            listaProductos.innerHTML = "";
            localStorage.removeItem("productos");
        }
    });

});