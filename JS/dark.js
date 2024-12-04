document.addEventListener("DOMContentLoaded", () => {
  const toggleDarkModeButton = document.getElementById("toggleDarkMode");

  // Modo oscuro
  toggleDarkModeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  });
});
