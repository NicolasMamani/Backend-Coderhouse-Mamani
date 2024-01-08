const express = require('express');
const router = express.Router();
const ProductManager = require('../controllers/ProductManager');
const manager = new ProductManager('src/models/productos.json');

// get para productos con limit
router.get('/products', async (req, res) => {
  try {
    const limite = parseInt(req.query.limit);
    const products = await manager.leerArchivo();
    if (limite) {
      let arrayConLimite = [];
      for (let i = 0; i < limite; i++) {
        arrayConLimite.push(products[i]);
      }
      return res.send(arrayConLimite);
    }
    return res.send(products);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// get para un producto especifico
router.get('/products/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const encontrado = await manager.getProductById(id);
    if (encontrado && encontrado != 'Producto no encontrado') {
      return res.send(encontrado);
    } else {
      res.status(404).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const productReq = req.body;
    const product = await manager.addProduct(productReq);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
