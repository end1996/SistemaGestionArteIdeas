const calendarEl = document.getElementById('calendar');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
dayNames.forEach(day => {
  const header = document.createElement('div');
  header.className = 'calendar-header';
  header.textContent = day;
  calendarEl.appendChild(header);
});

const sessions = [
  { day: 1, label: 'Colegio San Juan' },
  { day: 2, label: 'María López' },
];

for (let i = 0; i < firstDay; i++) {
  const empty = document.createElement('div');
  empty.className = 'calendar-day empty';
  calendarEl.appendChild(empty);
}

for (let i = 1; i <= daysInMonth; i++) {
  const dayEl = document.createElement('div');
  dayEl.className = 'calendar-day';
  dayEl.setAttribute('tabindex', '0');
  const dayNum = document.createElement('span');
  dayNum.className = 'day-number';
  dayNum.textContent = i;
  dayEl.appendChild(dayNum);

  const session = sessions.find(s => s.day === i);
  if (session) {
    const label = document.createElement('span');
    label.className = 'event-label';
    label.textContent = session.label;
    dayEl.appendChild(label);
  }

  dayEl.addEventListener('click', () => {
    dayEl.classList.toggle('selected');
  });
  dayEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dayEl.classList.toggle('selected');
    }
  });

  calendarEl.appendChild(dayEl);
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

// Funciones para el modal
function openModal() {
  const modal = document.getElementById('sessionModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Previene el scroll del body
}

function closeModal() {
  const modal = document.getElementById('sessionModal');
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restaura el scroll del body
}

// Cerrar el modal si se hace clic fuera de él
window.addEventListener('click', function(event) {
  const modal = document.getElementById('sessionModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Prevenir que los clics dentro del modal lo cierren
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