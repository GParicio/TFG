// Obtener referencia al elemento contenedor para los juegos
const topReleasesContainer = document.getElementById('top-releases');

// URL de la API para obtener los juegos principales
const apiUrl = 'https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=7B354FC531C796347A514F11E1C1947A';

// Realizar la solicitud HTTP a la API
axios.get(apiUrl)
  .then(response => {
    const pages = response.data.response.pages;

    // Generar el contenido HTML para los juegos principales
    const gamesHTML = pages.map(page => {
      const gamesList = page.item_ids.map(item => `
        <div class="game-square">
        <a href="game.html?id=${item.appid}">
        <img title="${item.appid}" onerror="this.onerror=null;this.src='icons/imagenotfound.jpg';" src="https://cdn.cloudflare.steamstatic.com/steam/apps/${item.appid}/hero_capsule.jpg" style="height:300px;width:200px">
        </a>
        </div>
      `).join('');
      return `
        <h2 style="display:flex;justify-content: center;align-items:center">${page.name}</h2>
        <br>
        <div class="games-container" style="display:flex;justify-content: center;align-items:center">${gamesList}</div>
        <br>
      `;
    }).join('');

    // Agregar el contenido HTML al contenedor
    topReleasesContainer.innerHTML = gamesHTML;
  })
  .catch(error => {
    console.error('Error:', error);
  });
