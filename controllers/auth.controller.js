const { response } = require('express');

const Usuario = require("../models/usuario");

const bcrypt = require('bcryptjs');

const { generarToken } = require('../helpers/jwt');
const res = require('express/lib/response');

const login = async (req, res = response) => {

    const {email, password} = req.body;
    try {
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        // Ahora validamos la contraseña
        const isValid = bcrypt.compareSync(password, usuario.password);

        if (!isValid) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Aqui se va a generar el token.
        const token = await generarToken(usuario.id);

        res.json({
            ok: true,
            nombre: usuario.nombre,
            token
        })
        
    } catch (error) {
        console.log(error );
        return res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        });
    }
}


const signup = async (req, res = response) => {

    const { nombre, email, telefono, password } = req.body;
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const usuario = new Usuario({ nombre, email, telefono, password: hash })
    try {
        
        const usuarioBd = await usuario.save();
        return res.status(200).json({
            usuario: usuarioBd,
            ok: true,
            msg: 'Esta es un mensaje de prueba'
        });
    } catch {
        return res.status(200).json({
          ok: false,
          msg: "Ocurrio un error al guardar el documento. Intente mas tarde.",
        });

    }

}

const findByEmail = async (req, res = response) => {
 
    const { email } = req.body

    try {
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return res.status(404).json({
          ok: false,
          msg: "El usuario no existe",
        });
      }

      res.json(usuario);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Error inesperado.",
      });
    }
}

const findByPhone = async (req, res = response) => {
  const { telefono } = req.body;

  try {
    const usuario = await Usuario.findOne({ telefono });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};


module.exports = {
    login,
    signup,
    findByEmail,
    findByPhone
}