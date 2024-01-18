const express = require('express');
const router = express.Router();
const ProductManager = require('../controllers/ProductManager');
const manager = new ProductManager('src/models/productos.json');

router.get('/', async (req, res) => {
  const products = await manager.readFile();
  res.render('index', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    res.render('realTimeProducts');
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
