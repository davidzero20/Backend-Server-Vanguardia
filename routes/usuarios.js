//Ruta a utilizar: /api/usuarios
const { Router, response } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario,actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const usuario = require('../models/usuario');
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos')

router.get('/', getUsuarios);

//POST - Insertar
router.post('/', [
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    check('password','El Password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),

],
crearUsuario);

//PUT - Actualizar
router.put('/:id',
    [
        check ('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check ('email', 'El email es obligatorio').isEmail(),
        check ('role', 'El rol es obligatorio').isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

//Ruta del DELETE
router.delete('/:id',
    borrarUsuario
);

module.exports = router;