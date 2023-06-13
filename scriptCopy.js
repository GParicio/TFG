const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://steam2.p.rapidapi.com/search/Counter/page/1',
  headers: {
    'X-RapidAPI-Key': '5188ed1d9cmsh643ca2704426180p1c46a5jsn5b81d747b775',
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