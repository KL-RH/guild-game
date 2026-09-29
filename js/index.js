// index.js – загрузка списка игр и переход на детальную страницу
document.addEventListener('DOMContentLoaded', function() {
  var gamesGrid = document.getElementById('gamesGrid');
  if (!gamesGrid) return;

  var games = window.GAMES || [];

  for (var i = 0; i < games.length; i++) {
    var game = games[i];
    var card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.game = game.id;

    var badgeStyle = '';
    var badgeText = 'Доступно';
    if (game.status === 'coming_soon') {
      badgeStyle = 'background: rgba(255,100,100,0.2); color: #ff6464;';
      badgeText = 'В разработке';
    }

    card.innerHTML = '<span class="game-icon">' + game.icon + '</span>' +
      '<h3>' + game.name + '</h3>' +
      '<p>' + game.description + '</p>' +
      '<span class="badge" style="' + badgeStyle + '">' + badgeText + '</span>';

    // Переходим на /game/{id}/ (новая структура)
    card.addEventListener('click', function() {
      window.location.href = '/game/' + this.dataset.game + '/';
    });

    gamesGrid.appendChild(card);
  }
});
