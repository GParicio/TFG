const apiKey = '3eb72223c7mshfa7f1a27dddf498p1bbad6jsn3006f571fb9f'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gamesList = document.getElementById('games-list');
const loader = document.getElementById('loader');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentPage = 1;

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const searchTerm = searchInput.value.trim();
  loader.style.display = 'inline';

  if (searchTerm === '') {
    return;
  }

  const url = `https://steam2.p.rapidapi.com/search/${searchTerm}/page/${currentPage}`;

  const options = {
    method: 'GET',
    url: url,
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
    }
  };

  jQuery(document).ready(function($) {
    // Obtener las appIds del archivo appIds.txt
    $.get('appIds.txt', function(data) {
      var appIds = data.split(',').map(function(appId) {
        return appId.trim();
      });
  
      // Manejar el evento click del botón
      $('#randomGameButton').click(function() {
        // Obtener una appId aleatoria
        var randomAppId = appIds[Math.floor(Math.random() * appIds.length)];
  
        // Redirigir a la página de game.html con la appId como parámetro en la URL
        window.location.href = 'game.html?appId=' + randomAppId;
      });
    });
  });
  

  axios.request(options)
    .then(response => {
      
      gamesList.innerHTML = '';

      response.data.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game-item');
        gameElement.style.backgroundImage = `url('https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appId}/header.jpg')`;
        gameElement.style.backgroundSize = 'cover';
        gameElement.style.backgroundPosition = 'center';
        gameElement.style.backgroundRepeat = 'no-repeat';
        gameElement.style.opacity = '0.85';
        const opacity = 0.85; // Cambia el valor de opacidad según tus necesidades

        // Agregar evento de ratón para iluminar el div
  gameElement.addEventListener('mouseover', function() {
    gameElement.style.opacity = 1;
    //transition opacity
    gameElement.style.transition = "opacity 0.5s ease-in-out";
  });

  // Agregar evento de ratón para volver a la opacidad original
  gameElement.addEventListener('mouseout', function() {
    gameElement.style.opacity = opacity;
  });

        // Verificar si el juego tiene un precio rebajado
        const isDiscounted = game.price.includes('€') && game.price.split('€')[1].trim().length > 0;

        // Obtener el precio a mostrar (precio original o precio rebajado)
        const priceToShow = isDiscounted ? game.price.split('€')[1].trim().concat("€") : game.price;
        
        // Obtener el precio original si está rebajado
        const originalPrice = isDiscounted ? game.price.split('€')[0].trim().concat("€") : '';

      const gameLink = document.createElement('a');
      gameLink.href = `game.html?id=${game.appId}`;
      // Agregar evento de clic al elemento del juego
      gameElement.addEventListener('click', function() {
        window.location.href = `game.html?id=${game.appId}`;
      });
      gameElement.innerHTML = ` 
      <h3><a href="game.html?id=${game.appId}">${game.title}</a></h3>
        <p class="game-info"><span class="label">Released:</span> ${game.released}</p>
        <p class="game-price"><span class="label">Price: </span>${game.price && game.price.trim().length > 0 ? priceToShow : 'Sin precio'}</p>
        <a href="https://store.steampowered.com/app/${game.appId}/" style="display: flex; align-items: center;" target="_blank" class="game-link">Abrir en el navegador <img src="ChromeIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
        <br>
        <a href="steam://openurl/https://store.steampowered.com/app/${game.appId}/" style="display: flex; align-items: center;" target="_blank" class="game-link">Abrir en el cliente de Steam <img src="SteamIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
    `;
    
        gameElement.appendChild(gameLink);
        gamesList.appendChild(gameElement);
      });
      prevButton.style.display = 'inline';
      nextButton.style.display = 'inline';
      updateButtonVisibility(response.pageCount);
      //Mostrar por consola el número de juegos que hay
      console.log(response.pageCount);

    })
    .catch(error => {
      console.error(error);
    });
});

prevButton.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    searchForm.dispatchEvent(new Event('submit'));
  }
});

nextButton.addEventListener('click', function() {
  currentPage++;
  searchForm.dispatchEvent(new Event('submit'));
});

function updateButtonVisibility(pageCount) {
  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentPage === pageCount) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

