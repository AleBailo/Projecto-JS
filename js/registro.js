// Registro de usuario
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("formRegistro");
    const botonVolver = document.getElementById("botonVolver");

    // Si hay usuarios ya guardados en el localStorage, los cargamos
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Validar que las contraseñas coincidan
        if (!email || !usuario || !password || !confirmPassword) {
            mostrarMensaje("Por favor, completa todos los campos.", "error");
            return;
        }

        if (password !== confirmPassword) {
            mostrarMensaje("Las contraseñas no coinciden.", "error");
            return;
        }

        // Validar si el usuario ya existe
        const usuarioExistente = usuarios.find(user => user.usuario === usuario || user.email === email);
        if (usuarioExistente) {
            mostrarMensaje("El usuario o email ya existe.", "error");
            return;
        }

        // Guardar nuevo usuario
        const nuevoUsuario = { email, usuario, password };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mostrarMensaje("Registro exitoso. Ya podes iniciar sesión.", "success");
        formRegistro.reset();

        // Redirigir a la página de inicio de sesión después del registro
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 8000);
    });

    // Botón volver a la página de login
    botonVolver.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

    // Mostrar mensajes al usuario
    function mostrarMensaje(mensaje, tipo) {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.textContent = mensaje;
        mensajeDiv.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";
        document.body.appendChild(mensajeDiv);
    }
});







