interface Tip {
  author: string;
  text: string;
  date: string;
}

interface Category {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  images: string[];
}

interface GameDetail {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  categories: Category[];
}

interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'available' | 'coming_soon';
  detail: GameDetail | null;
  tips: Tip[] | null;
}

declare global {
  interface Window {
    GAMES: Game[];
  }
}

const GAMES: Game[] = [
  {
    id: 'mlbb',
    name: 'Mobile Legends',
    icon: '⚔️',
    description: 'Герои, сборки, стратегии для побед',
    status: 'available',
    detail: {
      title: 'MOBILE LEGENDS',
      subtitle: '✦ Гид для новых завоевателей ✦',
      description: 'Изучай героев, осваивай лучшие сборки и становись MVP вместе с сообществом. Твой путь к мифику начинается здесь.',
      heroImage: 'https://akmweb.youngjoygame.com/web/admin/image/7852c7bcda47c9b011ac99d5aa65ad8b.jpg?w=4000-2100-121116',
      categories: [
        {
          id: 'heroes',
          icon: '⚔️',
          title: 'Герои',
          shortDesc: 'Описания навыков, роли и советы по игре.',
          longDesc: 'Здесь ты найдёшь детальные гайды по каждому герою: от базовых комбинаций до продвинутых стратегий. Узнай, как правильно играть за Танка, Мага, Ассасина и других.',
          images: [
            'https://avatars.mds.yandex.net/i?id=7e8844d3e5bd4887b36a040d1cb5822bac7b3cfe-12634740-images-thumbs&n=13',
            'https://avatars.mds.yandex.net/i?id=0ace82862e2ba95d422c6e83ced8c7beacfbee89-12632979-images-thumbs&n=13',
            'https://avatars.mds.yandex.net/i?id=c6c21afc0bcf4d059fe6615d30fc55d53b35e1fa-5877782-images-thumbs&n=13'
          ]
        },
        {
          id: 'builds',
          icon: '🛡️',
          title: 'Сборки',
          shortDesc: 'Лучшие предметы и эмблемы под разные ситуации.',
          longDesc: 'Сборки — ключ к победе. Мы собрали актуальные мета-билды для каждого героя, включая ситуативные предметы против конкретных врагов.',
          images: [
            'https://avatars.mds.yandex.net/i?id=7e8844d3e5bd4887b36a040d1cb5822bac7b3cfe-12634740-images-thumbs&n=13',
            'https://avatars.mds.yandex.net/i?id=0ace82862e2ba95d422c6e83ced8c7beacfbee89-12632979-images-thumbs&n=13',
            'https://avatars.mds.yandex.net/i?id=c6c21afc0bcf4d059fe6615d30fc55d53b35e1fa-5877782-images-thumbs&n=13'
          ]
        },
        {
          id: 'tips',
          icon: '💬',
          title: 'Советы игроков',
          shortDesc: 'Реальные отзывы и стратегии от сообщества.',
          longDesc: 'Читай советы от опытных игроков, делись своими наблюдениями и помогай новичкам быстрее влиться в игру. Вместе мы — сила!',
          images: [
            'https://avatars.mds.yandex.net/i?id=7e8844d3e5bd4887b36a040d1cb5822bac7b3cfe-12634740-images-thumbs&n=13',
            'https://avatars.mds.yandex.net/i?id=0ace82862e2ba95d422c6e83ced8c7beacfbee89-12632979-images-thumbs&n=13',
            'https://avatars.mds.yandex.net/i?id=c6c21afc0bcf4d059fe6615d30fc55d53b35e1fa-5877782-images-thumbs&n=13'
          ]
        }
      ]
    },
    tips: [
      { author: 'ProGamer', text: 'Всегда покупайте антихил против Эстес.', date: '2026-09-15' },
      { author: 'MythicKing', text: 'Лучший старт для лесника — синий баф.', date: '2026-09-20' },
      { author: 'LaneMaster', text: 'Не забывайте про вижн на линии.', date: '2026-09-25' }
    ]
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    icon: '🏹',
    description: 'Герои, предметы, мета-сборки',
    status: 'coming_soon',
    detail: null,
    tips: null
  },
  {
    id: 'valorant',
    name: 'Valorant',
    icon: '🔫',
    description: 'Агенты, тактики, оружейные сборки',
    status: 'coming_soon',
    detail: null,
    tips: null
  },
  {
    id: 'lol',
    name: 'League of Legends',
    icon: '🏆',
    description: 'Чемпионы, предметы, руны',
    status: 'coming_soon',
    detail: null,
    tips: null
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    icon: '💥',
    description: 'Карты, тактики, оружие',
    status: 'coming_soon',
    detail: null,
    tips: null
  }
];


(window as any).GAMES = GAMES;
