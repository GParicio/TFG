// review.js

const gameId = new URLSearchParams(window.location.search).get('id');

const apiKey = 'b304040befmshba02f64c3ef3cafp189adejsn9eac6875b22b'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

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

    reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.classList.add('review-item');
      reviewElement.innerHTML = `
        <h4>Author: ${review.author}</h4>
        <p>Review: ${review.review}</p>
        <p>Rating: ${review.rating}</p>
        <p>Timestamp: ${review.timestamp}</p>
        <hr>
      `;
      reviewContainer.appendChild(reviewElement);
    });
  })
  .catch(error => {
    console.error(error);
  });
