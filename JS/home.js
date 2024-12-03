document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const logoutButton = document.getElementById("logoutButton");
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    welcomeMessage.textContent = `Bienvenido, ${loggedInUser.username}!`;

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem('loggedInUser');
        document.cookie = `loggedIn=false; max-age=0; path=/`;
        window.location.href = 'login.html';
    });

    if (toggleDarkModeButton) {
        toggleDarkModeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }
});
