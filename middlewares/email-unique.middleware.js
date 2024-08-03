const { response } = require("express");
const Usuario = require("../models/usuario")

const uniqueEmail = async (req, res = response, next) => {

    const { email } = req.body
    try {
        const usuario = await Usuario.findOne({email});
        console.log({ usuario: usuario });
        if (usuario !== null) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya se encuentra registrado",
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al verificar el email. Favor de intentar mas tarde",
        });        
    }
    next();
}


module.exports = { uniqueEmail };