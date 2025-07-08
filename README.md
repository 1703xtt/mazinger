# 🤖 Mazinger E-commerce App

## Descripción del Proyecto

**Mazinger** es una aplicación web de comercio electrónico (e-commerce) robusta y modular, desarrollada con **React y Vite**. Ofrece una experiencia de compra interactiva para usuarios y un panel de administración eficiente para la gestión de productos.

La aplicación ahora incorpora una arquitectura de estado global mejorada:
* Utiliza **React Context API** para manejar de forma centralizada el estado de los productos y el carrito de compras.
* Implementa un **formulario reutilizable** para la adición y edición de productos, demostrando principios de desarrollo DRY (Don't Repeat Yourself) y modularidad.

Simula la interacción con una base de datos de productos a través de una API REST simulada (`mockapi.io`), y cuenta con un sistema de autenticación por roles para diferenciar las funcionalidades de clientes y administradores.

## Características

### Para Todos los Usuarios (Público)

* **Página de Inicio:** Información general sobre la tienda.
* **Listado de Productos:** Explora todos los productos disponibles en la tienda.
* **Detalle del Producto:** Visualiza información detallada de cada producto, incluyendo su descripción y precio.
* **Información de Contacto y "Acerca de":** Secciones estáticas con datos de la empresa.

### Para Usuarios Autenticados (Clientes)

* **Inicio de Sesión:** Accede a la aplicación con credenciales de cliente.
* **Carrito de Compras:** Agrega productos, visualiza el subtotal, elimina ítems y finaliza la compra. El carrito se gestiona globalmente y se vacía al cerrar sesión o confirmar la compra.

### Para Administradores

* **Inicio de Sesión como Admin:** Accede a un panel de control con privilegios especiales.
* **Área de Administración:** Una sección exclusiva para administradores.
* **Gestión Centralizada de Productos:** Utiliza un único **formulario reutilizable** para:
    * **Agregar Productos:** Añade nuevos productos al inventario, con validaciones en los campos.
    * **Editar Productos:** Modifica o remueve productos existentes de la base de datos simulada.
* **Eliminar Productos:** Función para remover productos directamente desde la lista de administración.

## Tecnologías Utilizadas

* **React.js:** Biblioteca principal para construir la interfaz de usuario.
* **Vite:** Herramienta de construcción rápida para proyectos React.
* **React Router DOM:** Para la navegación y el enrutamiento dentro de la aplicación.
* **Context API de React:** **Implementación clave para la gestión global de estados**, incluyendo:
    * `AuthContext`: Para la autenticación de usuarios y roles.
    * `ProductsContext`: Para el estado de los productos y el carrito de compras.
* **MockAPI.io:** API REST simulada utilizada como backend para los datos de productos.
* **CSS Puro:** Para los estilos de la aplicación, organizados en archivos modulares.

## Instalación

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd mazinger-ecommerce
    ```
    *(Reemplaza `<URL_DEL_REPOSITORIO>` con la URL real de tu repositorio si lo tienes en GitHub, GitLab, etc.)*
2.  **Instala las dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```
3.  **Inicia la aplicación en modo desarrollo:**
    ```bash
    npm run dev
    # o
    yarn dev
    ```
    La aplicación se abrirá automáticamente en tu navegador en `http://localhost:5173` (o un puerto similar).

## Uso

### Credenciales de Acceso

Para probar las diferentes funcionalidades, puedes usar las siguientes credenciales:

* **Usuario (Cliente):**
    * **Correo:** `juan@ejemplo.com`
    * **Contraseña:** `12345`

* **Administrador:**
    * **Correo:** `admin@gmail.com`
    * **Contraseña:** `test2`

### Navegación y Funcionalidades

* Utiliza la barra de navegación superior para moverte entre las diferentes secciones.
* Si inicias sesión como **cliente**, podrás ver y utilizar la sección "Carrito".
* Si inicias sesión como **administrador**, se habilitarán enlaces adicionales en la navegación para "Admin", "Agregar Producto" y "Editar/Eliminar Productos". La adición y edición de productos ahora se realiza a través de un **único formulario centralizado**.

## Estructura del Proyecto (Resumida)

public/   # Archivos estáticos
src/components/About.jsx
src/components/Admin.jsx
src/components/AdminProductos.jsx   # Gestión de productos (editar/eliminar)
src/components/AgregarProducto.jsx   # Formulario para añadir productos
src/components/Card.jsx    # Tarjeta individual de producto
src/components/Carrito.jsx   # Componente del carrito de compras
src/components/Contacto.jsx
src/components/Footer.jsx
src/components/Header.jsx
src/components/Login.jsx   # Formulario de inicio de sesión
src/components/Main.jsx
src/components/Nav.jsx   # Barra de navegación
src/components/ProductForm.jsx    # Formulario reutilizable para agregar/reutilizar productos ##NUEVO##
src/components/ProductoDetalle.jsx   # Vista detallada de un producto
src/components/ProductosContainer.jsx   # Contenedor de la cuadrícula de productos
src/components/ProtectedRoute.jsx   # Ruta protegida genérica
src/components/RutaProtegida.jsx   # Ruta protegida genérica (similar a ProtectedRoute)
src/components/RutaProtegidaAdmin.jsx   # Ruta protegida para administradores
src/context/AuthContext.jsx    # Contexto de autenticación para toda la app
src/context/ProductsContext    #Contexto para el estado global de productos y carrito  ##NUEVO##
src/layouts/Home.jsx   # Layout principal (contiene Header, Nav, Main, Footer, etc.)
src/styles/ProductoDetalle.css   # Estilos para el detalle de producto
src/styles/Productos.css   # Estilos para las tarjetas y la cuadrícula de productos
src/App.css   # Estilos globales de la app 
src/App.jsx   # Componente principal que define las rutas
src/index.css    # Estilos CSS generales
src/main.jsx   # Punto de entrada de la aplicación
index.html   # Archivo HTML principal
package.json   # Dependencias y scripts del proyecto

## API Externa

La aplicación utiliza la siguiente API REST simulada de `mockapi.io` para la gestión de productos:

* **URL Base:** `https://68123d883ac96f7119a76234.mockapi.io/productos`

Esta API permite operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los productos, gestionadas a través del `ProductsContext`.

## Contribuciones

Si deseas contribuir a este proyecto, por favor, sigue estos pasos:

1.  Haz un "fork" del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y commitea (`git commit -m 'feat: añade nueva funcionalidad'`).
4.  Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5.  Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.  
Es de **libre uso**, modificación y distribución.  
Su propósito principal es servir como **guía en el ámbito educativo**.

Si quieres conocer más sobre la licencia tipo MIT visita el sitio https://opensource.org/licenses/MIT

## Autores

* Equipo Quarks

