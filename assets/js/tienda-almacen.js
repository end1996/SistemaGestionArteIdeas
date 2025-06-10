// Datos de ejemplo (en un sistema real, estos vendrían de una base de datos)
let cuadros = [
    {
        id: 'C001',
        cliente: 'Juan Pérez',
        descripcion: 'Cuadro 20x30 con marco dorado',
        estado: 'tienda',
        ubicacion: 'Estante A-1',
        fechaIngreso: '2024-03-15'
    },
    {
        id: 'C002',
        cliente: 'María García',
        descripcion: 'Cuadro 40x60 con marco negro',
        estado: 'almacen',
        ubicacion: 'Bodega B-3',
        fechaIngreso: '2024-03-14'
    },
    {
        id: 'C003',
        cliente: 'Carlos López',
        descripcion: 'Cuadro 30x40 con marco plateado',
        estado: 'produccion',
        ubicacion: 'Área de Producción',
        fechaIngreso: '2024-03-13'
    }
];

// Función para cargar los cuadros en la tabla
function cargarCuadros(filtros = {}) {
    const tabla = document.getElementById('tablaCuadros');
    tabla.innerHTML = '';

    let cuadrosFiltrados = cuadros;

    // Aplicar filtros
    if (filtros.estado && filtros.estado !== 'todos') {
        cuadrosFiltrados = cuadrosFiltrados.filter(c => c.estado === filtros.estado);
    }
    if (filtros.cliente) {
        cuadrosFiltrados = cuadrosFiltrados.filter(c => 
            c.cliente.toLowerCase().includes(filtros.cliente.toLowerCase())
        );
    }

    cuadrosFiltrados.forEach(cuadro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cuadro.id}</td>
            <td>${cuadro.cliente}</td>
            <td>${cuadro.descripcion}</td>
            <td><span class="estado-badge estado-${cuadro.estado}">${obtenerEstadoTexto(cuadro.estado)}</span></td>
            <td>${cuadro.ubicacion}</td>
            <td>${formatearFecha(cuadro.fechaIngreso)}</td>
            <td>
                <button class="btn btn-sm" onclick="verDetalles('${cuadro.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm" onclick="editarCuadro('${cuadro.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

// Función para obtener el texto del estado
function obtenerEstadoTexto(estado) {
    const estados = {
        tienda: 'En Tienda',
        almacen: 'En Almacén',
        produccion: 'En Producción'
    };
    return estados[estado] || estado;
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Función para aplicar filtros
function aplicarFiltros() {
    const estado = document.getElementById('filtroEstado').value;
    const cliente = document.getElementById('filtroCliente').value;
    
    cargarCuadros({ estado, cliente });
}

// Función para registrar un nuevo movimiento
function registrarMovimiento(event) {
    event.preventDefault();
    
    const idCuadro = document.getElementById('idCuadro').value;
    const tipoMovimiento = document.getElementById('tipoMovimiento').value;
    const observacion = document.getElementById('observacion').value;

    // Encontrar el cuadro
    const cuadro = cuadros.find(c => c.id === idCuadro);
    if (!cuadro) {
        alert('Cuadro no encontrado');
        return;
    }

    // Actualizar el estado del cuadro
    cuadro.estado = tipoMovimiento;
    cuadro.ubicacion = obtenerNuevaUbicacion(tipoMovimiento);
    
    // Registrar el movimiento (en un sistema real, esto se guardaría en la base de datos)
    console.log('Movimiento registrado:', {
        idCuadro,
        tipoMovimiento,
        observacion,
        fecha: new Date().toISOString()
    });

    // Recargar la tabla
    cargarCuadros();
    
    // Limpiar el formulario
    document.getElementById('formMovimiento').reset();
    
    alert('Movimiento registrado exitosamente');
}

// Función para obtener la nueva ubicación según el tipo de movimiento
function obtenerNuevaUbicacion(tipoMovimiento) {
    const ubicaciones = {
        tienda: 'Estante A-' + Math.floor(Math.random() * 5 + 1),
        almacen: 'Bodega B-' + Math.floor(Math.random() * 5 + 1),
        produccion: 'Área de Producción'
    };
    return ubicaciones[tipoMovimiento];
}

// Función para ver detalles de un cuadro
function verDetalles(idCuadro) {
    const cuadro = cuadros.find(c => c.id === idCuadro);
    if (cuadro) {
        alert(`Detalles del cuadro ${idCuadro}:\n` +
              `Cliente: ${cuadro.cliente}\n` +
              `Descripción: ${cuadro.descripcion}\n` +
              `Estado: ${obtenerEstadoTexto(cuadro.estado)}\n` +
              `Ubicación: ${cuadro.ubicacion}\n` +
              `Fecha de ingreso: ${formatearFecha(cuadro.fechaIngreso)}`);
    }
}

// Función para editar un cuadro
function editarCuadro(idCuadro) {
    const cuadro = cuadros.find(c => c.id === idCuadro);
    if (cuadro) {
        // Aquí se implementaría la lógica para editar el cuadro
        alert('Función de edición en desarrollo');
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar los cuadros iniciales
    cargarCuadros();

    // Configurar el formulario de movimientos
    document.getElementById('formMovimiento').addEventListener('submit', registrarMovimiento);

    // Configurar el menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('menu-active');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('menu-active');
        }
    });
}); 