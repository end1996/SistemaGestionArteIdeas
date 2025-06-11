document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
    this.classList.toggle('menu-active');
});