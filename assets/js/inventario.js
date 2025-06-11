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
});

  // Mostrar y ocultar formulario
  function mostrarFormularioAgregar() {
    document.getElementById('formAgregarMoldura').style.display = 'block';
  }
  function ocultarFormulario() {
    document.getElementById('formAgregarMoldura').style.display = 'none';
    // Limpiar campos
    ['nombre','color','material','ancho','estilo','cantidad'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }

  // Agregar moldura o actualizar stock si ya existe
  function agregarMoldura() {
    const nombre = document.getElementById('nombre').value.trim();
    const color = document.getElementById('color').value.trim();
    const material = document.getElementById('material').value.trim();
    const ancho = document.getElementById('ancho').value.trim();
    const estilo = document.getElementById('estilo').value.trim();
    const cantidadStr = document.getElementById('cantidad').value.trim();
    const cantidad = parseFloat(cantidadStr);

    if (!nombre || !color || !material || !ancho || !estilo || isNaN(cantidad) || cantidad <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
                        return;
                    }

    const tbody = document.querySelector('table tbody');
    let filaExistente = null;

    // Buscar si ya existe la moldura idéntica (por nombre, color, material, ancho y estilo)
    for (let fila of tbody.rows) {
      const cNombre = fila.cells[1].textContent.trim();
      const cColor = fila.cells[2].textContent.trim();
      const cMaterial = fila.cells[3].textContent.trim();
      const cAncho = fila.cells[4].textContent.trim();
      const cEstilo = fila.cells[5].textContent.trim();

      if (cNombre === nombre && cColor === color && cMaterial === material && cAncho === ancho && cEstilo === estilo) {
        filaExistente = fila;
        break;
      }
    }

    if (filaExistente) {
      // Actualizar la cantidad sumando
      let cantidadActual = parseFloat(filaExistente.cells[6].textContent);
      filaExistente.cells[6].textContent = cantidadActual + cantidad;
      alert('Se ha actualizado la cantidad de la moldura existente.');
    } else {
      // Agregar nueva fila
      const nuevaFila = tbody.insertRow();
      const numero = tbody.rows.length;
      nuevaFila.insertCell().textContent = numero;
      nuevaFila.insertCell().textContent = nombre;
      nuevaFila.insertCell().textContent = color;
      nuevaFila.insertCell().textContent = material;
      nuevaFila.insertCell().textContent = ancho;
      nuevaFila.insertCell().textContent = estilo;
      nuevaFila.insertCell().textContent = cantidad;
      const celdaAcciones = nuevaFila.insertCell();
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'btnEditar';
      btnEditar.onclick = function () {
        editarFila(btnEditar);
      };
      celdaAcciones.appendChild(btnEditar);
      alert('Moldura agregada al inventario.');
    }

    ocultarFormulario();
  }

  // Función básica para editar una fila (solo ejemplo simple)
  function editarFila(boton) {
    const fila = boton.parentElement.parentElement;
    const celdas = fila.cells;

    // Puedes extender esta función para mostrar un formulario con datos para editar
    // Aquí solo mostramos una alerta con info actual
    alert(`Editar moldura:\nNombre: ${celdas[1].textContent}\nColor: ${celdas[2].textContent}\nMaterial: ${celdas[3].textContent}\nAncho: ${celdas[4].textContent}\nEstilo: ${celdas[5].textContent}\nCantidad: ${celdas[6].textContent}`);
  }