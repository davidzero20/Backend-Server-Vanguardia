const {Schema, model} = require('mongoose');

const MatriculaSchema = Schema({
    Identidad: {
        type: String,
        required: true
    },
    TipoAlumno: {
        type: String,
        required: true
    },
    Periodo: {
        type: String,
        required: true
    },
    Nivel: {
        type: String,
        required: true
    },
    Seccion: {
        type: String,
        required: true
    },
    Maestro: {
        type: String,
        required: true
    },

});

MatriculaSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('matricula', MatriculaSchema);