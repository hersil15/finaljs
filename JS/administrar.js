// JS/administrar.js

document.addEventListener("DOMContentLoaded", () => {
  const usersTable = document.getElementById("usersTable");
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!loggedInUser || loggedInUser.userType !== 'admin') {
      alert('Acceso denegado. Solo los administradores pueden acceder a esta página.');
      window.location.href = 'home.html';
      return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  usersTable.innerHTML = users.map((user, index) => `
      <tr>
          <td><input type="text" value="${user.username}" data-index="${index}" data-field="username"></td>
          <td><input type="email" value="${user.email}" data-index="${index}" data-field="email"></td>
          <td>
              <select data-index="${index}" data-field="userType">
                  <option value="user" ${user.userType === 'user' ? 'selected' : ''}>Usuario</option>
                  <option value="admin" ${user.userType === 'admin' ? 'selected' : ''}>Administrador</option>
              </select>
          </td>
          <td><button onclick="deleteUser(${index})">Eliminar</button></td>
      </tr>
  `).join('');

  usersTable.addEventListener("change", (e) => {
      const target = e.target;
      const index = target.getAttribute("data-index");
      const field = target.getAttribute("data-field");
      users[index][field] = target.value;
      localStorage.setItem('users', JSON.stringify(users));
  });

  // Toggle Dark Mode
  const toggleDarkModeButton = document.getElementById("toggleDarkMode");
  toggleDarkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem('darkMode', darkMode);
  });

  // Apply dark mode based on saved preference
  if (JSON.parse(localStorage.getItem('darkMode'))) {
    document.body.classList.add("dark-mode");
  }
});

function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
}
