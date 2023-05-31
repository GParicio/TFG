const apiKey = '79495262damsh0ccac0e59f88553p108ecbjsn61567da6ba49'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gamesList = document.getElementById('games-list');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    return;
  }

  const url = `https://steam2.p.rapidapi.com/search/${searchTerm}/page/1`;

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
        gameElement.innerHTML = `
          <h3>${game.title}</h3>
          <p>${game.released}</p>
          <p>${game.price}</p>
          <hr>
        `;
        gamesList.appendChild(gameElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
});
