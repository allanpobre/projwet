function setupThemeToggle() {
  const linkElement = document.getElementById("theme-style");
  let darkMode = linkElement.href.includes("style(escuro).css"); // Detectar estado inicial

  // Função para alternar o tema
  function toggleTheme() {
    const headerContainer = document.getElementById("header-container");

    if (darkMode) {
      // Trocar para o tema claro
      linkElement.href = "../../Funcionalidades/Estilização/CSS/style.css"; // Link para o tema claro
      loadHTML("header-container", "../../Funcionalidades/Estilização/HTML/header.html", setupThemeToggle); // Recarregar header
    } else {
      // Trocar para o tema escuro
      linkElement.href = "../../Funcionalidades/Estilização/CSS/style(escuro).css"; // Link para o tema escuro
      loadHTML("header-container", "../../Funcionalidades/Estilização/HTML/header-dark.html", setupThemeToggle); // Recarregar header
    }

    darkMode = !darkMode;
  }

  // Adicionar evento ao botão após o carregamento do header
  const toggleButton = document.getElementById("toggle-theme");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  }
}

// Função para carregar o conteúdo do header ou footer
function loadHTML(containerId, filePath, callback) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(containerId).innerHTML = html;

      // Executa callback para configurar eventos dinâmicos, se necessário
      if (callback) callback();
    })
    .catch((error) => console.error(error));
}

// Carregar header e footer
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-container", "../../Funcionalidades/Estilização/HTML/header.html", setupThemeToggle); // Header padrão
  loadHTML("footer-container", "../../Funcionalidades/Estilização/HTML/footer.html"); // Footer padrão
});
