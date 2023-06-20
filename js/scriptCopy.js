const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://steam2.p.rapidapi.com/search/Counter/page/1',
  headers: {
    'X-RapidAPI-Key': 'b304040befmshba02f64c3ef3cafp189adejsn9eac6875b22b',
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