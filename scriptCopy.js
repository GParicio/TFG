const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://steam2.p.rapidapi.com/search/Counter/page/1',
  headers: {
    'X-RapidAPI-Key': 'cb91fa6805msh47ea971cccb96e6p10ce2ajsn648f7d6605b9',
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