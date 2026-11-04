document.addEventListener('DOMContentLoaded', function() {
  var gameContent = document.getElementById('gameContent');
  if (!gameContent) return;

  var pathParts = window.location.pathname.split('/').filter(Boolean);
  var params = new URLSearchParams(window.location.search);
  var games = window.GAMES || [];

  var gameId = null;
  var section = null;

  if (pathParts[0] === 'game' && pathParts.length >= 2) {
    gameId = pathParts[1];
    if (pathParts.length >= 3) section = pathParts[2];
  } else {
    gameId = params.get('game');
    section = params.get('section');
  }

  var game = null;
  for (var i = 0; i < games.length; i++) {
    if (games[i].id === gameId) { game = games[i]; break; }
  }

  if (!game || game.status === 'coming_soon') {
    var name = game ? game.name : gameId;
    gameContent.innerHTML = '<div class="game-container"><div class="coming-soon">' +
      '<h2>🚧 В разработке</h2>' +
      '<p>Гид для игры <strong>' + name + '</strong> скоро появится. Следите за обновлениями!</p>' +
      '</div></div>';
    return;
  }

  var detail = game.detail;
  if (!detail) {
    gameContent.innerHTML = '<div class="game-container"><p>Нет данных об игре</p></div>';
    return;
  }

  if (section === 'sovety') {
    renderTipsPage(game);
    return;
  }

  renderGamePage(game, detail, section);
});

function renderGamePage(game, detail, section) {
  var gameContent = document.getElementById('gameContent');
  var html = '<div class="game-container">' +
    '<div class="game-hero">' +
    '<div class="game-hero-text">' +
    '<h1>' + detail.title + '</h1>' +
    '<p class="subtitle">' + detail.subtitle + '</p>' +
    '<p class="description">' + detail.description + '</p>' +
    '<button class="btn-glow" id="startBtn">Начать исследование</button>' +
    '<div id="welcomeMessage"></div>' +
    '</div>' +
    '<div class="game-hero-image">' +
    '<img src="' + detail.heroImage + '" onerror="this.src=\'https://via.placeholder.com/800x600/1a2340/c9a13b?text=Hero\'" />' +
    '</div>' +
    '</div>' +
    '<div class="game-features" id="cardsContainer"></div>' +
    '</div>';
  gameContent.innerHTML = html;

  var container = document.getElementById('cardsContainer');
  if (container && detail.categories) {
    var clipPaths = [
      'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
      'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
      'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'
    ];

    for (var j = 0; j < detail.categories.length; j++) {
      var cat = detail.categories[j];
      var card = document.createElement('div');
      card.className = 'feature-card';
      card.id = 'card-' + cat.id;

      var leftDiv = document.createElement('div');
      leftDiv.className = 'card-left';
      leftDiv.innerHTML = '<div class="icon">' + cat.icon + '</div>' +
        '<div class="card-content">' +
        '<h3>' + cat.title + '</h3>' +
        '<p>' + cat.shortDesc + '</p>' +
        '</div>';

      var rightDiv = document.createElement('div');
      rightDiv.className = 'card-right';
      var grid = document.createElement('div');
      grid.className = 'card-image-grid';

      for (var k = 0; k < cat.images.length; k++) {
        var item = document.createElement('div');
        item.className = 'card-image-item';
        item.style.backgroundImage = 'url(' + cat.images[k] + ')';
        var clip = clipPaths[k % clipPaths.length];
        item.style.clipPath = clip;
        item.style.webkitClipPath = clip;
        grid.appendChild(item);
      }
      rightDiv.appendChild(grid);

      var overlay = document.createElement('div');
      overlay.className = 'card-detail-overlay';
      overlay.textContent = cat.longDesc;
      rightDiv.appendChild(overlay);

      card.appendChild(leftDiv);
      card.appendChild(rightDiv);
      container.appendChild(card);

      leftDiv.addEventListener('mouseenter', function() {
        this.parentNode.querySelector('.card-detail-overlay').style.opacity = '1';
      });
      leftDiv.addEventListener('mouseleave', function() {
        this.parentNode.querySelector('.card-detail-overlay').style.opacity = '0';
      });
    }
  }

  var startBtn = document.getElementById('startBtn');
  var messageBlock = document.getElementById('welcomeMessage');
  if (startBtn && messageBlock) {
    startBtn.addEventListener('click', function() {
      messageBlock.innerHTML = '✨ Добро пожаловать! Впереди — база героев и мета-сборки. но пока, нас ограбили(';
      var btn = this;
      btn.textContent = 'Уже в пути!';
      btn.style.opacity = '0.8';
      btn.style.transform = 'scale(0.95)';
      setTimeout(function() {
        btn.textContent = 'Начать исследование';
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1)';
      }, 3000);
    });
  }

  if (section) {
    setTimeout(function() {
      var target = document.getElementById('card-' + section);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

  var navHeroes = document.getElementById('navHeroes');
  var navBuilds = document.getElementById('navBuilds');
  var navTips = document.getElementById('navTips');

  if (navHeroes) {
    navHeroes.addEventListener('click', function() {
      window.location.href = '/game/' + game.id + '/heroes/';
    });
  }
  if (navBuilds) {
    navBuilds.addEventListener('click', function() {
      window.location.href = '/game/' + game.id + '/builds/';
    });
  }
  if (navTips) {
    navTips.addEventListener('click', function() {
      window.location.href = '/game/' + game.id + '/sovety/';
    });
  }
}

function renderTipsPage(game) {
  var gameContent = document.getElementById('gameContent');
  var html = '<div class="game-container">' +
    '<h1 class="page-title">Советы для ' + game.name + '</h1>' +
    '<p class="page-subtitle">Делитесь опытом с сообществом</p>' +
    '<div class="tips-grid" id="tipsGrid"></div>' +
    '<h2 class="form-title">Добавить свой совет</h2>' +
    '<form id="tipForm" class="tip-form">' +
    '<input type="text" id="tipAuthor" placeholder="Ваш ник" required>' +
    '<textarea id="tipText" placeholder="Текст совета" required></textarea>' +
    '<button type="submit" class="btn-glow">Отправить</button>' +
    '</form>' +
    '</div>';
  gameContent.innerHTML = html;

  loadTips(game.id);
  setupTipForm(game.id);
}

function loadTips(gameId) {
  var grid = document.getElementById('tipsGrid');
  if (!grid) return;

  var storageKey = 'tips_' + gameId;
  var stored = localStorage.getItem(storageKey);
  var tips;

  if (stored) {
    tips = JSON.parse(stored);
  } else {
    var game = null;
    for (var i = 0; i < window.GAMES.length; i++) {
      if (window.GAMES[i].id === gameId) { game = window.GAMES[i]; break; }
    }
    tips = (game && game.tips) ? game.tips : [];
    localStorage.setItem(storageKey, JSON.stringify(tips));
  }

  if (tips.length === 0) {
    grid.innerHTML = '<p class="empty-message">Пока нет советов. Будьте первым!</p>';
    return;
  }

  grid.innerHTML = '';
  for (var j = 0; j < tips.length; j++) {
    var tip = tips[j];
    var card = document.createElement('div');
    card.className = 'tip-card';
    card.innerHTML = '<div class="tip-author">' + tip.author + '</div>' +
      '<div class="tip-text">' + tip.text + '</div>' +
      '<div class="tip-date">' + tip.date + '</div>';
    grid.appendChild(card);
  }
}

function setupTipForm(gameId) {
  var form = document.getElementById('tipForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var author = document.getElementById('tipAuthor').value.trim();
    var text = document.getElementById('tipText').value.trim();
    if (!author || !text) return;

    var newTip = {
      author: author,
      text: text,
      date: new Date().toLocaleDateString('ru-RU')
    };

    var storageKey = 'tips_' + gameId;
    var tips = JSON.parse(localStorage.getItem(storageKey)) || [];
    tips.push(newTip);
    localStorage.setItem(storageKey, JSON.stringify(tips));

    loadTips(gameId);
    form.reset();
  });
}
