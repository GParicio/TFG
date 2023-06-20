const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/?key=7B354FC531C796347A514F11E1C1947A',
  headers: {
    'X-RapidAPI-Key': 'baac56be76msh86448bb5e708a67p18c330jsn3e85f5884e52',
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