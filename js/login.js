//Login
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formlogin");
    const botonRegistro = document.getElementById("botonRegistro");
    const mensajeDiv = document.createElement("div");
    document.body.appendChild(mensajeDiv);

    // Cargar usuarios del localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;

        // Validar información
        const usuarioValido = usuarios.find(user => user.usuario === usuario && user.password === password);
        if (usuarioValido) {
            mostrarMensaje("Inicio de sesión exitoso.", "success");
            formLogin.reset();

            // Aquí redirigir a otra página
            setTimeout(() => {
                window.location.href = "./pages/ingreso.html";
            }, 2000);
        } else {
            mostrarMensaje("Usuario o contraseña incorrectos.", "error");
        }
    });

    // Botón para ir a la página de registro
    botonRegistro.addEventListener("click", () => {
        window.location.href = "./pages/registro.html";
    });

    // Mostrar mensajes al usuario
    function mostrarMensaje(mensaje, tipo) {
        mensajeDiv.textContent = mensaje;
        mensajeDiv.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";
    }
}); 