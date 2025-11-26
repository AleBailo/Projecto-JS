// Login
// Botones del DOM
const formLogin = document.getElementById('formLogin');
const botonRegistro = document.getElementById('botonRegistro');

// Usuarios en el localStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Inicio de sesión
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioIngresado = document.getElementById('usuario').value;
    const passwordIngresada = document.getElementById('password').value;

    // Validaciones
    const usuarioValido = usuarios.find (user => user.usuario === usuarioIngresado && user.password === passwordIngresada);
    if (usuarioValido) {
         Toastify({
            text: "Bienvenido " + usuarioIngresado,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#536620",
        }).showToast();

        formLogin.reset();

        // Redirigir a listas
        setTimeout(() => {
            window.location.href = './pages/listas.html';
        }, 1500);
    }
    else {
        Toastify({
            text: "Usuario o contraseña incorrectos",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
    }
});

// Ir al registro
botonRegistro.addEventListener('click', () => {
    window.location.href = './pages/registro.html';
});
