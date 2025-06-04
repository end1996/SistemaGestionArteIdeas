// Variables globales
let currentDate = new Date();
let selectedDate = null;

// Datos de ejemplo (esto podría venir de una base de datos)
const events = [
  {
    id: 1,
    title: 'Sesión de Fotos',
    client: 'Juan Pérez',
    date: '2024-03-15',
    time: '09:00',
    status: 'confirmed'
  },
  {
    id: 2,
    title: 'Fotografía de Producto',
    client: 'María López',
    date: '2024-03-15',
    time: '14:30',
    status: 'pending'
  }
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar calendario
  updateCalendar();
  updateMonthYear();

  // Configurar el filtro de fecha
  const filterDate = document.getElementById('filterDate');
  filterDate.addEventListener('change', (e) => {
    const selectedFilterDate = new Date(e.target.value);
    // Actualizar el mes actual del calendario
    currentDate = selectedFilterDate;
    // Actualizar la fecha seleccionada
    selectedDate = formatDate(selectedFilterDate);
    // Actualizar el calendario
    updateCalendar();
    updateMonthYear();
    // Actualizar la lista de eventos
    updateEventsList(selectedDate);
  });

  // Establecer la fecha actual en el filtro
  filterDate.value = formatDate(new Date());

  // Inicializar la tabla con todos los eventos
  updateSessionsTable(events);
});

// Funciones de navegación
function previousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
  updateMonthYear();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
  updateMonthYear();
}

// Actualizar título del mes y año
function updateMonthYear() {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const monthYear = document.getElementById('currentMonthYear');
  monthYear.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

// Actualizar calendario
function updateCalendar() {
  const calendarDays = document.getElementById('calendarDays');
  calendarDays.innerHTML = '';

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startingDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  // Días vacíos al inicio
  for (let i = 0; i < startingDay; i++) {
    const emptyDay = createDayElement('');
    emptyDay.classList.add('empty');
    calendarDays.appendChild(emptyDay);
  }

  // Días del mes
  for (let day = 1; day <= totalDays; day++) {
    const dayElement = createDayElement(day);
    const dateString = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    
    // Marcar día actual
    if (isToday(dateString)) {
      dayElement.classList.add('today');
    }

    // Marcar día seleccionado
    if (selectedDate === dateString) {
      dayElement.classList.add('selected');
      // Hacer scroll al día seleccionado
      setTimeout(() => {
        dayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }

    // Agregar indicadores de eventos
    const dayEvents = events.filter(event => event.date === dateString);
    if (dayEvents.length > 0) {
      const indicator = document.createElement('div');
      indicator.className = 'event-indicator';
      dayEvents.forEach(event => {
        const dot = document.createElement('div');
        dot.className = `dot ${event.status}`;
        indicator.appendChild(dot);
      });
      dayElement.appendChild(indicator);
    }

    dayElement.addEventListener('click', () => {
      selectDate(dateString, dayElement);
      // Actualizar el filtro de fecha cuando se selecciona un día
      const filterDate = document.getElementById('filterDate');
      filterDate.value = dateString;
    });
    calendarDays.appendChild(dayElement);
  }
}

// Crear elemento de día
function createDayElement(day) {
  const element = document.createElement('div');
  element.className = 'calendar-day';
  if (day !== '') {
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    element.appendChild(dayNumber);
  }
  return element;
}

// Seleccionar fecha
function selectDate(date, element) {
  // Remover selección anterior
  const previousSelected = document.querySelector('.calendar-day.selected');
  if (previousSelected) {
    previousSelected.classList.remove('selected');
  }

  selectedDate = date;
  element.classList.add('selected');
  updateEventsList(date);
}

// Actualizar lista de eventos
function updateEventsList(date) {
  const dayEvents = document.getElementById('dayEvents');
  dayEvents.innerHTML = '';

  const dateEvents = events.filter(event => event.date === date);
  
  if (dateEvents.length === 0) {
    dayEvents.innerHTML = '<p class="no-events">No hay sesiones programadas para este día</p>';
    return;
  }

  dateEvents.sort((a, b) => a.time.localeCompare(b.time));
  
  dateEvents.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = `event-item ${event.status}`;
    eventElement.innerHTML = `
      <div class="event-time">${formatTime(event.time)}</div>
      <div class="event-title">${event.title}</div>
      <div class="event-client">${event.client}</div>
    `;
    dayEvents.appendChild(eventElement);
  });
}

// Funciones auxiliares
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
}

function isToday(dateString) {
  const today = new Date();
  return formatDate(today) === dateString;
}

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  menuToggle.classList.toggle('menu-active');
});

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('menu-active');
  }
});

// Modal
function openModal() {
  const modal = document.getElementById('sessionModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('sessionModal');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Eventos del modal
window.addEventListener('click', function(event) {
  const modal = document.getElementById('sessionModal');
  if (event.target === modal) {
    closeModal();
  }
});

document.querySelector('.agenda-modal-content').addEventListener('click', function(event) {
  event.stopPropagation();
});

function addTarea() {
  const tareasList = document.getElementById('tareasList');
  const nuevaTarea = document.createElement('div');
  nuevaTarea.className = 'agenda-tarea-item';
  nuevaTarea.innerHTML = `
    <input type="text" class="agenda-form-control" placeholder="Descripción de la tarea">
    <button type="button" class="agenda-btn agenda-btn-danger" onclick="removeTarea(this)">
      <i class="fas fa-trash"></i>
    </button>
  `;
  tareasList.appendChild(nuevaTarea);
}

function removeTarea(button) {
  button.parentElement.remove();
}

// Actualizar el valor del avance
const avanceInput = document.getElementById('avance');
const avanceOutput = document.getElementById('avanceOutput');
avanceInput.addEventListener('input', function() {
  avanceOutput.textContent = this.value + '%';
});

// Manejar el envío del formulario
document.getElementById('sessionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Aquí iría la lógica para guardar los datos
  closeModal();
});

// Función para aplicar filtros
function aplicarFiltros() {
  const filterDate = document.getElementById('filterDate').value;
  const filterCliente = document.getElementById('filterCliente').value.toLowerCase();

  // Filtrar eventos
  const filteredEvents = events.filter(event => {
    const matchDate = !filterDate || event.date === filterDate;
    const matchCliente = !filterCliente || event.client.toLowerCase().includes(filterCliente);
    return matchDate && matchCliente;
  });

  // Actualizar la tabla de sesiones
  updateSessionsTable(filteredEvents);

  // Si hay una fecha seleccionada, actualizar el calendario
  if (filterDate) {
    const selectedFilterDate = new Date(filterDate);
    currentDate = selectedFilterDate;
    selectedDate = filterDate;
    updateCalendar();
    updateMonthYear();
    updateEventsList(filterDate);
  }
}

// Función para actualizar la tabla de sesiones
function updateSessionsTable(sessions) {
  const tbody = document.getElementById('sessionesTabla');
  tbody.innerHTML = '';

  if (sessions.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="7" style="text-align: center;">No se encontraron sesiones</td>
    `;
    tbody.appendChild(tr);
    return;
  }

  sessions.forEach(session => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${session.id}</td>
      <td>${session.client}</td>
      <td>${formatDateDisplay(session.date)}</td>
      <td>${formatTime(session.time)}</td>
      <td>${formatStatus(session.status)}</td>
      <td>
        <div class="progress-bar">
          <div class="progress" style="width: ${session.progress || 0}%;"></div>
        </div>
      </td>
      <td>
        <button class="btn btn-sm btn-ver" onclick="verSesion(${session.id})">Ver</button>
        <button class="btn btn-sm btn-editar" onclick="editarSesion(${session.id})">Editar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Función para formatear la fecha en formato más legible
function formatDateDisplay(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// Función para formatear el estado
function formatStatus(status) {
  const statusMap = {
    'pending': 'Pendiente',
    'confirmed': 'Confirmada',
    'completed': 'Completada'
  };
  return statusMap[status] || status;
}