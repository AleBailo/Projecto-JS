// Login
// DOM
const formLogin = document.getElementById("formLogin");
const botonRegistro = document.getElementById("botonRegistro");

formLogin.querySelector('button[type="submit"]').disabled = true;
cargarUsuarios();

// Cargar usuarios creados desde json con fetch
let usuariosJASON = [];
async function cargarUsuarios() {
    try {
        const res = await fetch("./data/data.json");
        const data = await res.json();
        usuariosJASON = data.usuarios || [];
        formLogin.querySelector('button[type="submit"]').disabled = false;
    } catch (err) {
        console.error(err);
    }
}

// Usuarios en el localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Inicio de sesión
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioIngresado = document.getElementById("usuario").value;
    const passwordIngresada = document.getElementById("password").value;
    const usuariosTodos = [...usuarios, ...usuariosJASON];

    // Validaciones
    const usuarioValido = usuariosTodos.find(user => user.usuario === usuarioIngresado && user.password === passwordIngresada);
    if (usuarioValido) {
        Toastify({
            text: "Bienvenido " + usuarioIngresado,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#536620"
            }
        }).showToast();

        formLogin.reset();

        // Redirigir a listas
        setTimeout(() => {
            window.location.href = "./pages/listas.html";
        }, 1500);
    }
    else {
        Toastify({
            text: "Usuario o contraseña incorrectos",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#FF0000"
            }
        }).showToast();
    }
});

// Ir al registro
botonRegistro.addEventListener("click", () => {
    window.location.href = "./pages/registro.html";
});
