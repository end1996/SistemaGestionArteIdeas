# Sistema de Gestión para Negocio de Fotografía y Enmarcado

Este proyecto es un prototipo de interfaz de usuario (frontend) para un sistema de gestión integral de un negocio de fotografía y enmarcado. El prototipo está desarrollado únicamente con HTML y CSS, sin funcionalidad de JavaScript todavía.

## Estructura del Proyecto

```
/proyecto-fotografia/
  /assets/
    /css/
      styles.css    (Estilos globales del sistema)
    /img/           (Carpeta para imágenes, no implementada en este prototipo)
  /pages/
    index.html      (Dashboard principal)
    pedidos.html    (Gestión de pedidos)
    clientes.html   (Gestión de clientes)
    colegios.html   (Gestión de colegios)
    inventario.html (Gestión de inventario)
    login.html      (Pantalla de login)
  README.md         (Este archivo)
```

## Descripción de las Pantallas

### Login (login.html)
- Formulario de acceso al sistema con campos de usuario y contraseña.
- Clic en "Iniciar Sesión" para acceder al dashboard.

### Dashboard (index.html)
- Resumen visual de pedidos nuevos, en producción y entregados.
- Alertas de stock bajo para productos críticos.
- Listado de pedidos recientes con acceso rápido.

### Pedidos (pedidos.html)
- Listado completo de pedidos con filtros por cliente, tipo de servicio y estado.
- Botón "Nuevo Pedido" que abre un modal para crear pedidos.
- Pedidos clasificados por estado con indicadores visuales.

### Clientes (clientes.html)
- Gestión de clientes particulares y asociados a colegios.
- Formulario para registro de nuevos clientes.
- Listado con filtros y acciones para cada cliente.

### Colegios (colegios.html)
- Gestión específica de colegios para campañas escolares.
- Formulario de registro con datos de contacto y dirección.
- Listado de colegios con indicador de contratos activos.

### Inventario (inventario.html)
- Control de stock de productos y materia prima.
- Alertas visuales para productos con stock bajo.
- Formularios para registro de nuevos productos y movimientos de inventario.

## Instrucciones de Uso

1. Abre el archivo `login.html` en un navegador web.
2. Usa cualquier valor en los campos (no hay validación en este prototipo) y haz clic en "Iniciar Sesión".
3. Navega por las diferentes secciones usando el menú lateral.
4. Explora los formularios y tablas (sin funcionalidad real en esta etapa).
5. Puedes simular la creación de nuevos registros haciendo clic en los botones de acción, que mostrarán los modales de formularios.

## Notas de Desarrollo

- Este prototipo es puramente visual, desarrollado con HTML y CSS.
- Los formularios no tienen funcionalidad real de envío o almacenamiento de datos.
- Los modales se muestran por defecto con `display: none;` en CSS. Para visualizarlos durante desarrollo, cambia a `display: block;`.
- Los filtros y botones de acción no tienen funcionalidad implementada.

## Próximos Pasos

- Implementar la funcionalidad JavaScript para interactividad.
- Conectar con backend para persistencia de datos.
- Añadir validación de formularios.
- Implementar autenticación real de usuarios.

---

Desarrollado como parte del Sprint 1 del Sistema de Gestión para Negocio de Fotografía y Enmarcado. 