document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const userType = e.target.userType.value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            if (userType === 'admin' && user.userType === 'admin') {
                document.cookie = `loggedIn=true; max-age=7200; path=/`; // Duración de 2 horas
                window.location.href = 'administrar.html';
            } else if (userType === 'user' && user.userType === 'user') {
                document.cookie = `loggedIn=true; max-age=7200; path=/`; // Duración de 2 horas
                window.location.href = 'home.html';
            } else {
                alert('Tipo de usuario incorrecto. Por favor, verifica tus datos.');
            }
        } else {
            alert('Usuario no registrado. Por favor, regístrate.');
            window.location.href = 'index.html';
        }
    });

    // Modo oscuro
    if (toggleDarkModeButton) {
        toggleDarkModeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }
});
