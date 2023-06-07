const apiKey = 'b304040befmshba02f64c3ef3cafp189adejsn9eac6875b22b'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

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

  axios.request(options)
    .then(response => {
      
      gamesList.innerHTML = '';

      response.data.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game-item');
        
      const gameLink = document.createElement('a');
      gameLink.href = `game.html?id=${game.appId}`;
        gameElement.innerHTML = `
          <h3><a href="game.html?id=${game.appId}">${game.title}</a></h3>
          <p class="game-info"><span class="label">Released:</span> ${game.released}</p>
          <p class="game-info"><span class="label">Price:</span> ${game.price}</p>
          <img src="${game.imgUrl}" alt="${game.title}" class="game-image">
          <a href="https://store.steampowered.com/app/${game.appId}/" target="_blank" class="game-link">Ver en Steam</a>
        `;
        gameElement.appendChild(gameLink);
        gamesList.appendChild(gameElement);
      });
      prevButton.style.display = 'inline';
      nextButton.style.display = 'inline';
      updateButtonVisibility(response.pageCount);
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

