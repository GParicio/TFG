  function loadAppIds() {
    var randomIndex = Math.floor(Math.random() * appIds.length);
    var randomAppId = appIds[randomIndex];
    window.location.href = 'game.html?id=' + randomAppId;
  }
  
  document.getElementById('button').addEventListener('click', loadAppIds);