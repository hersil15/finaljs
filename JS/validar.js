document.addEventListener("DOMContentLoaded", () => {
const registerForm = document.getElementById("registerForm");

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
  };

const validatePassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
  return re.test(password);
  };

const validateUsername = (username) => {
  const re = /^[a-zA-Z]+$/;
  return re.test(username);
  };

const createCookie = (name, value, hours) => {
  let date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
  };
// Registro de usuario
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
const username = e.target.username.value;
const email = e.target.email.value;
const password = e.target.password.value;
const confirmPassword = e.target.confirmPassword.value;
const userType = "user"; // default to 'user' type if not provided

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
  alert('La contraseña debe tener mínimo 8 caracteres, al menos una letra mayúscula y un carácter especial.');
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
alert('¡El usuario fue registrado de forma exitosa!');
window.location.href = 'login.html';
    });
});
