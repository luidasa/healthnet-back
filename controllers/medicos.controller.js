
const { response } = require('express');
const { contextsKey } = require('express-validator/src/base');

const req = require("express/lib/request");
const res = require("express/lib/response");
const Medico = require("../models/medico");

const getMedicos = async (req, res) =>{ 

    const pagina = Number(req.query.page) || 0;
    const tamano = Number(req.query.size) || 10;

    const [medicos, total] = await Promise.all([
        Medico.find()
            .skip(pagina * tamano)
            .limit(tamano)
            .populate('creadoPor', 'nombre'), 
        Medico.count()]) ;
    x
    res.json({
        ok: true,
        medicos,
        total,
        pagina,
        tamano
    });
}

const crearMedico = async (req, res = response) => {
    
    try {
        const { nombre } = req.body;
        const uid = req.uid;
        const existeMedico = await Medico.findOne({nombre});
        if (existeMedico) {
            return res.status(400).json({
                ok: false,
                msg: 'El Medico ya esta registrado'
            })
        }
        const medico = new Medico({creadoPor: uid, creadoEl: Date.now(), ...req.body});
        await medico.save();

        res.json({
            ok: true,
            medico
       })
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: req.body,
            error,
            msg: error.toString()
       })
        
    }
}

const modificarMedico = async( req, res = response) => {

    const uid = req.params.id;

    try {

        const medicoBD = await Medico.findById(uid);

        if ( !medicoBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no existe'
            })
        }

        medicoActualizado = await Medico.findByIdAndUpdate(uid, req.body, {new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarMedico = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const medicoBD = await Medico.findById(uid);

        if ( !medicoBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no existe'
            })
        }

        await Medico.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            uid: uid,
            msg: 'Medico borrado'
        })
            
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error inesperado'
        })
            
    }
}


module.exports = {
    getMedicos, 
    crearMedico, 
    modificarMedico, 
    borrarMedico
};