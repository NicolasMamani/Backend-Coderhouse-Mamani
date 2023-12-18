const PUERTO = 8080;
const express = require("express");
const { ProductManager } = require("./ProductManager");

//creamos productos

const manager = new ProductManager("./src/productos.json");

// creamos el servidor
const app = express();

app.get("/products", async (req, res) => {
  try {
    const limite = parseInt(req.query.limit);
    const products = await manager.leerArchivo();
    if (limite) {
      let arrayConLimite = [];
      for (let i = 1; i <= limite; i++) {
        arrayConLimite.push(products[i]);
      }
      return res.send(arrayConLimite);
    }
    return res.send(products);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PUERTO, () => {
  console.log("Escuchando en el http://localhost:8080/");
});
