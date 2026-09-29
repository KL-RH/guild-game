"use strict";
// data/games.ts
// Говорим TypeScript, что у window есть свойство GAMES
// Говорим TypeScript, что у window есть свойство GAMES
//
// 4. Типизированный массив игр
const GAMES = [
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
        }
    },
    {
        id: 'dota2',
        name: 'Dota 2',
        icon: '🏹',
        description: 'Герои, предметы, мета-сборки',
        status: 'coming_soon',
        detail: null
    },
    {
        id: 'valorant',
        name: 'Valorant',
        icon: '🔫',
        description: 'Агенты, тактики, оружейные сборки',
        status: 'coming_soon',
        detail: null
    },
    {
        id: 'lol',
        name: 'League of Legends',
        icon: '🏆',
        description: 'Чемпионы, предметы, руны',
        status: 'coming_soon',
        detail: null
    },
    {
        id: 'cs2',
        name: 'Counter-Strike 2',
        icon: '💥',
        description: 'Карты, тактики, оружие',
        status: 'coming_soon',
        detail: null
    }
];
// Делаем массив доступным из HTML
window.GAMES = GAMES;
