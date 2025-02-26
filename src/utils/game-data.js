// src/utils/game-data.js

// Monster templates
export const monsterTemplates = [
  { name: "ゴブリン", hp: 15, attack: 3, defense: 1, xp: 5 },
  { name: "スケルトン", hp: 20, attack: 4, defense: 2, xp: 8 },
  { name: "オーク", hp: 30, attack: 5, defense: 3, xp: 12 },
  { name: "リザードマン", hp: 25, attack: 6, defense: 2, xp: 10 },
  { name: "ウィスプ", hp: 15, attack: 7, defense: 1, xp: 7 },
  { name: "ダークエルフ", hp: 22, attack: 5, defense: 3, xp: 15 },
  { name: "ミミック", hp: 35, attack: 8, defense: 4, xp: 20 },
  { name: "シャドウ", hp: 28, attack: 6, defense: 2, xp: 18 },
  { name: "ゴーレム", hp: 50, attack: 10, defense: 5, xp: 25 },
  { name: "ワイバーン", hp: 40, attack: 12, defense: 3, xp: 30 }
];

// Event templates
export const eventTemplates = [
  { type: "trap", name: "落とし穴", difficulty: 10, damage: 5 },
  { type: "trap", name: "毒矢の罠", difficulty: 12, damage: 8 },
  { type: "trap", name: "爆発の魔法陣", difficulty: 15, damage: 10 },
  { type: "treasure", name: "宝箱", contents: "回復薬", effect: "HP +10" },
  { type: "treasure", name: "魔法の泉", contents: "魔力回復", effect: "MP +10" },
  { type: "treasure", name: "古代の遺物", contents: "経験値", effect: "XP +15" }
];

// Stat descriptions
export const statDescriptions = {
  str: {
    name: "筋力",
    shortName: "STR",
    description: "物理攻撃の威力と防御力に影響します。"
  },
  dex: {
    name: "敏捷",
    shortName: "DEX",
    description: "回避率と罠の発見/解除に影響します。"
  },
  int: {
    name: "知力",
    shortName: "INT",
    description: "魔法の威力とMPの最大値に影響します。"
  },
  mnd: {
    name: "精神",
    shortName: "MND",
    description: "魔法防御と回復効果、交渉に影響します。"
  }
};

// Skill descriptions
export const skillDescriptions = {
  sword: {
    name: "剣術",
    description: "物理攻撃の命中率と威力に影響します。"
  },
  magic: {
    name: "魔法",
    description: "魔法攻撃の威力とMP消費効率に影響します。"
  },
  trap: {
    name: "罠回避",
    description: "罠の発見と回避に影響します。"
  },
  search: {
    name: "探索",
    description: "宝物の発見率と品質に影響します。"
  },
  negotiation: {
    name: "交渉",
    description: "モンスターとの交渉成功率に影響します。"
  }
};

// Helper functions for game logic
export const calculateDamage = (attacker, defender, isPhysical = true) => {
  if (isPhysical) {
    return Math.max(1, attacker.attack - defender.defense);
  } else {
    // Magic attacks ignore some defense
    return Math.max(1, attacker.attack - Math.floor(defender.defense / 2));
  }
};

export const calculateXpToNextLevel = (level) => {
  return level * 20;
};

export const getRandomRoomDescription = () => {
  const descriptions = [
    "古代の壁画が描かれた暗い部屋。床には何かの跡が残っている。",
    "天井から水滴が垂れる湿った部屋。緑の苔がところどころに生えている。",
    "石の柱が立ち並ぶ広間。かつての栄華を思わせる彫刻が残っている。",
    "不思議な光を放つ水晶が埋め込まれた壁。部屋全体が青白く照らされている。",
    "床が一部崩れ落ちた危険な部屋。慎重に進まなければならない。",
    "錆びた武器や鎧が散らばった部屋。かつての戦いの跡が残っている。",
    "薄暗い通路の先に開けた小さな部屋。空気が澱んでいる。",
    "天井が高く、反響音が響く大広間。足音が不気味に響き渡る。",
    "奇妙な模様が床に描かれた部屋。何らかの儀式が行われていたようだ。",
    "小さな泉がある休息のための部屋。不思議と心が落ち着く場所だ。"
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};
