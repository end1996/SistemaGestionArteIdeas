 // Mostrar el botón solo en móvil
 if (window.innerWidth <= 768) {
    document.getElementById('menuToggle').style.display = 'block';
}
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.getElementById('menuToggle').style.display = 'block';
    } else {
        document.getElementById('menuToggle').style.display = 'none';
    }
});

 // Control del menú móvil (idéntico a clientes.html)
 const menuToggle = document.getElementById('menuToggle');
 const sidebar = document.querySelector('.sidebar');
 menuToggle.addEventListener('click', () => {
     sidebar.classList.toggle('active');
     menuToggle.classList.toggle('menu-active');
 });

 // Cerrar menú al hacer clic fuera (solo móvil)
 document.addEventListener('click', (e) => {
     if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
         sidebar.classList.remove('active');
         menuToggle.classList.remove('menu-active');
     }
 });

function mostrarDetalle(id, cliente, servicio, estado, fecha, total) {
    document.getElementById('detalleId').textContent = id;
    document.getElementById('detalleCliente').textContent = cliente;
    document.getElementById('detalleServicio').textContent = servicio;
    document.getElementById('detalleEstado').textContent = estado;
    document.getElementById('detalleFecha').textContent = fecha;
    document.getElementById('detalleTotal').textContent = total;
    document.getElementById('detallePedidoModal').style.display = 'block';
    document.getElementById('detalleBackdrop').style.display = 'block';
}
function cerrarDetalle() {
    document.getElementById('detallePedidoModal').style.display = 'none';
    document.getElementById('detalleBackdrop').style.display = 'none';
}

 // Funciones para verificar stock y calcular tiempos
 function verificarStockPapel() {
    const tipoPapel = document.getElementById('tipoPapel').value;
    const stockInfo = document.getElementById('stockPapel');
    
    // Simular verificación de stock
    const stock = obtenerStockPapel(tipoPapel);
    if (stock < 10) {
        stockInfo.innerHTML = `<span class="text-danger">Stock bajo: ${stock} unidades</span>`;
    } else {
        stockInfo.innerHTML = `<span class="text-success">Stock disponible: ${stock} unidades</span>`;
    }
}

function verificarStockMarco() {
    const tipoMarco = document.getElementById('tipoMarco').value;
    const stockInfo = document.getElementById('stockMarco');
    
    // Simular verificación de stock
    const stock = obtenerStockMarco(tipoMarco);
    if (stock < 5) {
        stockInfo.innerHTML = `<span class="text-danger">Stock bajo: ${stock} unidades</span>`;
    } else {
        stockInfo.innerHTML = `<span class="text-success">Stock disponible: ${stock} unidades</span>`;
    }
}

function verificarStockRecordatorio() {
    const plantilla = document.getElementById('plantillaRecordatorio').value;
    const stockInfo = document.getElementById('stockRecordatorio');
    
    // Simular verificación de stock
    const stock = obtenerStockRecordatorio(plantilla);
    if (stock < 20) {
        stockInfo.innerHTML = `<span class="text-danger">Stock bajo: ${stock} unidades</span>`;
    } else {
        stockInfo.innerHTML = `<span class="text-success">Stock disponible: ${stock} unidades</span>`;
    }
}

function calcularTiempoEstimado() {
    const tipoServicio = document.getElementById('tipoServicio').value;
    let tiempoEstimado = '';
    
    switch(tipoServicio) {
        case 'impresion':
            const cantidadFotos = document.getElementById('cantidadFotos').value;
            tiempoEstimado = `${Math.ceil(cantidadFotos / 50)} horas`;
            break;
        case 'enmarcado':
            const ancho = document.getElementById('anchoMarco').value;
            const alto = document.getElementById('altoMarco').value;
            tiempoEstimado = `${Math.ceil((ancho * alto) / 100)} horas`;
            break;
        case 'recordatorio':
            const cantidad = document.getElementById('cantidadRecordatorios').value;
            tiempoEstimado = `${Math.ceil(cantidad / 100)} días`;
            break;
        case 'retoque':
            const tipoRetoque = document.getElementById('tipoRetoque').value;
            tiempoEstimado = tipoRetoque === 'restauracion' ? '2-3 días' : '1 día';
            break;
    }
    
    document.getElementById('tiempoEstimado').value = tiempoEstimado;
}

function verificarCapacidadProduccion() {
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const tipoServicio = document.getElementById('tipoServicio').value;
    
    // Simular verificación de capacidad
    const capacidad = obtenerCapacidadProduccion(fechaEntrega, tipoServicio);
    if (!capacidad) {
        alert('No hay capacidad de producción disponible para la fecha seleccionada');
        document.getElementById('fechaEntrega').value = '';
    }
}

// Funciones simuladas para obtener datos
function obtenerStockPapel(tipo) {
    // Simular consulta a base de datos
    return Math.floor(Math.random() * 50);
}

function obtenerStockMarco(tipo) {
    // Simular consulta a base de datos
    return Math.floor(Math.random() * 20);
}

function obtenerStockRecordatorio(plantilla) {
    // Simular consulta a base de datos
    return Math.floor(Math.random() * 100);
}

function obtenerCapacidadProduccion(fecha, tipo) {
    // Simular consulta a base de datos
    return Math.random() > 0.3; // 70% de probabilidad de tener capacidad
}



    // Función para crear nuevo pedido
    async function crearNuevoPedido(datos) {
        try {
            // 1. Verificar stock disponible
            const stockDisponible = await verificarStock(datos.materiales);
            if (!stockDisponible) {
                alert('No hay suficiente stock para procesar este pedido');
                return;
            }

            // 2. Crear el pedido
            const pedido = await guardarPedido(datos);
            
            // 3. Generar orden de producción automáticamente
            const ordenProduccion = await crearOrdenProduccion({
                pedidoId: pedido.id,
                tipoServicio: datos.tipoServicio,
                materiales: datos.materiales,
                fechaInicio: new Date(),
                fechaFinEstimada: datos.fechaEntrega,
                estado: 'pendiente',
                prioridad: datos.prioridad
            });
            
            // 4. Actualizar inventario
            await actualizarInventario(pedido.materiales);
            
            // 5. Actualizar la interfaz
            actualizarTablaPedidos();
            cerrarModal();
            
            // 6. Mostrar confirmación con detalles
            alert(`Pedido creado exitosamente\nID: ${pedido.id}\nOrden de Producción: ${ordenProduccion.id}`);
        } catch (error) {
            console.error('Error al crear pedido:', error);
            alert('Error al crear el pedido');
        }
    }

    // Función para verificar stock
    async function verificarStock(materiales) {
        // Simular inventario disponible (aquí irían tus datos reales)
        const inventarioSimulado = {
            'papel': 150, // unidades de papel
            'marco': 10,  // unidades de marcos
            'plantilla': 80 // unidades de plantillas
            // Agrega otros materiales aquí
        };

        let stockSuficiente = true;

        for (const material of materiales) {
            const tipoMaterial = material.tipo;
            const cantidadRequerida = parseInt(material.cantidad, 10); // Asegúrate de que sea un número

            // Verificar si el material existe en el inventario simulado
            if (!inventarioSimulado.hasOwnProperty(tipoMaterial)) {
                console.warn(`Material desconocido en inventario simulado: ${tipoMaterial}`);
                // Puedes decidir si esto detiene el pedido o no. Por ahora, asumimos que sí.
                stockSuficiente = false;
                alert(`Falta información de stock para el material: ${tipoMaterial}`);
                break; // Detener la verificación si un material es desconocido o falta stock
            }

            const stockActual = inventarioSimulado[tipoMaterial];

            if (stockActual < cantidadRequerida) {
                stockSuficiente = false;
                alert(`Stock insuficiente para ${tipoMaterial}. Requerido: ${cantidadRequerida}, Disponible: ${stockActual}`);
                break; // Detener la verificación si no hay stock
            }
        }

        return stockSuficiente; // Devuelve true si hay stock para todo, false si no
    }

    // Función para guardar pedido
    async function guardarPedido(datos) {
        // Simular guardado de pedido
        return {
            id: 'P' + Math.floor(Math.random() * 1000),
            ...datos
        };
    }

    // Función mejorada para crear orden de producción
    async function crearOrdenProduccion(datos) {
        try {
            // Simular creación de orden de producción
            const orden = {
                id: 'PR' + Math.floor(Math.random() * 1000),
                ...datos,
                fechaCreacion: new Date(),
                progreso: 0
            };
            
            // Notificar a la página de producción
            window.dispatchEvent(new CustomEvent('nuevaOrdenProduccion', { 
                detail: orden 
            }));
            
            return orden;
        } catch (error) {
            console.error('Error al crear orden de producción:', error);
            throw error;
        }
    }

    // Función para actualizar inventario
    async function actualizarInventario(materiales) {
        // Simular actualización de inventario
        console.log('Actualizando inventario con:', materiales);
    }

    // Función para actualizar la tabla de pedidos
    function actualizarTablaPedidos() {
        // Simular actualización de la tabla
        const tbody = document.querySelector('.table tbody');
        // Aquí se agregaría la lógica para actualizar la tabla
    }

    // Event listener para el botón de nuevo pedido
    document.getElementById('btnNuevoPedido').addEventListener('click', () => {
        // Mostrar el modal de nuevo pedido
        document.getElementById('nuevoPedidoModal').style.display = 'block';
        document.getElementById('modalBackdrop').style.display = 'block';
    });

    // Event listener para guardar pedido
    document.getElementById('guardarPedido').addEventListener('click', () => {
        const datos = {
            cliente: document.getElementById('cliente').value,
            tipoServicio: document.getElementById('tipoServicio').value,
            materiales: obtenerMaterialesSeleccionados(),
            fechaEntrega: document.getElementById('fechaEntrega').value
        };
        crearNuevoPedido(datos);
    });

    // Función para obtener materiales seleccionados
    function obtenerMaterialesSeleccionados() {
        const tipoServicio = document.getElementById('tipoServicio').value;
        let materiales = [];
        
        switch(tipoServicio) {
            case 'impresion':
                materiales.push({
                    tipo: 'papel',
                    cantidad: document.getElementById('cantidadFotos').value
                });
                break;
            case 'enmarcado':
                materiales.push({
                    tipo: 'marco',
                    medidas: {
                        ancho: document.getElementById('anchoMarco').value,
                        alto: document.getElementById('altoMarco').value
                    }
                });
                break;
            case 'recordatorio':
                materiales.push({
                    tipo: 'plantilla',
                    cantidad: document.getElementById('cantidadRecordatorios').value
                });
                break;
        }
        
        return materiales;
    }

 // ... existing code ...
 document.getElementById('cerrarModal').addEventListener('click', () => {
    document.getElementById('nuevoPedidoModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
});
document.getElementById('cancelarPedido').addEventListener('click', () => {
    document.getElementById('nuevoPedidoModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
});
// ... existing code ...



// Lógica de filtrado de pedidos
function aplicarFiltrosPedidos() {
const filtroCliente = document.getElementById('filtroCliente').value.toLowerCase();
const filtroServicio = document.getElementById('filtroServicio').value;
const filtroEstado = document.getElementById('filtroEstado').value;
const filas = document.querySelectorAll('.table tbody tr');

filas.forEach(fila => {
    const cliente = fila.children[1].textContent.toLowerCase();
    const servicio = fila.children[2].textContent;
    const estado = fila.children[3].textContent.toLowerCase();
    let mostrar = true;

    if (filtroCliente && !cliente.includes(filtroCliente)) {
        mostrar = false;
    }
    if (filtroServicio && !servicio.toLowerCase().includes(filtroServicio)) {
        mostrar = false;
    }
    if (filtroEstado) {
        // Buscar el texto del estado dentro del span
        const estadoSpan = fila.children[3].querySelector('span');
        if (!estadoSpan || !estadoSpan.textContent.toLowerCase().includes(filtroEstado)) {
            mostrar = false;
        }
    }
    fila.style.display = mostrar ? '' : 'none';
});
}
// Asignar evento al botón de aplicar filtros
const btnAplicarFiltros = document.querySelector('.form-group.text-right .btn.btn-primary');
if (btnAplicarFiltros) {
btnAplicarFiltros.addEventListener('click', aplicarFiltrosPedidos);
}