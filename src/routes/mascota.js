// routes/entidad.js
const express = require('express');
const entidadSchema = require('../models/mascota');

const router = express.Router();

// Create mascota

router.post("/mascotas", (req, res) => {
    const entidad = new entidadSchema(req.body);
    entidad 
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json( {message: error} ));
});

// Get all entidades

router.get("/mascotas", (req, res) => {
    entidadSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json( {message: error} ));
});

// Get a entidad

router.get("/mascotas/:id", (req, res) => {
    const { id } = req.params;
    entidadSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json( {message: error} ));
});

// Update a entidad

router.put("/mascotas/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, edad, comidas } = req.body;

    entidadSchema
        .updateOne( { _id: id }, { $set: { nombre, tipo, edad, comidas } })
        .then((data) => res.json(data))
        .catch((error) => res.json( {message: error} ));
});

// Agregar nuevas comidas a una mascota existente
router.put("/mascotas/:id/comidas", (req, res) => {
    const { id } = req.params;
    const { comidas } = req.body;

    entidadSchema
        .findByIdAndUpdate(
            id,
            { $addToSet: { comidas: { $each: comidas } } },
            { new: true }
        )
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: "Entidad no encontrada" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Delete a entidad

router.delete("/mascotas/:id", (req, res) => {
    const { id } = req.params;
    entidadSchema
        .deleteOne( { _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json( {message: error} ));
});

module.exports = router;