﻿# Backend-Coderhouse

Alumno : Nicolas Mamani

Comisión : 50015


# Instalación de proyecto
* Clonar el repositorio de Github

```
git clone https://github.com/NicolasMamani/Backend-Coderhouse-Mamani.git
```

* Una vez clonado, debes entrar a la carpeta y ejecutar

```
npm install
```

* Ahora debes correr el proyecto con el siguiente comando
```
npm run dev
```


### Variables de entorno

Para crear la variable de entorno debes dirigirte a la raíz del proyecto y crear un archivo `.env.development`
```
MONGO_URL=mongodb+srv://nico:coderhouse@cluster0.bgaiwth.mongodb.net/ecommerce?retryWrites=true&w=majority
ADMIN_EMAIL=adminCoder@coder.com
ADMIN_PASSWORD=adminCod3r123
PUERTO=8080
```

<!-- ## Endpoints

### Productos
`http://localhost:8080/products` 

parametros

* page=numero. Ej: `http://localhost:8080/api/products?page=2`
* limit=numero. Ej: `http://localhost:8080/api/products?limit=2`
* query={"parametro":"consulta"}. Ej `http://localhost:8080/api/products?query={"title":"Cámara"}`

### Carrito -->
