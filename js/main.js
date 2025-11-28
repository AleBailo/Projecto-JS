// Crear listado de productos
// Elementos en el html
const formProducto = document.getElementById("formProductos");
const listaProductos = document.getElementById("listaProductos");
const botonCrearLista = document.getElementById("botonCrearLista");
const botonBorrarTodo = document.getElementById("botonBorrarTodo");
const inputLista = document.getElementById("lista");
const misListas = document.getElementById("misListas");

// Recuperar listas del localStorage 
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let listas = JSON.parse(localStorage.getItem("listas")) || [];

// Funciones para guardar en el localStorage
const guardarProductos = () => {
    localStorage.setItem("productos", JSON.stringify(productos));
};
const guardarListas = () => {
    localStorage.setItem("listas", JSON.stringify(listas));
};
const categorias = ["Lacteos","Carnes","Legumbres","Cereales","Verduras","Frutas","Bebidas","Limpieza","Cuidado personal","Otro"];


// Función para renderizar la lista de productos
function renderProductos() {
    let html = "";
    productos.forEach((producto, index) => {
        html += `
         <li class="producto-item" data-index="${index}">
                <div class="producto-texto">
                    <strong>${producto.nombre}</strong> — <em>${producto.categoria}</em>
                </div>
                <div class="producto-controles">
                    <div class="contador">
                        <button type="button" class="btn-restar" data-index="${index}">-</button>
                        <span class="cantidad" data-index="${index}">${producto.cantidad}</span>
                        <button type="button" class="btn-sumar" data-index="${index}">+</button>
                    </div>
                    <div class="acciones-item">
                        <button type="button" class="btn-editar" data-index="${index}">Editar</button>
                        <button type="button" class="btn-borrar" data-index="${index}">Borrar</button>
                    </div>
                </div>
            </li>
        `;
    });

    listaProductos.innerHTML = html;
}

// Inicializar la lista de productos al cargar la página
renderProductos();


// Agregar producto desde el formulario
formProducto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("producto").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const categoria = document.getElementById("categoria").value;

    if (!nombre || isNaN(cantidad) || cantidad <= 0) {
        Toastify({
            text: "Por favor, completa todos los campos correctamente.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
        return;
    }

    // Si ya existe el producto, actualizar cantidad
    const productoExistente = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (productoExistente) {
        productoExistente.cantidad += cantidad;

        Toastify({
            text: `Se actualizó la cantidad de ${nombre}.`,
            duration: 3000, 
            gravity: "top",
            position: "right",
            backgroundColor: "#536620",
        }).showToast();

    } else {
        const nuevoProducto = { nombre, cantidad, categoria };
        productos.push(nuevoProducto);

        Toastify({
            text: `Producto ${nombre} agregado.`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#536620",
        }).showToast();
    }

    // Guardar
    guardarProductos();
    renderProductos();

    // Borrar el formulario
    formProducto.reset();
});

// Función para renderizar lista de productos
listaProductos.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.dataset.index !== undefined ? parseInt(target.dataset.index, 10) : null;

    if (target.classList.contains("btn-sumar") && index !== null) {
        productos[index].cantidad++;
        guardarProductos();
        renderProductos();
        return;
    }

    if (target.classList.contains("btn-restar") && index !== null) {
        if (productos[index].cantidad > 1) {
            productos[index].cantidad--;
            guardarProductos();
            renderProductos();
            return;
        }
    }
    
    if (target.classList.contains("btn-borrar") && index !== null) {
        Swal.fire({
            title: "¿Deseas borrar este producto?",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                productos.splice(index, 1);
                guardarProductos();
                renderProductos();
                Swal.fire("¡Borrado!", "El producto ha sido borrado.", "success");
            }
        });
        return;
    }

    if (target.classList.contains("btn-editar") && index !== null) {
        const p = productos[index];

        Swal.fire({
            title: "Editar Producto",
            html:
                `<input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${p.nombre}">
                <input id="swal-cantidad" type="number" class="swal2-input" placeholder="Cantidad" value="${p.cantidad}">
                <select id="swal-categoria" class="swal2-select">
                ${categorias.map(c => `<option value="${c.toLowerCase()}" ${c.toLowerCase() === p.categoria ? "selected" : ""}>${c}</option>`).join("")}
                </select>`,
                
                showCancelButton: true,
                confirmButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                    const nombre = document.getElementById("swal-nombre").value.trim();
                    const cantidad = parseInt(document.getElementById("swal-cantidad").value);
                    const categoria = document.getElementById("swal-categoria").value;

                    if (!nombre || isNaN(cantidad) || cantidad <= 0) {
                        Swal.showValidationMessage("Por favor, completa todos los campos correctamente.");
                        return false;
                    }
                    
                    return { nombre, cantidad, categoria };     
                }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const { nombre, cantidad, categoria } = result.value;

                const productoExistente = productos.find((prod, i) => prod.nombre.toLowerCase() === nombre.toLowerCase() && i !== index);
                if (productoExistente) {
                    Swal.fire("Error", "Ya existe un producto con ese nombre.", "error");
                    return;
                } else {
                productos[index].nombre = nombre;
                productos[index].cantidad = cantidad;
                productos[index].categoria = categoria;
                Toastify({
                    text: `Producto ${nombre} actualizado.`,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#536620",
                }).showToast();
                }

                guardarProductos();
                renderProductos();
            }
        });
        return;
    }
});

// Crear y guardar lista de productos
botonCrearLista.addEventListener("click", () => {
    const nombreLista = inputLista.value.trim();
    if (!nombreLista) {
        Toastify({
            text: "Por favor, ingresa un nombre para la lista.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
        return;
    }
    if (productos.length === 0) {
        Toastify({
            text: "La lista de productos está vacía.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
        return;
    }

    const nuevaLista = { nombre: nombreLista, productos: JSON.parse(JSON.stringify(productos)) }; // snapshot
    listas.push(nuevaLista);
    guardarListas();


    // Limpiar
    productos = [];
    guardarProductos();
    renderProductos();
    inputLista.value = "";

    Toastify({
        text: `Lista "${nombreLista}" creada.`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#536620",
    }).showToast();
});


// Borrar la lista actual
botonBorrarTodo.addEventListener("click", () => {
    Swal.fire({
        title: "¿Deseas borrar toda la lista de productos?",
        text: "Borrarás todos los productos agregados.",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            productos = [];
            guardarProductos();
            renderProductos();
            Swal.fire("¡Lista borrada!", "La lista de productos ha sido borrada.", "success");
        }
    });
});
