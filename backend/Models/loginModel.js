const conectar= require('../config/database');


async function buscarCorreo(correo) {
    const sql=`
    SELECT * FROM usuario 
    WHERE correo = ?
    `;
    const db= await conectar();
    const [filas]= await db.execute(sql, [
        correo
    ]);
    return filas[0];
}

module.exports= {
    buscarCorreo
};