// js/review.js

const gameId = new URLSearchParams(window.location.search).get('id');

const apiKey = 'baac56be76msh86448bb5e708a67p18c330jsn3e85f5884e52'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

const reviewContainer = document.getElementById('review-container');

const url = `https://steam2.p.rapidapi.com/appReviews/${gameId}/limit/50/*`;

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
    const reviews = response.data.reviews;
    reviewContainer.innerHTML = '';
    //hacer un const que pase playtime_forever a horas
    if (reviews.length > 0) {
      reviews.forEach(review => {
        const playtimeInHours = parseFloat((review.author.playtime_forever / 60).toFixed(1));
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');
        if (review.voted_up) {
          reviewElement.classList.add('positive');
        } else {
          reviewElement.classList.add('negative');
        }
        reviewElement.innerHTML = `
        ${review.voted_up ? '<img src="icons/thumbsUpIcon.png" alt="Thumbs Up" height="30" width="30">' : '<img src="icons/thumbsDownIcon.png" alt="Thumbs Down" height="30" width="30">'}
          <br>
          <p>Reseña: ${review.review}</p>
          <p style="font-size:12px">Tiempo jugado: ${playtimeInHours}hrs</p>
          ${review.votes_up ? `<br><p>A ${review.votes_up} usuarios les pareció interesante</p>` : ''}
          ${review.votes_funny ? `<br><p>A ${review.votes_funny} usuarios les pareció divertido</p>` : ''}
        `;
        reviewContainer.appendChild(reviewElement);
      });
    } else {
      const noReviewsElement = document.createElement('p');
      noReviewsElement.classList.add('no-reviews');
      noReviewsElement.textContent = 'No hay reseñas disponibles';
      reviewContainer.appendChild(noReviewsElement);
    }
  })
  .catch(error => {
    console.error(error);
  });
