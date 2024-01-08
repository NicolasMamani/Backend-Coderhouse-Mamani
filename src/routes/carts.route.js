const express = require('express');
const router = express.Router();
const ProductManager = require('../controllers/ProductManager');
const manager = new ProductManager('src/models/carrito.json');

// Rutas

router.get('/carts', async (req, res) => {
  try {
    const carts = await manager.leerArchivo();
    res.json(carts);
  } catch (error) {
    console.error('Fallo al obtener al carrillo');
    res.json({ error: 'Error del servidor' });
  }
});

module.exports = router;
