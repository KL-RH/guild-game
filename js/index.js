// index.js – загрузка списка игр и переход на детальную страницу
document.addEventListener('DOMContentLoaded', function() {
  const gamesGrid = document.getElementById('gamesGrid');
  if (!gamesGrid) return;

  const games = window.GAMES || [];

  games.forEach(function(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.game = game.id;

    let badgeStyle = '';
    let badgeText = 'Доступно';
    if (game.status === 'coming_soon') {
      badgeStyle = 'background: rgba(255,100,100,0.2); color: #ff6464;';
      badgeText = 'В разработке';
    }

    card.innerHTML = `
      <span class="game-icon">${game.icon}</span>
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <span class="badge" style="${badgeStyle}">${badgeText}</span>
    `;

    // ВСЕГДА переходим на детальную страницу, даже если игра в разработке
    card.addEventListener('click', function() {
      window.location.href = `game.html?game=${game.id}`;
    });

    gamesGrid.appendChild(card);
  });
});
