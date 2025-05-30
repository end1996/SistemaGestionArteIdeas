document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const btnNuevaOrden = document.getElementById('btnNuevaOrden');
    const ordenModal = document.getElementById('ordenModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const btnAgregarMaterial = document.getElementById('agregarMaterial');
    const materialesLista = document.getElementById('materialesLista');
    const alertasInventario = document.getElementById('alertasInventario');

    // Datos de ejemplo de inventario (en un sistema real, esto vendría de una base de datos)
    const inventario = {
        'papel_10x15': { stock: 100, minimo: 20 },
        'papel_13x18': { stock: 50, minimo: 10 },
        'quimico_revelador': { stock: 5, minimo: 2 },
        'marco_20x30': { stock: 15, minimo: 5 }
    };

    // Función para mostrar el modal
    function mostrarModal() {
        ordenModal.style.display = 'block';
        modalBackdrop.style.display = 'block';
    }

    // Función para cerrar el modal
    function cerrarModal() {
        ordenModal.style.display = 'none';
        modalBackdrop.style.display = 'none';
        // Limpiar el formulario
        document.getElementById('formOrden').reset();
        // Limpiar materiales
        materialesLista.innerHTML = '';
        // Limpiar alertas
        alertasInventario.innerHTML = '';
        // Agregar primera fila de material
        agregarFilaMaterial();
    }

    // Función para agregar una nueva fila de material
    function agregarFilaMaterial() {
        const materialItem = document.createElement('div');
        materialItem.className = 'material-item';
        materialItem.innerHTML = `
            <div class="form-row">
                <div class="form-col">
                    <select class="form-control material-select">
                        <option value="">Seleccionar Material</option>
                        <option value="papel_10x15">Papel 10x15</option>
                        <option value="papel_13x18">Papel 13x18</option>
                        <option value="quimico_revelador">Químico Revelador</option>
                        <option value="marco_20x30">Marco 20x30</option>
                    </select>
                </div>
                <div class="form-col">
                    <input type="number" class="form-control" placeholder="Cantidad" min="1">
                </div>
                <div class="form-col">
                    <span class="stock-info">Stock: <span class="stock-cantidad">0</span></span>
                </div>
            </div>
        `;
        materialesLista.appendChild(materialItem);

        // Agregar event listeners a los nuevos elementos
        const select = materialItem.querySelector('.material-select');
        const cantidadInput = materialItem.querySelector('input[type="number"]');
        const stockInfo = materialItem.querySelector('.stock-info');

        select.addEventListener('change', function() {
            actualizarStockInfo(this.value, stockInfo);
            verificarStock();
        });

        cantidadInput.addEventListener('input', function() {
            verificarStock();
        });
    }

    // Función para actualizar la información de stock
    function actualizarStockInfo(materialId, stockInfo) {
        if (materialId && inventario[materialId]) {
            const stock = inventario[materialId].stock;
            stockInfo.innerHTML = `Stock: <span class="stock-cantidad">${stock}</span>`;
            stockInfo.className = `stock-info ${stock <= inventario[materialId].minimo ? 'bajo' : 'normal'}`;
        } else {
            stockInfo.innerHTML = 'Stock: <span class="stock-cantidad">0</span>';
            stockInfo.className = 'stock-info';
        }
    }

    // Función para verificar el stock de todos los materiales
    function verificarStock() {
        alertasInventario.innerHTML = '';
        const materiales = document.querySelectorAll('.material-item');
        
        materiales.forEach(material => {
            const select = material.querySelector('.material-select');
            const cantidadInput = material.querySelector('input[type="number"]');
            
            if (select.value && cantidadInput.value) {
                const materialId = select.value;
                const cantidad = parseInt(cantidadInput.value);
                const stock = inventario[materialId].stock;
                
                if (cantidad > stock) {
                    const alerta = document.createElement('div');
                    alerta.className = 'alert alert-danger';
                    alerta.textContent = `Stock insuficiente de ${select.options[select.selectedIndex].text}. Necesitas ${cantidad} pero solo hay ${stock} disponibles.`;
                    alertasInventario.appendChild(alerta);
                } else if (stock <= inventario[materialId].minimo) {
                    const alerta = document.createElement('div');
                    alerta.className = 'alert alert-warning';
                    alerta.textContent = `Stock bajo de ${select.options[select.selectedIndex].text}. Quedan ${stock} unidades.`;
                    alertasInventario.appendChild(alerta);
                }
            }
        });
    }

    // Event Listeners
    btnNuevaOrden.addEventListener('click', function() {
        mostrarModal();
        agregarFilaMaterial();
    });

    btnAgregarMaterial.addEventListener('click', agregarFilaMaterial);

    // Cerrar modal al hacer clic en el backdrop
    modalBackdrop.addEventListener('click', cerrarModal);

    // Cerrar modal al hacer clic en el botón de cerrar
    document.querySelector('.modal-close').addEventListener('click', cerrarModal);
}); 