// importamos file sytem
const { log } = require('console');
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
    const { title, description, price, thumbnail, code, stock } = product;

    // validamos que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos son obligatorios!!');
      return;
    }

    // validamos que el campo code no este repetido
    if (this.products.some((product) => product.code === code)) {
      console.log('El código debe ser único');
      return;
    }

    // creamos productos para probar las clases
    const newProduct = {
      id: ProductManager.ultimoId++,
      title: title,
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
}

// Testing
async function test() {
  const manager = new ProductManager('./productos.json');

  // testing para getProducts() con instancia recién creada
  console.log(manager.getProducts());

  const ravioles = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  };
  manager.addProduct(ravioles);

  const arroz = {
    title: 'arroz',
    description: 'Este es un producto de arroz',
    price: 250,
    thumbnail: 'Sin imagen',
    code: 'arroz20',
    stock: 12,
  };

  manager.addProduct(arroz);

  const azucar = {
    title: 'azucar',
    description: 'Este es un producto de un paquete de azucar',
    price: 210,
    thumbnail: 'Sin imagen',
    code: 'azucar29',
    stock: 14,
  };

  manager.addProduct(azucar);

  // testing con los productos agregados
  console.log(manager.getProducts());

  // testing para buscar producto por id
  async function testeProductoPorId() {
    const encontrado = await manager.getProductById(0);
    console.log(encontrado);
  }

  testeProductoPorId();

  const cereal = {
    id: 1,
    title: 'cereal',
    description: 'cereal',
    price: 140,
    thumbnail: 'Sin imagen',
    code: 'cereal20',
    stock: 40,
  };

  // testing para actualizar

  async function testeamosActualizar() {
    await manager.updateProduct(1, cereal);
  }

  await testeamosActualizar();

  // testing para eliminar producto
  async function testeamosEliminar(id) {
    await manager.deleteProduct(id);
  }

  await testeamosEliminar(0);
}

test();
