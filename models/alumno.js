const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    identidad: {
        type: String,
        required: true
    },
    Nombres: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    Direccion: {
        type: String,
        required: true
    },
    Telefono: {
        type: String,
        required: true
    },
    FechaNac: {
        type: Date,
        required: true
    },
});

AlumnoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('alumno', AlumnoSchema);