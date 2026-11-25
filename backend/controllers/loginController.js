const loginModel= require ('../Models/loginModel');

async function login(req, res) {
    try{
        const {correo, password}= req.body;
        if(!correo || !password){
            return res.status(400).json({
                mensaje: 'Faltan las crendenciales'
            });
        }
        const usuario=await loginModel.buscarCorreo(correo.trim());

        if(!usuario || usuario.password !== password){
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        }

        req.session.usuario= {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo
        };
        res.json({
            mensaje: "Inicio de sesion exitoso",
            usuario: req.session.usuario
        });
    }
    catch (error){
        console.error('Error en el login:', error);
        res.status(500).json({
            mensaje: 'Error al iniciar sesion'
        });
    }
}

function obtenerPerfil(req, res){
    if (!req.session.usuario){
        return res.status(401).json({
            mensaje: 'Debes iniciar sesión'
        });
    }

    res.json({
        mensaje: 'Perfil de usuario',
        usuario: req.session.usuario
    });
}

function logout(req, res){
    req.session.destroy((error) =>{
        if (error){
            return res.status(500).json({
                mensaje: 'No se pudo cerrar la sesion'
            });
        }

        res.clearCookie('session.sid', {
            path: '/',
            sameSite: 'lax',
            secure: false
        });

        res.json({
            mensaje: 'Se cerro la sesion correctamente'
        });
    });
}

module.exports={
    obtenerPerfil,
    login,
    logout
};
