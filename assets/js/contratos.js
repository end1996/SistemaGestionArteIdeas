// Control del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('menu-active');
        });

        // Cerrar menú al hacer clic fuera (solo móvil)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('menu-active');
            }
        });
    }

    // Funcionalidad de filtros
    const filtroCliente = document.getElementById('filtroCliente');
    const filtroServicio = document.getElementById('filtroServicio');
    const filtroEstado = document.getElementById('filtroEstado');

    [filtroCliente, filtroServicio, filtroEstado].forEach(filtro => {
        if (filtro) {
            filtro.addEventListener('change', aplicarFiltros);
        }
    });

    function aplicarFiltros() {
        // Aquí iría la lógica para filtrar la tabla de contratos
        console.log('Aplicando filtros:', {
            cliente: filtroCliente?.value,
            servicio: filtroServicio?.value,
            estado: filtroEstado?.value
        });
    }

    // Funcionalidad para los botones de servicio
    const botonesSeleccionar = document.querySelectorAll('.servicio-card .btn-primary');
    botonesSeleccionar.forEach(boton => {
        boton.addEventListener('click', function() {
            const servicioCard = this.closest('.servicio-card');
            const nombreServicio = servicioCard.querySelector('h3').textContent;
            const precio = servicioCard.querySelector('.servicio-precio').textContent;
            
            // Aquí iría la lógica para iniciar el proceso de contratación
            console.log('Servicio seleccionado:', {
                nombre: nombreServicio,
                precio: precio
            });
            alert(`Has seleccionado el servicio: ${nombreServicio}`);
        });
    });

    // Manejo de pestañas principales
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clase active de todas las pestañas
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar pestaña seleccionada
            this.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });

    // Funcionalidad de búsqueda y filtros para historial
    const buscarCliente = document.getElementById('buscarCliente');
    const filtroAnio = document.getElementById('filtroAnio');
    const filtroServicioHistorial = document.getElementById('filtroServicio');

    [buscarCliente, filtroAnio, filtroServicioHistorial].forEach(filtro => {
        if (filtro) {
            filtro.addEventListener('change', aplicarFiltrosHistorial);
        }
    });

    function aplicarFiltrosHistorial() {
        const busqueda = buscarCliente?.value.toLowerCase() || '';
        const anio = filtroAnio?.value || '';
        const servicio = filtroServicioHistorial?.value || '';

        const clientes = document.querySelectorAll('.cliente-historial');
        
        clientes.forEach(cliente => {
            const nombreCliente = cliente.querySelector('h3').textContent.toLowerCase();
            const mostrar = nombreCliente.includes(busqueda);
            cliente.style.display = mostrar ? 'block' : 'none';
        });
    }

    // Manejo del selector de período
    const periodoSelect = document.getElementById('periodoTendencia');
    if (periodoSelect) {
        periodoSelect.addEventListener('change', function() {
            // Implementar actualización del gráfico
            console.log('Cambiando período a:', this.value, 'días');
        });
    }
});

// Funciones globales
window.verDetallesContrato = function(id) {
    const modal = document.getElementById('modalDetallesContrato');
    if (modal) {
        modal.style.display = 'block';
        // Aquí iría la lógica para cargar los detalles del contrato
        console.log('Viendo detalles del contrato:', id);
    }
};

window.editarContrato = function(id) {
    // Lógica para editar contrato
    console.log('Editando contrato:', id);
};

window.descargarContrato = function(id) {
    // Lógica para descargar contrato
    console.log('Descargando contrato:', id);
};

window.verHistorialCliente = function(id) {
    // Lógica para ver historial del cliente
    console.log('Viendo historial del cliente:', id);
};

window.verDetallesCliente = function(id) {
    // Lógica para ver detalles del cliente
    console.log('Viendo detalles del cliente:', id);
};

window.toggleHistorial = function(clienteId) {
    const historial = document.getElementById(clienteId);
    if (historial) {
        const allHistorials = document.querySelectorAll('.cliente-contratos');
        
        // Cerrar otros historiales abiertos
        allHistorials.forEach(h => {
            if (h.id !== clienteId && h.classList.contains('active')) {
                h.classList.remove('active');
            }
        });

        // Alternar el historial seleccionado
        historial.classList.toggle('active');
    }
};

window.exportarResumen = function() {
    // Implementar lógica de exportación
    alert('Exportando resumen...');
};

window.verTodosContratos = function() {
    // Implementar navegación a vista completa
    alert('Redirigiendo a vista completa de contratos...');
};

window.toggleContratos = function(clienteId) {
    const lista = document.getElementById(clienteId);
    if (lista) {
        lista.classList.toggle('active');
        
        const header = lista.previousElementSibling;
        const icon = header.querySelector('.fa-chevron-down');
        if (icon) {
            icon.style.transform = lista.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        }
    }
};

window.expandirTodosNuevos = function() {
    const clientesNuevos = document.querySelectorAll('.cliente-card.nuevo .contratos-lista');
    const expandir = !Array.from(clientesNuevos).some(lista => lista.classList.contains('active'));
    
    clientesNuevos.forEach(lista => {
        lista.classList.toggle('active', expandir);
        const icon = lista.previousElementSibling.querySelector('.fa-chevron-down');
        if (icon) {
            icon.style.transform = expandir ? 'rotate(180deg)' : 'rotate(0)';
        }
    });
};

// Precios base por servicio
const PRECIOS_BASE = {
    promocion: 2000,
    enmarcado: 500,
    impresion: 300,
    restauracion: 400,
    pintura: 800
};

// Funciones para el modal de nuevo contrato
window.abrirModalNuevoContrato = function() {
    const modal = document.getElementById('modalNuevoContrato');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Establecer fecha mínima como hoy para fechaInicio y fechaFin
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('fechaInicio').min = today;
        document.getElementById('fechaFin').min = today;
    }
};

window.cerrarModalNuevoContrato = function() {
    const modal = document.getElementById('modalNuevoContrato');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('formNuevoContrato').reset();
        document.getElementById('detallesPago').innerHTML = '';
    }
};

// Validar que la fecha de fin sea posterior a la fecha de inicio
document.getElementById('fechaInicio')?.addEventListener('change', function() {
    const fechaFin = document.getElementById('fechaFin');
    if (fechaFin) {
        fechaFin.min = this.value;
        if (fechaFin.value && fechaFin.value < this.value) {
            fechaFin.value = this.value;
        }
    }
});

window.actualizarPrecioBase = function() {
    const tipoServicio = document.getElementById('tipoServicio').value;
    const precioBaseInput = document.getElementById('precioBase');
    const metodoPago = document.getElementById('metodoPago');
    
    if (tipoServicio && precioBaseInput) {
        precioBaseInput.value = PRECIOS_BASE[tipoServicio] || 0;
        if (metodoPago.value) {
            mostrarDetallesPago();
        }
    }
};

window.mostrarDetallesPago = function() {
    const metodoPago = document.getElementById('metodoPago').value;
    const precioBase = parseFloat(document.getElementById('precioBase').value) || 0;
    const detallesPagoDiv = document.getElementById('detallesPago');
    
    if (!detallesPagoDiv || !metodoPago) return;

    let html = '<div class="payment-schedule">';
    
    switch (metodoPago) {
        case 'dos_partes':
            const montoPorMitad = precioBase / 2;
            html += `
                <div class="payment-item">
                    <span class="payment-label">Anticipo inicial (50%)</span>
                    <span class="payment-amount">S/. ${montoPorMitad.toFixed(2)}</span>
                </div>
                <div class="payment-item">
                    <span class="payment-label">Al finalizar la instalación (50%)</span>
                    <span class="payment-amount">S/. ${montoPorMitad.toFixed(2)}</span>
                </div>
            `;
            break;
            
        case 'tres_partes':
            const primerPago = precioBase * 0.2;
            const segundoPago = precioBase * 0.4;
            const tercerPago = precioBase * 0.4;
            html += `
                <div class="payment-item">
                    <span class="payment-label">Al confirmar el pedido (20%)</span>
                    <span class="payment-amount">S/. ${primerPago.toFixed(2)}</span>
                </div>
                <div class="payment-item">
                    <span class="payment-label">Al completar estructura base (40%)</span>
                    <span class="payment-amount">S/. ${segundoPago.toFixed(2)}</span>
                </div>
                <div class="payment-item">
                    <span class="payment-label">Al finalizar la instalación (40%)</span>
                    <span class="payment-amount">S/. ${tercerPago.toFixed(2)}</span>
                </div>
            `;
            break;
            
        case 'contra_entrega':
            html += `
                <div class="payment-item">
                    <span class="payment-label">Pago total al entregar</span>
                    <span class="payment-amount">S/. ${precioBase.toFixed(2)}</span>
                </div>
            `;
            break;
    }
    
    html += '</div>';
    detallesPagoDiv.innerHTML = html;
};

window.guardarNuevoContrato = function(event) {
    event.preventDefault();
    
    // Recopilar datos del formulario
    const formData = {
        cliente: {
            nombre: document.getElementById('nombreCliente').value,
            tipo: document.getElementById('tipoCliente').value,
            frecuencia: document.getElementById('tipoClienteFrec').value,
            email: document.getElementById('emailCliente').value,
            telefono: document.getElementById('telefonoCliente').value
        },
        servicio: {
            tipo: document.getElementById('tipoServicio').value,
            modalidad: document.getElementById('modalidadServicio').value,
            fechaInicio: document.getElementById('fechaInicio').value,
            fechaFin: document.getElementById('fechaFin').value,
            estado: document.getElementById('estadoContrato').value,
            descripcion: document.getElementById('descripcion').value,
            precioBase: document.getElementById('precioBase').value
        },
        pago: {
            metodo: document.getElementById('metodoPago').value
        }
    };

    // Aquí iría la lógica para guardar el contrato en la base de datos
    console.log('Guardando nuevo contrato:', formData);
    
    // Mostrar mensaje de éxito
    alert('Contrato creado exitosamente');
    
    // Cerrar el modal y limpiar el formulario
    cerrarModalNuevoContrato();
};

// Cerrar el modal al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modalNuevoContrato');
    const modalWrapper = modal?.querySelector('.modal-wrapper');
    if (event.target === modal && modalWrapper && !modalWrapper.contains(event.target)) {
        cerrarModalNuevoContrato();
    }
}); 