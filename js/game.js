// game.js – чтение параметра game, рендеринг контента
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('game');
  const gameContent = document.getElementById('gameContent');
  if (!gameContent) return;

  const games = window.GAMES || [];
  const game = games.find(function(g) { return g.id === gameId; });

  // Если игра не найдена или в разработке
  if (!game || game.status === 'coming_soon') {
    const name = game ? game.name : gameId;
    gameContent.innerHTML = `
      <div class="game-container">
        <div class="coming-soon">
          <h2>🚧 В разработке</h2>
          <p>Гид для игры <strong>${name}</strong> скоро появится. Следите за обновлениями!</p>
        </div>
      </div>
    `;
    return;
  }

  const detail = game.detail;
  if (!detail) {
    gameContent.innerHTML = '<div class="game-container"><p>Нет данных об игре</p></div>';
    return;
  }

  // Строим HTML – теперь ВСЁ обёрнуто в .game-container
  let html = `
    <div class="game-container">
      <div class="game-hero">
        <div class="game-hero-text">
          <h1>${detail.title}</h1>
          <p class="subtitle">${detail.subtitle}</p>
          <p class="description">${detail.description}</p>
          <button class="btn-glow" id="startBtn">Начать исследование</button>
          <div id="welcomeMessage"></div>
        </div>
        <div class="game-hero-image">
          <img src="${detail.heroImage}" onerror="this.src='https://via.placeholder.com/800x600/1a2340/c9a13b?text=Hero+MLBB'" />
        </div>
      </div>
      <div class="game-features" id="cardsContainer"></div>
    </div>
  `;
  gameContent.innerHTML = html;

  // Рендерим категории
  const container = document.getElementById('cardsContainer');
  if (container && detail.categories) {
    const clipPaths = [
      'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
      'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
      'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'
    ];

    detail.categories.forEach(function(cat, index) {
      const card = document.createElement('div');
      card.className = 'feature-card';
      card.id = 'card-' + cat.id;

      const leftDiv = document.createElement('div');
      leftDiv.className = 'card-left';
      leftDiv.innerHTML = `
        <div class="icon">${cat.icon}</div>
        <div class="card-content">
          <h3>${cat.title}</h3>
          <p>${cat.shortDesc}</p>
        </div>
      `;

      const rightDiv = document.createElement('div');
      rightDiv.className = 'card-right';
      const grid = document.createElement('div');
      grid.className = 'card-image-grid';

      cat.images.forEach(function(url, i) {
        const item = document.createElement('div');
        item.className = 'card-image-item';
        item.style.backgroundImage = 'url(' + url + ')';
        const clip = clipPaths[i % clipPaths.length];
        item.style.clipPath = clip;
        item.style.webkitClipPath = clip;
        grid.appendChild(item);
      });

      rightDiv.appendChild(grid);

      const overlay = document.createElement('div');
      overlay.className = 'card-detail-overlay';
      overlay.textContent = cat.longDesc;
      rightDiv.appendChild(overlay);

      card.appendChild(leftDiv);
      card.appendChild(rightDiv);
      container.appendChild(card);

      // Показываем оверлей при наведении на левую часть
      leftDiv.addEventListener('mouseenter', function() {
        overlay.style.opacity = '1';
      });
      leftDiv.addEventListener('mouseleave', function() {
        overlay.style.opacity = '0';
      });
    });
  }

  // Кнопка "Начать исследование"
  const startBtn = document.getElementById('startBtn');
  const messageBlock = document.getElementById('welcomeMessage');
  if (startBtn && messageBlock) {
    startBtn.addEventListener('click', function() {
      messageBlock.innerHTML = '✨ Добро пожаловать! Впереди — база героев и мета-сборки. но пока, нас ограбили(';
      this.textContent = 'Уже в пути!';
      this.style.opacity = '0.8';
      this.style.transform = 'scale(0.95)';
      setTimeout(function() {
        startBtn.textContent = 'Начать исследование';
        startBtn.style.opacity = '1';
        startBtn.style.transform = 'scale(1)';
      }, 3000);
    });
  }

  // Обработка кликов по навигационным ссылкам (скролл к карточкам)
  const navHeroes = document.getElementById('navHeroes');
  const navBuilds = document.getElementById('navBuilds');
  const navTips = document.getElementById('navTips');

  function scrollToCard(id) {
    const card = document.getElementById('card-' + id);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (navHeroes) navHeroes.addEventListener('click', function(e) { e.preventDefault(); scrollToCard('heroes'); });
  if (navBuilds) navBuilds.addEventListener('click', function(e) { e.preventDefault(); scrollToCard('builds'); });
  if (navTips) navTips.addEventListener('click', function(e) { e.preventDefault(); scrollToCard('tips'); });
});
