//Import fs
import fs from 'fs';
import fetch from 'node-fetch';

fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
  .then(response => response.json())
  .then(data => {
    const apps = data.applist.apps;
    const appIds = apps.map(app => app.appid);
    const text = appIds.join(',');

    fs.writeFile('appIds.txt', text, err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File created: appIds.txt');
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
