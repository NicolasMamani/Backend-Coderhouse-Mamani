const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/db/product-manager-db');
const manager = new ProductManager('');

router.get('/', async (req, res) => {
  try {
    let products = [];
    products = await manager.getProducts();
    console.log('products', products);
    res.render('index', { products });

  } catch (error) {
    res.status(500).json('Error interno del servidor: '+ error);
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    res.render('realTimeProducts');
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/chat',(req,res)=>{
  res.render("chat");
});

module.exports = router;
