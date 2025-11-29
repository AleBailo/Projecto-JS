// Crear listado de productos
// Elementos del DOM
const formProducto = document.getElementById('formProducto');
const listaProductos = document.getElementById('listaProductos');
const botonCrearLista = document.getElementById('botonCrearLista');
const botonBorrarTodo = document.getElementById('botonBorrarTodo');
const inputLista = document.getElementById('inputLista');
const misListas = document.getElementById('misListas');

// Datos del localStorage
let productos = JSON.parse(localStorage.getItem('productos')) || [];
let listas = JSON.parse(localStorage.getItem('listas')) || [];

// Guardar en localStorage
const guardarProductos = () => {
    localStorage.setItem('productos', JSON.stringify(productos));
};

const guardarListas = () => {
    localStorage.setItem('listas', JSON.stringify(listas));
};

const categorias = ["Lacteos", "Carnes", "Legumbres", "Cereales", "Verduras", "Frutas", "Bebidas", "Limpieza", "Cuidado personal", "Otro"];

// Función para renderizar productos agregados
function renderProductos() {
    listaProductos.innerHTML = "";
    productos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.classList.add("producto-item");

        const info = document.createElement("div");
        info.classList.add("producto-info");
        info.innerHTML = `<strong>${producto.nombre}</strong> - Categoría: ${producto.categoria}`;

        // Botones + y -
        const contador = document.createElement("div");
        contador.classList.add("contador");
        contador.innerHTML = `
        <button type="button" class="boton-restar" data-index="${index}">-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button type="button" class="boton-sumar" data-index="${index}">+</button>
        `;

        // Editar y borrar
        const acciones = document.createElement("div");
        acciones.classList.add("acciones");
        acciones.innerHTML = `
        <button type="button" class="boton-editar" data-index="${index}">Editar</button>
        <button type="button" class="boton-borrar" data-index="${index}">Borrar</button>
        `;

        const controles = document.createElement("div");
        controles.classList.add("controles");
        controles.appendChild(contador);
        controles.appendChild(acciones);

        li.appendChild(info);
        li.appendChild(controles);
        listaProductos.appendChild(li);
    });
}

// Agregar producto
formProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("producto").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const categoria = document.getElementById("categoria").value;

    if (!nombre || isNaN(cantidad) || cantidad <= 0) {
        Toastify({
            text: "Por favor, completa todos los camopos",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
        return;
    }

    // Producto existente, sumar cantidades
    const productoExistente = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (productoExistente) {
        productoExistente.cantidad += cantidad;

        Toastify({
            text: "Cantidad actualizada con éxito",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#536620",
        }).showToast();

    } else {
        productos.push({ nombre, cantidad, categoria });

        Toastify({
            text: "Producto agregado con éxito",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#536620",
        }).showToast();
    }

    guardarProductos();
    renderProductos();
    formProducto.reset();
});

// Eventos de botones en lista de productos
listaProductos.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.dataset.index !== undefined ? parseInt(target.dataset.index, 10) : null;

    // Botón sumar
    if (target.classList.contains("boton-sumar") && index !== null) {
        productos[index].cantidad++;
        guardarProductos();
        renderProductos();
        return;
    }

    // Botón restar
    if (target.classList.contains("boton-restar") && index !== null) {
        if (productos[index].cantidad > 1) {
            productos[index].cantidad--;
            guardarProductos();
            renderProductos();
            return;
        }
    }

    // Botón borrar
    if (target.classList.contains("boton-borrar") && index !== null) {
        Swal.fire({
            title: "¿Estás seguro de borrar este producto?",
            showCancelButton: true,
            confirmButtonText: "Borrar Producto",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                productos.splice(index, 1);
                guardarProductos();
                renderProductos();

                Toastify({
                    text: "Producto borrado",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#536620",
                }).showToast();
            }
        });
        return;
    }

    // Botón editar
    if (target.classList.contains("boton-editar") && index !== null) {

        Swal.fire({
            title: "Editar Producto",
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${p.nombre}">
                <input id="swal-cantidad" type="number" class="swal2-input" placeholder="Cantidad" value="${p.cantidad}">
                <select id="swal-categoria" class="swal2-select">
                    ${categorias.map(c =>
                        `<option value="${c.toLowerCase()}" ${c.toLowerCase() === p.categoria ? "selected" : ""}>${c}</option>`
                    ).join("")}
                </select>
            `,
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
            }).then(result => {
            if (result.isConfirmed && result.value) {
                const { nombre, cantidad, categoria } = result.value;

                const existe = productos.find((prod, i) =>
                    prod.nombre.toLowerCase() === nombre.toLowerCase() && i !== index
                );

                if (existe) {
                    Swal.fire("Error", "Ya existe un producto con ese nombre.", "error");
                    return;
                }

                productos[index] = { nombre, cantidad, categoria };

                Toastify({
                    text: "Producto actualizado correctamente",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#536620",
                }).showToast();

                guardarProductos();
                renderProductos();
            }
        });
        return;
    }
});

// Crear lista
botonCrearLista.addEventListener("click", () => {
    const nombreLista = inputLista.value.trim();
    if (!nombreLista) {
        Toastify({
            text: "Por favor, ingresa un nombre para la lista",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
        return;
    }

    if (productos.length === 0) {
        Toastify({
            text: "No hay productos para guardar en la lista",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
        return;
    }

    const nuevaLista = {
        nombre: nombreLista,
        productos: JSON.parse(JSON.stringify(productos))
    };

    listas.push(nuevaLista);
    guardarListas();

    productos = [];
    guardarProductos();
    renderProductos();
    inputLista.value = "";

    Toastify({
        text: "Lista creada con éxito",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#536620",
    }).showToast();

    renderListas();
});

// Borrar lista
botonBorrarTodo.addEventListener("click", () => {
    Swal.fire({
        title: "¿Deseas borrar toda la lista de productos?",
        text: "Esta acción borrará los productos agregados hasta el momento.",
        showCancelButton: true,
        confirmButtonText: "Borrar Todo",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            productos = [];
            guardarProductos();
            renderProductos();

            Toastify({
                text: "Lista de productos borrada con éxito",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#536620",
            }).showToast();
        }
    });
});

// Renderizar listas guardadas
function renderMisListas() {
    misListas.innerHTML = "";                               
    listas.forEach((lista, index) => {
        const li = document.createElement("li");
        li.classList.add("lista-item"); 
        li.innerHTML = `<strong>${lista.nombre}</strong> - ${lista.productos.length} productos
        <button type="button" class="boton-ver" data-index="${index}">Ver lista</button>
        <button type="button" class="boton-borrar-lista" data-index="${index}">Borrar</button>
        `;
        misListas.appendChild(li);
    });
}

renderMisListas();

// Abrir lista
misListas.addEventListener("click", (e) => {
    const target = e.target;
    
    // Ver lista
    if (target.classList.contains("boton-ver")) {
        const index = parseInt(target.dataset.index, 10);
        const lista = listas[index];

        productos = JSON.parse(JSON.stringify(lista.productos));
        guardarProductos();
        renderProductos();

        Toastify({
            text: `Lista "${lista.nombre}" cargada`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#536620",
        }).showToast();
        return;
    }

    // Borrar lista
    if (target.classList.contains("boton-borrar-lista")) {
        const index = parseInt(target.dataset.index, 10);
        Swal.fire({
            title: `¿Deseas borrar toda la lista"?`,
            showCancelButton: true,
            confirmButtonText: "Borrar Lista",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                listas.splice(index, 1);
                guardarListas();
                renderMisListas();

                Toastify({
                    text: "Lista borrada con éxito",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#536620",
                }).showToast();
            }
        });
        return;
    }
});
