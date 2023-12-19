const PUERTO = 8080;
const express = require("express");
const ProductManager = require("./ProductManager");

//creamos productos

const manager = new ProductManager("./src/productos.json");

// creamos el servidor
const app = express();

// get para productos con limit
app.get("/products", async (req, res) => {
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
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// get para un producto especifico
app.get("/products/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const encontrado = await manager.getProductById(id);
    if (encontrado && encontrado != "Producto no encontrado") {
      return res.send(encontrado);
    } else {
      res.status(404).json({ error: "El producto no existe" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PUERTO, () => {
  console.log("Escuchando en el http://localhost:8080/products");
});
