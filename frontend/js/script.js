async function manejarLogin(e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value;

    try {
        const respuesta = await fetch('/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo, password
            })
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            window.location.href = 'perfil.html';
        }
        else {
            alert(resultado.mensaje || 'Error al iniciar sesión');
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-login');
    formulario.addEventListener('submit', manejarLogin);
});