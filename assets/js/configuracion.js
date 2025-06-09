// Funcionalidad para el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const closeMenu = document.getElementById('closeMenu');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    if (closeMenu && sidebar) {
        closeMenu.addEventListener('click', function() {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    }

    // Cerrar menú al hacer clic fuera en móvil
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        }
    });
});

// Funcionalidad para los formularios
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de configuración general
    const generalConfig = document.getElementById('generalConfig');
    if (generalConfig) {
        generalConfig.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica para guardar la configuración general
            mostrarMensaje('Configuración general guardada exitosamente', 'success');
        });
    }

    // Formulario de notificaciones
    const notificacionesConfig = document.getElementById('notificacionesConfig');
    if (notificacionesConfig) {
        notificacionesConfig.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica para guardar la configuración de notificaciones
            mostrarMensaje('Configuración de notificaciones guardada exitosamente', 'success');
        });
    }

    // Botón de nuevo usuario
    const btnNuevoUsuario = document.getElementById('btnNuevoUsuario');
    if (btnNuevoUsuario) {
        btnNuevoUsuario.addEventListener('click', function() {
            // Aquí iría la lógica para abrir el modal de nuevo usuario
            console.log('Abrir modal de nuevo usuario');
        });
    }

    // Botón de nuevo servicio
    const btnNuevoServicio = document.getElementById('btnNuevoServicio');
    if (btnNuevoServicio) {
        btnNuevoServicio.addEventListener('click', function() {
            // Aquí iría la lógica para abrir el modal de nuevo servicio
            console.log('Abrir modal de nuevo servicio');
        });
    }
});

// Función para mostrar mensajes de éxito/error
function mostrarMensaje(mensaje, tipo) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo}`;
    alertDiv.textContent = mensaje;

    // Insertar el mensaje al principio del contenido principal
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(alertDiv, mainContent.firstChild);

        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// Funcionalidad para las tablas
document.addEventListener('DOMContentLoaded', function() {
    // Agregar eventos a los botones de acción en las tablas
    const botonesEditar = document.querySelectorAll('.btn-secondary');
    const botonesDesactivar = document.querySelectorAll('.btn-danger');

    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function() {
            const fila = this.closest('tr');
            // Aquí iría la lógica para editar el elemento
            console.log('Editar elemento:', fila);
        });
    });

    botonesDesactivar.forEach(boton => {
        boton.addEventListener('click', function() {
            const fila = this.closest('tr');
            // Aquí iría la lógica para desactivar el elemento
            console.log('Desactivar elemento:', fila);
        });
    });
});

// Funcionalidad para validación de formularios
function validarFormulario(formulario) {
    const inputs = formulario.querySelectorAll('input[required]');
    let esValido = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            esValido = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return esValido;
}

// Funcionalidad para el manejo de checkboxes
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Aquí iría la lógica para manejar los cambios en los checkboxes
            console.log('Checkbox cambiado:', this.checked);
        });
    });
}); 