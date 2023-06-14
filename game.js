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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-jSNXkH0K4LnGOvhv/+MmMhgj72IM8Pgml6i2u2T8hGLqWabmY3E0bsziNoLzkrPpX22dE1WpKpxdby9fM8f6BQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div id="slider">
        <a href="javascript:void(0)" class="control_next">>></a>
        <a href="javascript:void(0)" class="control_prev"><</a>
        <ul>
          <li>
          <div class="slider-item-content">
            <!-- Aquí se mostrará la reseña del primer juego -->
          </div>
          </li>
          <li>
          <div class="slider-item-content">
            <!-- Aquí se mostrará la reseña del segundo juego -->
          </div>
          </li>
          <li>
          <div class="slider-item-content">
            <!-- Aquí se mostrará la reseña del tercer juego -->
          </div>
          </li>
          <li>
          <div class="slider-item-content">
            <!-- Aquí se mostrará la reseña del cuarto juego -->
          </div>
          </li>
        </ul>  
      </div>

      <div class="slider_option" style="visibility: hidden">
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
    reviews.forEach((review, index) => {
      const reviewElement = document.createElement('div');
    reviewElement.classList.add('review-item');
    
    let truncatedReview = review.review;
    if (truncatedReview.length > 80) {
      const lastSpaceIndex = truncatedReview.lastIndexOf(' ', 80);
      truncatedReview = truncatedReview.substring(0, lastSpaceIndex) + '...';
    }

    reviewElement.innerHTML = `
    ${review.voted_up ? '<img src="thumbsUpIcon.png" alt="Thumbs Up" height="15" width="15">' : '<img src="thumbsDownIcon.png" alt="Thumbs Down" height="15" width="15">'}
    Review: ${truncatedReview}
    `;
  const reviewTextElement = document.createElement('div');
  reviewTextElement.classList.add('review-property');
  reviewTextElement.textContent = `Review: ${review.review}`;
  reviewElement.appendChild(reviewTextElement);

  const ratingElement = document.createElement('div');
  ratingElement.classList.add('review-property');
  ratingElement.textContent = `Rating: ${review.rating}`;
  reviewElement.appendChild(ratingElement);
  // Crear un elemento de icono según el valor de review.voted_up
  const thumbIcon = document.createElement('i');
  thumbIcon.classList.add('fas', review.voted_up ? 'fa-thumbs-up' : 'fa-thumbs-down');

  // Agregar el icono al inicio del elemento de la reseña
  reviewElement.insertBefore(thumbIcon, reviewElement.firstChild);

  if (review.voted_up) {
    reviewElement.style.backgroundImage = 'linear-gradient(to bottom, #4e9cff, #0047b3)';
    reviewElement.style.color = 'white';
    
  } else {
    reviewElement.style.backgroundImage = 'linear-gradient(to bottom, #ff4e4e, #b30000)';
    reviewElement.style.color = 'white';
  }
    
      // Obtener la pestaña correspondiente en el slider
      const sliderItemContent = document.querySelectorAll('.slider-item-content')[index];
      // Agregar la reseña al contenido de la pestaña
      sliderItemContent.appendChild(reviewElement);
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

  