const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {getMatriculas, crearMatricula, actualizarMatricula, borrarMatricula} = require('../controllers/matricula');
const router = Router();

//GET - MOSTRAR MATRICULAS
router.get('/', getMatriculas);

//POST - INSERTAR MATRICULAS
router.post('/', [
    check('Identidad','La Identidad es obligatoria').not().isEmpty(),
    check('TipoAlumno','El Tipo de Alumno es obligatorio').not().isEmpty(),
    check('Periodo','El Periodo es obligatorio').not().isEmpty(),
    check('Nivel','El Nivel es obligatorio').not().isEmpty(),
    check('Seccion','La Seccion es obligatoria').not().isEmpty(),
    check('Maestro','El Maestro es obligatorio').not().isEmpty(),

    validarCampos
], crearMatricula);

//PUT - ACTUALIZAR MATRICULAS
router.put('/:id', actualizarMatricula);

//DELETE - BORRAR MATRICULAS
router.delete('/:id', borrarMatricula);

module.exports = router;