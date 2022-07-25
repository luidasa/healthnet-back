const { Router } = require('express');

const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.middleware')

const { getMedicos, crearMedico, modificarMedico, borrarMedico } = require('../controllers/medicos.controller');
const { validarJwt } = require('../middlewares/validar-jwt.middleware');

const router = Router();

router.get('/',
    [validarJwt],
    getMedicos);

router.post('/', 
    [
        validarJwt,
        check('titulo', 'El titulo es obligatorio').notEmpty(),
        check('descripcion', 'La descripción es obligatorio').notEmpty(),
        check('precio', 'El precio es obligatorio').isNumeric(),
        validarCampos
    ],
    crearMedico);

router.put('/:id', 
    [
        validarJwt,
        check('titulo', 'El titulo es obligatorio').notEmpty(),
        check('descripcion', 'La descripción es obligatorio').isEmail(),
        check('precio', 'El precio es obligatorio').notEmpty(),
        validarCampos
    ],
    modificarMedico);

router.delete('/:id', [validarJwt], borrarMedico);

// Exportamos todo las rutas que se han definido en el router, para este modulo
module.exports = router;