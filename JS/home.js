document.addEventListener("DOMContentLoaded", () => {
  // Función que establece una cookie con un nombre, valor y tiempo de expiración en horas
  const setCookie = (name, value, hours) => {
    const date = new Date(Date.now() + hours * 60 * 60 * 1000); // Calcula la fecha de expiración
    const expires = date.toUTCString(); // Convierte la fecha a una cadena UTC
    document.cookie = `${name}=${value}; expires=${expires}; path=/`; // Establece la cookie
  };

  // Obtiene el formulario de login por su ID
  const loginForm = document.getElementById("loginForm");

  // Agrega un evento para manejar el envío del formulario
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío del formulario

    // Obtiene los valores de usuario y contraseña del formulario
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Obtiene los usuarios almacenados en localStorage o un array vacío si no existen
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Busca un usuario que coincida con el nombre de usuario y contraseña
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      // Si el usuario existe, establece una cookie y guarda el nombre de usuario en localStorage
      setCookie('loggedIn', 'true', 2); // La cookie expira en 2 horas
      localStorage.setItem('loggedInUser', username);
      window.location.href = 'home.html'; // Redirige al usuario a la página de inicio
    } else {
      // Si el usuario no existe, muestra una alerta y redirige a la página de registro
      alert('Usuario no registrado, por favor registrarse.');
      window.location.href = 'index.html';
    }
  });

  // Verifica si el usuario está en la página de inicio
  const isOnHomePage = window.location.pathname.includes('home.html');
  // Verifica si hay una cookie que indique que el usuario está logueado
  const isLoggedIn = document.cookie.split(';').some(cookie => cookie.trim().startsWith('loggedIn='));

  if (isOnHomePage && !isLoggedIn) {
    // Si está en la página de inicio y no está logueado, redirige a la página de login
    window.location.href = 'index.html';
  }
});
