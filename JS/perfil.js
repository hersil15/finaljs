document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profileForm");
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");

    // Cargar datos del usuario
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('No hay usuario registrado. Por favor, inicia sesión.');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('username').value = loggedInUser.username;
    document.getElementById('email').value = loggedInUser.email;

    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);

        if (userIndex === -1) {
            alert('Usuario no encontrado. Por favor, regístrate.');
            window.location.href = 'index.html';
            return;
        }

        users[userIndex] = { username, email, password, userType: loggedInUser.userType };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Información del usuario modificada exitosamente.');
        window.location.href = 'login.html';
    });

    if (toggleDarkModeButton) {
        toggleDarkModeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }
});
