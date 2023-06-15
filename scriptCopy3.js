const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/?key=7B354FC531C796347A514F11E1C1947A',
  headers: {
    'X-RapidAPI-Key': '3eb72223c7mshfa7f1a27dddf498p1bbad6jsn3006f571fb9f',
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