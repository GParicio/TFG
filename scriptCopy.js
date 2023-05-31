const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://steam2.p.rapidapi.com/search/Counter/page/1',
  headers: {
    'X-RapidAPI-Key': '79495262damsh0ccac0e59f88553p108ecbjsn61567da6ba49',
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