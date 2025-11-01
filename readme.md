# 📋 Sistema Test

## Descripción

El objetivo del sistema es administrar una tienda que permita:

- Registrar productos nuevos.
- Controlar el inventario.
- Registrar las salidas o ventas.
- Asociar cada venta con la persona que la realizó.
- Llevar control del horario de entrada y salida de los empleados.

---

## ⚙️ Tecnologías utilizadas

El sistema está desarrollado con **[Express.js](https://expressjs.com/)** y utiliza **EJS** como motor de plantillas para las vistas.

---

## ⚙️ Rutas principales

| Ruta              | Descripción                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `/`               | Página de ingreso al sistema (login).                             |
| `/dashboard`      | Página principal del sistema (actualmente sin datos).             |
| `/ventas`         | Listado de ventas por usuario.                                    |
| `/ventas/detalle` | Detalle de productos.                                             |
| `/ventas/car`     | Carrito donde se seleccionan los productos y se calcula la venta. |
| `/productos`      | Listado y gestión de productos.                                   |
| `/usuarios`       | Gestión de usuarios del sistema.                                  |
| `/register`       | Registro de nuevos usuarios.                                      |
| `/logout`         | Registro de nuevos usuarios.                                      |

---

## 📦 Dependencias

```json
{
  "express": "^5.1.0",
  "body-parser": "^1.19.2",
  "concurrently": "^8.2.0",
  "dotenv": "^16.0.0",
  "express-ejs-layouts": "^2.5.1",
  "express-session": "^1.17.2",
  "node-sessionstorage": "^1.0.0",
  "validator": "^13.7.0"
}
```

## creado por betovaz81
