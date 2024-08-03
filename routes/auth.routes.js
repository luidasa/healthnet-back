const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { login, signup, findByEmail, findByPhone } = require("../controllers/auth.controller");
const { uniqueEmail } = require("../middlewares/email-unique.middleware");
const { uniquePhone } = require("../middlewares/telefono-unique.middleware");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es un dato requerido").notEmpty(),
    check("password", "La contraseña es un dato requerido").notEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/signup",
  [
    check("nombre", "El nombre es un dato requerido").notEmpty(),
    check("email", "El email es un dato requerido").isEmail(),
    check("password", "La contraseña es un dato requerido").notEmpty(),
    check("telefono", "El telefono es un dato requerido").notEmpty(),
    uniqueEmail,
    uniquePhone,
    validarCampos,
  ],
  signup
);

router.post(
  "/findByPhone",
  [
    check("telefono", "El telefono es un dato requerido").notEmpty(),
    validarCampos,
  ],
  findByPhone
);

router.post(
  "/findByEmail",
  [
    check("email", "El email es un dato requerido").isEmail(), 
    validarCampos,
  ],
  findByEmail
);


// Exportamos todo las rutas que se han definido en el router, para este modulo
module.exports = router;
