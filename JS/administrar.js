document.addEventListener('DOMContentLoaded', function () {
  const userRole = 'admin'; // Este valor se modifica solo en la consola
  if (userRole !== 'admin') {
      alert('Acceso denegado');
      return;
  }

  // Cargar datos de usuarios del localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userContainer = document.querySelector('.grid.grid-cols-4');

  users.forEach(user => {
    const userRow = document.createElement('div');
    userRow.className = 'col-span-4 grid grid-cols-4 gap-4 mb-2';
    userRow.innerHTML = `
      <input type="text" value="${user.username}" class="border border-gray-400 p-1" />
      <input type="text" value="${user.email}" class="border border-gray-400 p-1" />
      <input type="password" value="${user.password}" class="border border-gray-400 p-1" />
      <button class="bg-gray-500 text-white px-2 py-1 modify-btn">Modificar</button>
      `;
      userContainer.appendChild(userRow);
  });

  // Función para guardar cambios en localStorage
  userContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('modify-btn')) {
      const row = event.target.closest('.grid.grid-cols-4');
      const updatedUser = {
        username: row.children[0].value,
        email: row.children[1].value,
        password: row.children[2].value
      };
      const index = Array.from(userContainer.children).indexOf(row) - 1; // -1 para omitir el encabezado
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Cambios guardados con éxito');
      }
  });
});