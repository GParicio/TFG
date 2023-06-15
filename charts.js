// Obtener referencia al elemento de la lista de juegos
const gamesList = document.getElementById('games-list');
const gamesTable = document.getElementById('games-table');
const tbody = gamesTable.querySelector('tbody');
// Función para cargar los juegos desde la API
function loadGames() {

  // URL de la API para obtener los juegos por jugadores concurrentes
  const apiUrl = `https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/?key=7B354FC531C796347A514F11E1C1947A`;

  // Realizar la solicitud HTTP a la API
  axios.get(apiUrl)
  .then(response => {
    const games = response.data.response.ranks;

    // Generar las filas de la tabla con los datos de los juegos
    const rowsHTML = games.map(game => `
    
      <tr>
        <td>${game.rank}</td>
        <td id="${game.appid}"><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg" title="${game.appid}" width="40%" height="40%"></td>
        <td>${game.concurrent_in_game}</td>
        <td>${game.peak_in_game}</td>
      </tr>
    `).join('');

    // Agregar las filas a la tabla
    tbody.innerHTML = rowsHTML;
    const rows = tbody.querySelectorAll('tr');
rows.forEach(row => {
  row.addEventListener('click', function() {
    const appid = this.querySelector('td:nth-child(2)').id;
    window.location.href = `game.html?id=${appid}`;
  });
});
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Cargar los juegos al cargar la página
loadGames();
