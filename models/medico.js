const { Schema, model } = require("mongoose")

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    telefono: {
        type: Number,
        required: true,
    },
    creadoPor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creadoEl: {
        type: Date
    },
    comentarios: [
        { author: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }, 
        comentario: String, 
        creadoEl: Date }
    ],
    estaActivo: Boolean,
    meta: {
      votos: Number,
      favoritos:  Number
    }
}, {collection: 'medicos'})


MedicoSchema.method('toJSON', function()  {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Medico', MedicoSchema)