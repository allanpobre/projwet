function setupThemeToggle() {
  const linkElement = document.getElementById("theme-style");
  let darkMode = linkElement.href.includes("style(escuro).css"); // Detectar estado inicial

  // Função para alternar o tema
  function toggleTheme() {
    const headerContainer = document.getElementById("header-container");

    if (darkMode) {
      // Trocar para o tema claro
      linkElement.href = "style.css"; // Link para o tema claro
      loadHTML("header-container", "header.html", setupThemeToggle); // Recarregar header
    } else {
      // Trocar para o tema escuro
      linkElement.href = "style(escuro).css"; // Link para o tema escuro
      loadHTML("header-container", "header-dark.html", setupThemeToggle); // Recarregar header
    }

    darkMode = !darkMode;

    // Garantir que o body e o layout estejam consistentes após a troca
    document.body.style.overflow = "auto"; // Garantir que a rolagem funcione corretamente
    document.body.style.margin = "0"; // Garantir que não haja margem extra no body
    document.body.style.padding = "0"; // Garantir que não haja padding extra

    // Garantir que o footer e o layout não se desloquem
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.margin = "0"; // Remover margens que possam causar desalinhamento
    }
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
  loadHTML("header-container", "header.html", setupThemeToggle); // Header padrão
  loadHTML("footer-container", "footer.html"); // Footer padrão
});
