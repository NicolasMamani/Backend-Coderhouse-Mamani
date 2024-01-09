# Backend-Coderhouse

Alumno : Nicolas Mamani

Comisión : 50015

## Productos

### GET para obtener los productos

Endpoint: http://localhost:8080/api/products/1

### POST para un producto

Endpoint : http://localhost:8080/api/products/

```JSON
{
    "title": "Teclado T Dagger Bora",
    "description": "Este es un teclado mecanico y economico",
    "price": 320,
    "thumbnail": "Sin imagen",
    "code": "tdagger-bora",
    "status":true,
    "category":"tecnologia",
    "stock": 11
}
```

### PUT para un producto

Endpoint : http://localhost:8080/api/products/11

```JSON
{
        "id": 11,
        "title": "Teclado Generico Genius",
        "status": true,
        "category": "tecnologia",
        "description": "Este es un teclado de membrana y barato",
        "price": 150,
        "thumbnail": "Sin imagen",
        "code": "genius-membrana1",
        "stock": 100
}
```

### DELETE para producto

Endpoint : http://localhost:8080/api/products/10

## Carritos

### GET para Obtener los carritos

Endpoint : http://localhost:8080/api/carts/

### POST para crear carrito

Endpoint : http://localhost:8080/api/carts/

### POST para Agregar productos en un carrito basado en un id

Endpoint : http://localhost:8080/api/carts/1/product/2
