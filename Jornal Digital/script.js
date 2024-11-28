async function procurarReceitas() {
    const ingredients = document.getElementById('ingredients').value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    const data = await response.json();

    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    if (!data.meals) {
        recipeList.innerHTML = '<li>Nenhuma receita encontrada.</li>';
        return;
    }

    data.meals.forEach(meal => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${meal.strMeal}</strong> - <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">Ver Receita</a>`;
        recipeList.appendChild(li);
    });

} //API DE GERADOR DE RECEITAS

const toggleButton = document.getElementById("toggle-theme");
const linkElement = document.getElementById("theme-style");
const headerElement = document.querySelector("header");
const bodyElement = document.body;
let darkMode = false;

const darkHeaderHTML = `
  <nav class="navbar bg-dark text-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img class="logo" src="imagens/Logo (Escuro).png" width="200px" height="80px">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="text me-2">MENU</span>  
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title text-light" id="offcanvasNavbarLabel">MENU</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <button id="toggle-theme" class="btn btn-light position-fixed" style="top: 10px; right: 10px;">Modo Claro</button>
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active text-light" aria-current="page" href="index.html">Página Inicial</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
`;

function toggleTheme() {
  if (darkMode) {
    // Mudar para o tema claro
    linkElement.href = "style.css"; // Link para o CSS claro
    headerElement.innerHTML = `
      <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img class="logo" src="imagens/Logo (Claro).png" width="200px" height="80px">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="text me-2">MENU</span>  
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <button id="toggle-theme" class="btn btn-primary position-fixed" style="top: 10px; right: 10px;">Modo Escuro</button>
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="index.html">Página Inicial</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  } else {
    // Mudar para o tema escuro
    linkElement.href = "style(escuro).css"; // Link para o CSS escuro
    headerElement.innerHTML = darkHeaderHTML;
  }

  // Atualizar eventos após troca do HTML
  document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

  // Alternar o estado do modo escuro
  darkMode = !darkMode;

  // Garantir que a rolagem funcione corretamente
  setTimeout(() => {
    bodyElement.classList.add('overflow-auto');  // Garantir que o body tenha rolagem
  }, 100);
}

// Adicionar evento inicial
toggleButton.addEventListener("click", toggleTheme);
