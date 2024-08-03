const { response } = require("express");
const Usuario = require("../models/usuario")

const uniquePhone = async (req, res = response, next) => {

    const {telefono} = req.body;
    try {        
        const usuario = await Usuario.findOne({telefono});
        console.log({usuario: usuario});
        if (usuario !== null) {
            return res.status(400).json({
                ok: false,
                msg: "El telefono ya se encuentra registrado",
            });
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Ocurrio un error al verificar el telefono. Intente mas tarde",
        });        
    }
    next();
}


module.exports = { uniquePhone };