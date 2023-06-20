// js/review.js

const gameId = new URLSearchParams(window.location.search).get('id');

const apiKey = 'baac56be76msh86448bb5e708a67p18c330jsn3e85f5884e52'; // Reemplaza "YOUR_API_KEY" con tu propia clave API

const newsContainer = document.getElementById('news-container');

const url = `https://steam2.p.rapidapi.com/newsForApp/${gameId}/limit/10/300`;

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
    newsContainer.innerHTML = '';
    const news = response.data.appnews.newsitems;
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('news');
    newsContainer.style.color = 'white';
    //hacer un const que pase playtime_forever a horas
    if (news.length > 0) {
        news.forEach(item => {
            // Crear un elemento para cada noticia
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
    
            // Construir el contenido de la noticia
            const title = document.createElement('a');
            title.href = item.url;
            title.textContent = item.title;
            title.target = '_blank';
    
            const date = document.createElement('p');
            const timestamp = item.date;
            const formattedDate = formatDate(timestamp); // Función para formatear la fecha
            date.textContent = `Fecha: ${formattedDate}`;
            date.style.fontSize = '12px';
    
            const content = document.createElement('p');
            content.textContent = item.contents;

            const hr = document.createElement('hr');
            hr.style.backgroundColor = 'grey';

            // Agregar los elementos al contenedor de noticias
            newsItem.appendChild(title);
            newsItem.appendChild(date);
            newsItem.appendChild(content);
            newsItem.appendChild(hr);

            newsContainer.appendChild(newsItem);
          });
    } else {
      const nonewsElement = document.createElement('p');
      nonewsElement.classList.add('no-news');
      nonewsElement.textContent = 'No hay reseñas disponibles';
      newsContainer.appendChild(nonewsElement);
    }
  })
  .catch(error => {
    console.error(error);
  });

// Función para formatear la fecha en un formato legible
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }