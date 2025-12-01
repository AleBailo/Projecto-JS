//Registro
// Botones del DOM
const formRegistro = document.getElementById("formRegistro");
const botonVolver = document.getElementById("botonVolver");

// Usuarios en el localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Registro de usuario
formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validaciones
    // Si hay campos vacíos
    if (!email || !usuario || !password || !confirmPassword) {
        Toastify({
            text: "Por favor, completa todos los campos.",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#FF0000"
            }
        }).showToast();
        return;
    }

    // Si las contraseñas no coinciden
    if (password !== confirmPassword) {
        Toastify({
            text: "Las contraseñas no coinciden.",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#FF0000"
            }
        }).showToast();
        return;
    }

    // Si el usuario ya existe
    const usuarioExiste = usuarios.find(user => user.usuario === usuario || user.email === email);
    if (usuarioExiste) {
        Toastify({
            text: "El usuario o email ya están registrados.",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#FF0000"
            }
        }).showToast();
        return;
    }

    // Nuevo usuario
    const nuevoUsuario = {
        email,
        usuario,
        password
    };

    // Guardarlo en el localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Notificación de Toastify
    Toastify({
        text: "Registro exitoso",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#536620"
        }
    }).showToast();

    formRegistro.reset();

    // Redirigir a inicio de sesión
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1500);

});

// Volver a la página anterior
botonVolver.addEventListener("click", () => {
    window.location.href = "../index.html";

});






