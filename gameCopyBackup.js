// Con las dos formas de hacerlo funcional

const gameId = new URLSearchParams(window.location.search).get('id');

const apiKey = '79495262damsh0ccac0e59f88553p108ecbjsn61567da6ba49'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

const gameTitle = document.getElementById('game-title');
const gameReleased = document.getElementById('game-released');
const gamePrice = document.getElementById('game-price');
const gameDescription = document.getElementById('game-description');
const gameImage = document.getElementById('game-image');
const gameLink = document.getElementById('game-link');

const gameTotal = document.getElementById('games-list');


const url = `https://steam2.p.rapidapi.com/appDetail/${gameId}`;

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
    
    const game = response.data;

    gameTotal.innerHTML = `
          <a>test</a>
          <h3><a href="game.html?id=${game.appId}">${game.title}</a></h3>
          <p class="game-info"><span class="label">Released:</span> ${game.released}</p>
          <p class="game-info"><span class="label">Price:</span> ${game.price}</p>
          <img src="${game.imgUrl}" alt="${game.title}" class="game-image">
          <a href="https://store.steampowered.com/app/${gameId}/" target="_blank" class="game-link">Ver en Steam</a>
        `;


    

    gameTitle.textContent = game.title;
    gameReleased.textContent = `Released: ${game.released}`;
    gamePrice.textContent = `Price: ${game.price}`;
    gameDescription.textContent = game.description;
    gameLink.textContent = game.appId;
    gameImage.src = game.imgUrl;
    gameLink.href = `https://store.steampowered.com/app/${gameId}/`;
    gameLink.hrefName = `Ver en Steam`;
  })
  .catch(error => {
    console.error(error);
  });

  