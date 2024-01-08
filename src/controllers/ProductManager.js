// importamos file sytem
const fs = require('fs');

class ProductManager {
  static ultimoId = 0;
  // Constructor
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  // método de agregar producto
  async addProduct(product) {
    const { title, description, price, status = true, category, thumbnail, code, stock } = product;

    this.products = await this.leerArchivo();

    // validamos que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      throw new Error('Todos los campos son obligatorios!!');
      return;
    }
    // validamos que el campo code no este repetido
    if (this.products.some((product) => product.code === code)) {
      throw new Error('El código debe ser único');
      return;
    }

    // obtenemos el ultimo id y lo asignamos a la clase
    const lastIdSaved = await this.obtenerUltimoId();
    ProductManager.ultimoId = lastIdSaved + 1;

    // creamos productos para probar las clases
    const newProduct = {
      id: ProductManager.ultimoId,
      title: title,
      status: status,
      category: category,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    // agregamos el nuevo producto al array
    this.products.push(newProduct);

    // agregamo el nuevo producto al archivo
    await this.guardarArchivo(this.products);
  }

  // método get productos
  getProducts() {
    return this.products;
  }

  // método getProductById
  async getProductById(idPametro) {
    try {
      const productos = await this.leerArchivo();
      const encontrado = productos.find((item) => item.id === idPametro);
      return encontrado || 'Producto no encontrado';
    } catch (error) {
      console.log('Problemas al leer el archivo ', error);
    }
  }

  //función para leer archivos
  async leerArchivo() {
    try {
      // convertimos
      const respuesta = fs.readFileSync(this.path, 'utf-8');
      // convertimos la respuesta en un objeto de JavaScript
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log('Error al leer el archivo ', error);
    }
  }

  async guardarArchivo(array) {
    try {
      // convertimos el array en una cadena en formato JSON
      const objetoJSON = JSON.stringify(array, null, 2);
      fs.writeFileSync(this.path, objetoJSON);
    } catch (error) {
      console.log(console.log('error al guardar el array '), error);
    }
  }

  // actualizar producto
  async updateProduct(idParam, productUpdate) {
    try {
      const productos = await this.leerArchivo();
      const index = productos.findIndex((i) => i.id == idParam);
      if (index != -1) {
        productos.splice(index, 1, productUpdate);
        await this.guardarArchivo(productos);
      } else {
        console.log('El id ingresado no fue encontrado');
      }
    } catch (error) {
      console.log('Error al actualizar el producto', error);
    }
  }

  // eliminar producto
  async deleteProduct(idParam) {
    try {
      let productos = await this.leerArchivo();
      const index = productos.findIndex((i) => i.id == idParam);
      if (index !== -1) {
        productos = productos.filter((producto) => producto.id !== idParam);
        await this.guardarArchivo(productos);
      } else {
        console.log('El id ingresado no fue encontrado');
      }
    } catch (error) {
      console.log('El id ingresado no es correcto');
    }
  }

  async obtenerUltimoId() {
    const productos = await this.leerArchivo();
    return productos.length > 0 ? Math.max(...productos.map((producto) => producto.id)) : 0;
  }
}

module.exports = ProductManager;
