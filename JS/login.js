document.addEventListener("DOMContentLoaded", () => {
  const createCookie = (name, value, hours) => {
    let date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
  };

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      // Si el usuario está registrado y la contraseña es correcta
      createCookie('loggedIn', 'true', 2); // Crear una cookie con duración de 2 horas
      localStorage.setItem('loggedInUser', username); // Guardar el nombre de usuario logueado en localStorage
      window.location.href = 'home.html'; // Redirigir a la página home
    } else {
      // Si el usuario no está registrado o la contraseña es incorrecta
      alert('Usuario no registrado, por favor registrarse.');
      window.location.href = 'index.html'; // Redirigir a la página de registro
    }
  });
});
