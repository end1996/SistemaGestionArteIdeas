// Control del menú móvil
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

document.getElementById('btnNuevoCliente').addEventListener('click', function() {
    document.getElementById('nuevoClienteModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
});

document.getElementById('cerrarModal').addEventListener('click', function() {
    document.getElementById('nuevoClienteModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
});

document.getElementById('cancelarCliente').addEventListener('click', function() {
    document.getElementById('nuevoClienteModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
});

// Lógica de filtrado de clientes
function aplicarFiltrosClientes() {
    const filtroNombre = document.getElementById('filtroNombre').value.toLowerCase();
    const filtroTipo = document.getElementById('filtroTipo').value;
    const filas = document.querySelectorAll('.table tbody tr');

    filas.forEach(fila => {
        const nombre = fila.children[1].textContent.toLowerCase();
        const tipo = fila.children[2].textContent.toLowerCase();
        let mostrar = true;

        if (filtroNombre && !nombre.includes(filtroNombre)) {
            mostrar = false;
        }
        if (filtroTipo && tipo !== filtroTipo) {
            mostrar = false;
        }
        fila.style.display = mostrar ? '' : 'none';
    });
}
// Asignar evento al botón de aplicar filtros
const btnAplicarFiltros = document.querySelector('.card.mb-3 .btn.btn-primary');
if (btnAplicarFiltros) {
    btnAplicarFiltros.addEventListener('click', aplicarFiltrosClientes);
}