// Estado global para mantener los datos
let proyectos = [];
let tareasPorProyecto = {};
let proyectoActual = null;

// Funciones de inicialización
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    cargarProyectos();
});

function initEventListeners() {
    // Filtros
    document.getElementById('filterProyecto').addEventListener('change', filtrarProyectos);
    document.getElementById('searchCliente').addEventListener('input', buscarClientes);

    // Botones de acción
    document.querySelector('.agenda-btn-secondary').addEventListener('click', agregarGrupo);
    document.querySelector('.agenda-btn-primary').addEventListener('click', agregarTarea);
}

// Funciones de carga de datos
function cargarProyectos() {
    // Simulación de datos - Reemplazar con llamada a API/BD
    proyectos = [
        {
            id: 'S001',
            cliente: 'Juan Pérez',
            fecha: '2025-05-01',
            hora: '10:00 AM',
            direccion: 'Av. Principal 123',
            estado: 'en-proceso'
        },
        {
            id: 'S002',
            cliente: 'María López',
            fecha: '2025-05-02',
            hora: '15:30 PM',
            direccion: 'Calle Secundaria 456',
            estado: 'pendiente'
        }
    ];

    tareasPorProyecto = {
        'S001': {
            grupos: [
                {
                    id: 'g1',
                    nombre: 'Preparación',
                    tareas: [
                        { id: 't1', texto: 'Preparar equipo de luces', completada: true },
                        { id: 't2', texto: 'Revisar baterías de cámaras', completada: true },
                        { id: 't3', texto: 'Confirmar locación', completada: false }
                    ]
                },
                {
                    id: 'g2',
                    nombre: 'Durante la Sesión',
                    tareas: [
                        { id: 't4', texto: 'Tomar fotos de prueba', completada: true },
                        { id: 't5', texto: 'Revisar iluminación', completada: false }
                    ]
                }
            ]
        }
    };

    renderizarProyectos();
    if (proyectos.length > 0) {
        seleccionarProyecto(proyectos[0].id);
    }
}

// Funciones de renderizado
function renderizarProyectos() {
    const container = document.querySelector('.tasks-projects-list');
    container.innerHTML = '';

    proyectos.forEach(proyecto => {
        const elemento = crearElementoProyecto(proyecto);
        container.appendChild(elemento);
    });
}

function crearElementoProyecto(proyecto) {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.dataset.id = proyecto.id;
    div.innerHTML = `
        <div class="project-info">
            <span class="project-id">${proyecto.id}</span>
            <span class="project-client">${proyecto.cliente}</span>
        </div>
        <span class="project-date">${proyecto.fecha}</span>
    `;
    div.addEventListener('click', () => seleccionarProyecto(proyecto.id));
    return div;
}

function renderizarDetalleProyecto(id) {
    const proyecto = proyectos.find(p => p.id === id);
    const tareas = tareasPorProyecto[id];
    
    if (!proyecto || !tareas) return;

    // Actualizar encabezado
    document.querySelector('.tasks-detail-header').innerHTML = `
        <h3>Sesión Fotográfica - ${proyecto.cliente}</h3>
        <div class="session-info">
            <span><i class="fas fa-calendar"></i> ${proyecto.fecha}</span>
            <span><i class="fas fa-clock"></i> ${proyecto.hora}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${proyecto.direccion}</span>
        </div>
    `;

    // Actualizar progreso
    const progreso = calcularProgresoTotal(tareas.grupos);
    document.querySelector('.tasks-progress').innerHTML = `
        <div class="progress-header">
            <span>Progreso General</span>
            <span>${progreso}%</span>
        </div>
        <div class="progress-bar">
            <div class="progress" style="width: ${progreso}%"></div>
        </div>
    `;

    // Renderizar grupos de tareas
    renderizarGruposTareas(tareas.grupos);
}

function renderizarGruposTareas(grupos) {
    const container = document.querySelector('.tasks-groups');
    container.innerHTML = '';

    grupos.forEach(grupo => {
        const completadas = grupo.tareas.filter(t => t.completada).length;
        const total = grupo.tareas.length;

        const grupoElement = document.createElement('div');
        grupoElement.className = 'task-group';
        grupoElement.innerHTML = `
            <div class="task-group-header">
                <h4>${grupo.nombre}</h4>
                <span>${completadas}/${total}</span>
            </div>
            <div class="task-list">
                ${grupo.tareas.map(tarea => `
                    <div class="task-item ${tarea.completada ? 'completed' : ''}">
                        <input type="checkbox" ${tarea.completada ? 'checked' : ''} 
                               onchange="toggleTarea('${grupo.id}', '${tarea.id}')">
                        <span>${tarea.texto}</span>
                        <div class="task-actions">
                            <button class="btn-icon" onclick="editarTarea('${grupo.id}', '${tarea.id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="eliminarTarea('${grupo.id}', '${tarea.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(grupoElement);
    });
}

// Funciones de interacción
function seleccionarProyecto(id) {
    proyectoActual = id;
    
    // Actualizar selección visual
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === id);
    });

    renderizarDetalleProyecto(id);
}

function toggleTarea(grupoId, tareaId) {
    const grupo = tareasPorProyecto[proyectoActual].grupos.find(g => g.id === grupoId);
    const tarea = grupo.tareas.find(t => t.id === tareaId);
    tarea.completada = !tarea.completada;
    renderizarDetalleProyecto(proyectoActual);
}

function agregarGrupo() {
    const nombre = prompt('Nombre del nuevo grupo:');
    if (!nombre) return;

    if (!tareasPorProyecto[proyectoActual]) {
        tareasPorProyecto[proyectoActual] = { grupos: [] };
    }

    const nuevoGrupo = {
        id: 'g' + Date.now(),
        nombre: nombre,
        tareas: []
    };

    tareasPorProyecto[proyectoActual].grupos.push(nuevoGrupo);
    renderizarDetalleProyecto(proyectoActual);
}

function agregarTarea() {
    if (!tareasPorProyecto[proyectoActual]?.grupos.length) {
        alert('Primero debe crear un grupo de tareas');
        return;
    }

    const texto = prompt('Descripción de la tarea:');
    if (!texto) return;

    const grupos = tareasPorProyecto[proyectoActual].grupos;
    const grupoId = grupos[0].id; // Por defecto agregamos al primer grupo

    const nuevaTarea = {
        id: 't' + Date.now(),
        texto: texto,
        completada: false
    };

    grupos.find(g => g.id === grupoId).tareas.push(nuevaTarea);
    renderizarDetalleProyecto(proyectoActual);
}

function editarTarea(grupoId, tareaId) {
    const grupo = tareasPorProyecto[proyectoActual].grupos.find(g => g.id === grupoId);
    const tarea = grupo.tareas.find(t => t.id === tareaId);
    
    const nuevoTexto = prompt('Editar tarea:', tarea.texto);
    if (nuevoTexto && nuevoTexto !== tarea.texto) {
        tarea.texto = nuevoTexto;
        renderizarDetalleProyecto(proyectoActual);
    }
}

function eliminarTarea(grupoId, tareaId) {
    if (!confirm('¿Está seguro de eliminar esta tarea?')) return;

    const grupo = tareasPorProyecto[proyectoActual].grupos.find(g => g.id === grupoId);
    grupo.tareas = grupo.tareas.filter(t => t.id !== tareaId);
    renderizarDetalleProyecto(proyectoActual);
}

// Funciones de filtrado y búsqueda
function filtrarProyectos(e) {
    const estado = e.target.value;
    if (!estado) {
        renderizarProyectos();
        return;
    }

    const filtrados = proyectos.filter(p => p.estado === estado);
    const container = document.querySelector('.tasks-projects-list');
    container.innerHTML = '';
    filtrados.forEach(proyecto => {
        container.appendChild(crearElementoProyecto(proyecto));
    });
}

function buscarClientes(e) {
    const busqueda = e.target.value.toLowerCase();
    const filtrados = proyectos.filter(p => 
        p.cliente.toLowerCase().includes(busqueda)
    );
    
    const container = document.querySelector('.tasks-projects-list');
    container.innerHTML = '';
    filtrados.forEach(proyecto => {
        container.appendChild(crearElementoProyecto(proyecto));
    });
}

// Funciones auxiliares
function calcularProgresoTotal(grupos) {
    let totalTareas = 0;
    let tareasCompletadas = 0;

    grupos.forEach(grupo => {
        totalTareas += grupo.tareas.length;
        tareasCompletadas += grupo.tareas.filter(t => t.completada).length;
    });

    return totalTareas === 0 ? 0 : Math.round((tareasCompletadas / totalTareas) * 100);
} 