document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const recoverAccessLink = document.getElementById("recoverAccessLink");
    const recoverForm = document.getElementById("recoverForm");
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
        return re.test(password);
    };

    const validateUsername = (username) => {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    };

    // Mostrar formulario de recuperación de acceso
    recoverAccessLink.addEventListener("click", (e) => {
        e.preventDefault();
        recoverForm.style.display = "block";
    });

    // Manejar el formulario de recuperación de acceso
    recoverForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const recoverEmail = e.target.recoverEmail.value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === recoverEmail);

        if (user) {
            alert('El correo electrónico fue verificado exitosamente');
            window.location.href = 'perfil.html';
        } else {
            alert('El correo no está registrado. Regístrate.');
            window.location.href = 'index.html';
        }
    });

    // Registro de usuario
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const userType = e.target.userType.value;

        if (!username || !email || !password || !confirmPassword) {
            alert('Ingresa tus datos para registrarte.');
            return;
        }

        if (!validateUsername(username)) {
            alert('Ingresa datos válidos para el nombre de usuario.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Ingresa datos válidos para el correo electrónico.');
            return;
        }

        if (!validatePassword(password)) {
            alert('La contraseña debe tener mínimo 8 caracteres, al menos una letra mayúscula y un carácter especial, y las contraseñas deben ser iguales.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas deben ser iguales.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username || user.email === email);

        if (userExists) {
            alert('El usuario ya está registrado. Por favor, inicia sesión.');
            window.location.href = 'login.html';
            return;
        }

        users.push({ username, email, password, userType });
        localStorage.setItem('users', JSON.stringify(users));
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    });

    // Modo oscuro
    toggleDarkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
