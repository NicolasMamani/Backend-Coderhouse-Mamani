const express = require('express');
const router = express.Router();
const ProductManager = require('../controllers/ProductManager');
const manager = new ProductManager('src/models/productos.json');

// get para productos con limit
router.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await manager.readFile();
    if (limit) {
      let limitedArray = [];
      for (let i = 0; i < limit; i++) {
        limitedArray.push(products[i]);
      }
      return res.send(limitedArray);
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
    const found = await manager.getProductById(id);
    if (found && found != 'Producto no encontrado') {
      return res.send(found);
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
    res.status(201).json({ message: 'Producto agregado correctamente', product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/products/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const productUpdate = await manager.updateProduct(id, req.body);
    res.status(200).json({ message: 'Producto actualizado correctamente', product: productUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/products/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const deletedProduct = await manager.deleteProduct(id);
    res.status(200).json({ message: 'Producto eliminado correctamente', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
