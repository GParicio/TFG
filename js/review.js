// js/review.js

const gameId = new URLSearchParams(window.location.search).get('id');

const apiKey = '3eb72223c7mshfa7f1a27dddf498p1bbad6jsn3006f571fb9f'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

const reviewContainer = document.getElementById('review-container');

const url = `https://steam2.p.rapidapi.com/appReviews/${gameId}/limit/40/*`;

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

    if (reviews.length > 0) {
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');
        reviewElement.innerHTML = `
          <h4>Autor: ${review.author}</h4>
          <p>Reseña: ${review.review}</p>
          <p>Puntuación: ${review.rating}</p>
          <p>Timestamp: ${review.timestamp}</p>
          <hr>
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
