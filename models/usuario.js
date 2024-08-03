const { type } = require("express/lib/response");
const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    estaActivo: Boolean,
    password: {
        type: String,
        required: true,
    }
}, {collection: 'usuarios'});


UsuarioSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Usuario', UsuarioSchema);