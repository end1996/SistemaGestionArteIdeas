// Inicialización de gráficos al cargar el documento
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    // Configurar eventos para generación de reportes
    document.getElementById('generate-report').addEventListener('click', generateReport);
    document.getElementById('export-report').addEventListener('click', exportReport);
});

// Función para inicializar todos los gráficos
function initializeCharts() {
    createServicesChart();
    createClientsChart();
    createTopProductsChart();
    createInventoryChart();
    createProfitabilityChart();
    createCostsVsIncomeChart();
}

// Gráfico de ingresos por servicio
function createServicesChart() {
    const ctx = document.getElementById('services-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Impresión Minilab', 'Recordatorios Escolares', 'Enmarcado', 'Retoque Fotográfico'],
            datasets: [{
                data: [2250, 7200, 4500, 1050],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc',
                    '#f6c23e'
                ],
                hoverBackgroundColor: [
                    '#2e59d9',
                    '#17a673',
                    '#2c9faf',
                    '#dda20a'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let dataset = data.datasets[tooltipItem.datasetIndex];
                        let total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                        let currentValue = dataset.data[tooltipItem.index];
                        let percentage = Math.floor(((currentValue/total) * 100) + 0.5);
                        return `${data.labels[tooltipItem.index]}: $${currentValue.toLocaleString()} (${percentage}%)`;
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

// Gráfico de ingresos por cliente
function createClientsChart() {
    const ctx = document.getElementById('clients-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Colegio San José', 'Colegio Santa María', 'Juan Pérez', 'María López', 'Otros'],
            datasets: [{
                label: 'Ingresos ($)',
                data: [5000, 4000, 2500, 2000, 1500],
                backgroundColor: '#4e73df',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de productos más vendidos
function createTopProductsChart() {
    const ctx = document.getElementById('top-products-chart').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['Recordatorio Diseño A', 'Marco 20x30', 'Impresión 10x15', 'Álbum Fotográfico', 'Impresión 15x20'],
            datasets: [{
                label: 'Cantidad Vendida',
                data: [85, 22, 250, 15, 120],
                backgroundColor: '#1cc88a',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            indexAxis: 'y'
        }
    });
}

// Gráfico de estado del inventario
function createInventoryChart() {
    const ctx = document.getElementById('inventory-chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Stock Normal', 'Stock Bajo', 'Stock Crítico'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: [
                    '#1cc88a',
                    '#f6c23e',
                    '#e74a3b'
                ],
                hoverBackgroundColor: [
                    '#17a673',
                    '#dda20a',
                    '#be2617'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Gráfico de rentabilidad por servicio
function createProfitabilityChart() {
    const ctx = document.getElementById('profitability-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Impresión Minilab', 'Recordatorios Escolares', 'Enmarcado', 'Retoque Fotográfico'],
            datasets: [{
                label: 'Rentabilidad (%)',
                data: [65, 70, 60, 75],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc',
                    '#f6c23e'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de costos vs ingresos
function createCostsVsIncomeChart() {
    const ctx = document.getElementById('costs-vs-income-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Impresión Minilab', 'Recordatorios Escolares', 'Enmarcado', 'Retoque Fotográfico'],
            datasets: [
                {
                    label: 'Ingresos',
                    data: [2250, 7200, 4500, 1050],
                    backgroundColor: '#1cc88a',
                    borderWidth: 1
                },
                {
                    label: 'Costos',
                    data: [787.50, 2160, 1800, 262.50],
                    backgroundColor: '#e74a3b',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Función para generar reportes según filtros
function generateReport() {
    // Obtener valores de filtros
    const reportType = document.getElementById('report-type').value;
    const dateRange = document.getElementById('date-range').value;
    let startDate, endDate;
    
    if (dateRange === 'custom') {
        startDate = document.getElementById('start-date').value;
        endDate = document.getElementById('end-date').value;
        
        if (!startDate || !endDate) {
            alert('Por favor seleccione fechas válidas para el reporte personalizado.');
            return;
        }
    }
    
    // En un entorno real, aquí se haría una petición al backend
    // para obtener los datos filtrados según los parámetros
    
    // Simulamos una actualización de datos
    showLoadingState();
    
    // Simulamos tiempo de carga
    setTimeout(() => {
        // Actualizar gráficos según el tipo de reporte
        switch(reportType) {
            case 'financial':
                updateFinancialReports();
                break;
            case 'products':
                updateProductsReports();
                break;
            case 'inventory':
                updateInventoryReports();
                break;
            case 'profitability':
                updateProfitabilityReports();
                break;
        }
        
        hideLoadingState();
        
        // Mostrar mensaje de éxito
        showSuccessMessage('Reporte generado exitosamente');
    }, 1000);
}

// Función para exportar reportes
function exportReport() {
    const reportType = document.getElementById('report-type').value;
    const dateRange = document.getElementById('date-range').value;
    
    // En un entorno real, aquí se generaría un PDF o Excel
    // y se descargaría
    
    alert(`Exportando reporte de ${reportType} para ${dateRange}. En un entorno real, aquí se generaría un PDF o Excel.`);
}

// Funciones auxiliares para actualizar reportes (simuladas)
function updateFinancialReports() {
    // Aquí se actualizarían los gráficos con nuevos datos
    createServicesChart();
    createClientsChart();
}

function updateProductsReports() {
    createTopProductsChart();
}

function updateInventoryReports() {
    createInventoryChart();
}

function updateProfitabilityReports() {
    createProfitabilityChart();
    createCostsVsIncomeChart();
}

// Funciones de UI para estados de carga
function showLoadingState() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.style.opacity = '0.5';
        
        // Añadir indicador de carga
        const loader = document.createElement('div');
        loader.className = 'chart-loader';
        loader.innerHTML = 'Cargando...';
        loader.style.position = 'absolute';
        loader.style.top = '50%';
        loader.style.left = '50%';
        loader.style.transform = 'translate(-50%, -50%)';
        loader.style.fontWeight = 'bold';
        container.appendChild(loader);
    });
}

function hideLoadingState() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.style.opacity = '1';
        
        // Remover indicador de carga
        const loader = container.querySelector('.chart-loader');
        if (loader) {
            container.removeChild(loader);
        }
    });
}

function showSuccessMessage(message) {
    // Crear elemento para mensaje
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '1000';
    
    document.body.appendChild(alert);
    
    // Auto eliminar después de 3 segundos
    setTimeout(() => {
        document.body.removeChild(alert);
    }, 3000);
}

// Fix para Chart.js horizontal bar
// Añadir soporte para el tipo obsoleto 'horizontalBar'
Chart.register({
    id: 'horizontalBar',
    beforeRegister: function(chart, options) {
        chart.options.indexAxis = 'y';
        chart.config.type = 'bar';
    }
}); 