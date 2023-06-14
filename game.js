const gameId = new URLSearchParams(window.location.search).get('id');

const apiKey = 'cb91fa6805msh47ea971cccb96e6p10ce2ajsn648f7d6605b9'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

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

axios.all([axios.request(options), axios.request(reviewOptions)]).then(axios.spread((...responses) => {
  const game = responses[0].data;
  const tagNames = game.tags.map(tag => tag.name);
  const reviews = responses[1].data.reviews;

  gameTotal.innerHTML = `
    <h3 class="game-title">${game.title}</h3>
    <p class="game-info"><span class="label">Released:</span> ${game.released}</p>
    <p class="game-info"><span class="label">Price:</span> ${game.price}</p>
    <p id="game-description" class="game-description">${game.description}</p>
    <img src="${game.imgUrl}" alt="${game.title}" class="game-image">
    <a href="https://store.steampowered.com/app/${gameId}/" style="display: flex; align-items: center; width: 125px;" target="_blank" class="game-link">Abrir en el navegador <img src="ChromeIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
    <br>
    <a href="steam://openurl/https://store.steampowered.com/app/${gameId}/" style="display: flex; align-items: center; width: 145px;" target="_blank" class="game-link">Abrir en el cliente de Steam <img src="SteamIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
    <br>
    <a href="review.html?id=${gameId}" style="display: flex; align-items: center; width: 75px;" target="_self" class="game-link">Ver reseñas <img src="thumbsUpIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
    <p id="game-description" class="game-description">${tagNames.join(', ')}</p>
    <link rel="stylesheet" href="stylesSlider.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="gameSlider.js"></script>
      <div id="slider">
        <a href="javascript:void(0)" class="control_next">>></a>
        <a href="javascript:void(0)" class="control_prev"><</a>
        <ul>
          <li>
          <div class="slider-item-content">
            <!-- Aquí se mostrará la reseña del primer juego -->
          </div>
          </li>
          <li style="background: #aaa;">
          <div class="slider-item-content">
            <!-- Aquí se mostrará la reseña del segundo juego -->
          </div>
          </li>
          <li>SLIDE 3</li>
          <li style="background: #aaa;">SLIDE 4</li>
        </ul>  
      </div>

      <div class="slider_option">
        <input type="checkbox" id="checkbox">
        <label for="checkbox">Autoplay Slider</label>
      </div>
    `;
    const script = document.createElement('script');
    script.src = 'gameSlider.js';
    document.body.appendChild(script);
  if (reviews.length === 0) {
    gameBlank.innerHTML = `
      <h3 class="game-title">No hay reseñas</h3>
      `;
  } else {
    reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.classList.add('review-item');
      reviewElement.innerHTML = `
        <div class="review-item-header">
          <img src="${review.author.avatar}" alt="${review.author.name}" class="review-item-avatar">
          <div class="review-item-info">
            <p class="review-item-name">${review.author}</p>
            <p class="review-item-date">${review.date}</p>
          </div>
        </div>
        <p class="review-item-content">${review.content}</p>
        <div class="review-item-footer">
          <p class="review-item-votes">Votos: ${review.votes}</p>
          <p class="review-item-percentage">Porcentaje: ${review.percentage}%</p>
        </div>
        <h4>Author: ${review.author}</h4>
        <p>Review: ${review.review}</p>
        <p>Rating: ${review.rating}</p>
        <p>Timestamp: ${review.timestamp}</p>
        <hr>
        `;
      reviewContainer.appendChild(reviewElement);
    });
  }
})).catch(errors => {
  console.log(errors);
});




// axios.request(options)
//   .then(response => {
    
//     const game = response.data;
//     const tagNames = game.tags.map(tag => tag.name);
    
//     gameTotal.innerHTML = `
//       <h3 class="game-title">${game.title}</h3>
//       <p class="game-info"><span class="label">Released:</span> ${game.released}</p>
//       <p class="game-info"><span class="label">Price:</span> ${game.price}</p>
//       <p id="game-description" class="game-description">${game.description}</p>
//       <img src="${game.imgUrl}" alt="${game.title}" class="game-image">
//       <a href="https://store.steampowered.com/app/${gameId}/" style="display: flex; align-items: center; width: 125px;" target="_blank" class="game-link">Abrir en el navegador <img src="ChromeIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
//       <br>
//       <a href="steam://openurl/https://store.steampowered.com/app/${gameId}/" style="display: flex; align-items: center; width: 145px;" target="_blank" class="game-link">Abrir en el cliente de Steam <img src="SteamIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
//       <br>
//       <a href="review.html?id=${gameId}" style="display: flex; align-items: center; width: 75px;" target="_self" class="game-link">Ver reseñas <img src="thumbsUpIcon.png" alt="Girl in a jacket" width="15" height="15" style="margin-left: 5px;"></a>
//       <p id="game-description" class="game-description">${tagNames.join(', ')}</p>
//     `;
    
//     gameBlank.textContent = `Released: ${game.released}`;    
        
//     //gameTitle.textContent = game.title;
    

//   })
//   .catch(error => {
//     console.error(error);
//   });

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

  