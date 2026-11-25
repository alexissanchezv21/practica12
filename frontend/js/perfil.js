async function cargarPerfil() {
    try {
        const respuesta = await fetch('/perfil');
        const datos = await respuesta.json();

        if (respuesta.ok) {
            document.getElementById('info-usuario').innerHTML = `
                <strong>Nombre:</strong> ${datos.usuario.nombre} <br>
                <strong>Correo:</strong> ${datos.usuario.correo}
            `;
        }
        else {
            alert(datos.mensaje);
            window.location.href = 'index.html';
        }
    }
    catch (error) {
        console.error('Error:', error);
        window.location.href = 'index.html';
    }
}

async function cerrarSesion() {
    try {
        const respuesta = await fetch('/logout', { method: 'POST' });
        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert(resultado.mensaje);
            window.location.href = 'index.html';
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarPerfil();

    const botonLogout = document.getElementById('btn-logout');
    botonLogout.addEventListener('click', cerrarSesion);
});