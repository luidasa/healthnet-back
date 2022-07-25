
const { response } = require('express');
const { contextsKey } = require('express-validator/src/base');

const req = require("express/lib/request");
const res = require("express/lib/response");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res) =>{ 

    const pagina = Number(req.query.page) || 0;
    const tamano = Number(req.query.size) || 10;

    const [hospitales, total] = await Promise.all([
        Hospital.find()
            .skip(pagina * tamano)
            .limit(tamano)
            .populate('creadoPor', 'nombre'), 
        Hospital.count()]) ;
    
    res.json({
        ok: true,
        hospitales,
        total,
        pagina,
        tamano
    });
}

const crearHospital = async (req, res = response) => {
    
    try {
        const { titulo } = req.body;
        const uid = req.uid;
        const existeHospital = await Hospital.findOne({titulo});
        if (existeHospital) {
            return res.status(400).json({
                ok: false,
                msg: 'El Hospital ya esta registrado'
            })
        }
        const hospital = new Hospital({creadoPor: uid, creadoEl: Date.now(), ...req.body});
        await hospital.save();

        res.json({
            ok: true,
            hospital
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

const modificarHospital = async( req, res = response) => {

    const uid = req.params.id;

    try {

        const hospitalBD = await Hospital.findById(uid);

        if ( !hospitalBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no existe'
            })
        }

        hospitalActualizado = await Hospital.findByIdAndUpdate(uid, req.body, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarHospital = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const hospitalBD = await Hospital.findById(uid);

        if ( !hospitalBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no existe'
            })
        }

        await Hospital.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            uid: uid,
            msg: 'Hospital borrado'
        })
            
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error inesperado'
        })
            
    }
}


module.exports = {
    getHospitales, 
    crearHospital, 
    modificarHospital, 
    borrarHospital
};