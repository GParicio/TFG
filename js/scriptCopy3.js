const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/?key=7B354FC531C796347A514F11E1C1947A',
  headers: {
    'X-RapidAPI-Key': 'b304040befmshba02f64c3ef3cafp189adejsn9eac6875b22b',
    'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
  }
};

axios.request(options)
  .then(response => {
    console.log(response.data.response.ranks);
  })
  .catch(error => {
    console.error(error);
  });