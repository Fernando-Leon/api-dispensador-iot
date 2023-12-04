
const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  comidas: [
    {
      cantidad: {
        type: Number,
        required: false,
      },
      fecha: {
        type: Date,
        default: Date.now,
      },
    }
  ],
});

module.exports = mongoose.model('Mascota', mascotaSchema);
