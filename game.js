const gameId = new URLSearchParams(window.location.search).get('id');

const apiKey = '79495262damsh0ccac0e59f88553p108ecbjsn61567da6ba49'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

const gameTotal = document.getElementById('games-total');
const gameBlank = document.getElementById('games-blank');
const reviewContainer = document.getElementById('review-container');



const url = `https://steam2.p.rapidapi.com/appDetail/${gameId}`;

const urlReview = `https://steam2.p.rapidapi.com/appReviews/${gameId}/limit/40/*`;


const options = {
  method: 'GET',
  url: url,
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
  }
};

const reviewOptions = {
  method: 'GET',
  url: urlReview,
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
  }
};


axios.request(options)
  .then(response => {
    
    const game = response.data;
    const tagNames = game.tags.map(tag => tag.name);

    gameTotal.innerHTML = `
      <h3>${game.title}</h3>
      <p class="game-info"><span class="label">Released:</span> ${game.released}</p>
      <p class="game-info"><span class="label">Price:</span> ${game.price}</p>
      <p id="game-description" class="game-description">${game.description}</p>
      <img src="${game.imgUrl}" alt="${game.title}" class="game-image">
      <a href="https://store.steampowered.com/app/${gameId}/" target="_blank" class="game-link">Ver en Steam</a>
      <p id="game-description" class="game-description">${tagNames.join(', ')}</p>
    `;
    
    gameBlank.textContent = `Released: ${game.released}`;

        
    //gameTitle.textContent = game.title;
    

  })
  .catch(error => {
    console.error(error);
  });

  //Peta si hago 2 requests a la vez

  // axios.request(reviewOptions)
  // .then(response => {
  //   const reviews = response.data.reviews;

  //   reviews.forEach(review => {
  //     const reviewElement = document.createElement('div');
  //     reviewElement.classList.add('review-item');
  //     reviewElement.innerHTML = `
  //       <h4>Author: ${review.author}</h4>
  //       <p>Review: ${review.review}</p>
  //       <p>Rating: ${review.rating}</p>
  //       <p>Timestamp: ${review.timestamp}</p>
  //       <hr>
  //     `;
  //     reviewContainer.appendChild(reviewElement);
  //   });
  // })
  // .catch(error => {
  //   console.error(error);
  // });

  