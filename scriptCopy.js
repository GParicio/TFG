const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://steam2.p.rapidapi.com/search/Counter/page/1',
  headers: {
    'X-RapidAPI-Key': '3eb72223c7mshfa7f1a27dddf498p1bbad6jsn3006f571fb9f',
    'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
  }
};

axios.request(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });