// src/utils/special-events.js
/**
 * Special events system for Dungeon Hack
 * This file centralizes all special event definitions and handling
 */

// Special event types
export const EVENT_TYPES = {
  RARE_MONSTER: 'rareMonster',
  BLESSING_FOUNTAIN: 'blessingFountain',
  MYSTERIOUS_MERCHANT: 'mysteriousMerchant',
  ANCIENT_SHRINE: 'ancientShrine'
};

// Special event definitions
export const specialEvents = [
  {
    type: EVENT_TYPES.RARE_MONSTER,
    name: "レアモンスター",
    chance: 0.03,
    description: "強力だが貴重な敵が現れる",
    
    // Function to generate the event data
    generateEvent: (dungeonLevel) => {
      // Choose from different rare monsters based on dungeon level
      const rareMonsters = [
        {
          name: "古代のガーディアン",
          hp: 100 + dungeonLevel * 10,
          maxHp: 100 + dungeonLevel * 10,
          attack: 15 + dungeonLevel,
          defense: 8 + Math.floor(dungeonLevel / 2),
          xp: 50 + dungeonLevel * 5
        },
        {
          name: "クリスタルゴーレム",
          hp: 150 + dungeonLevel * 8,
          maxHp: 150 + dungeonLevel * 8,
          attack: 12 + Math.floor(dungeonLevel * 1.5),
          defense: 10 + dungeonLevel,
          xp: 60 + dungeonLevel * 6
        },
        {
          name: "幻影ドラゴン",
          hp: 180 + dungeonLevel * 12,
          maxHp: 180 + dungeonLevel * 12,
          attack: 20 + dungeonLevel * 2,
          defense: 6 + Math.floor(dungeonLevel / 3),
          xp: 80 + dungeonLevel * 8
        }
      ];
      
      // Select a monster based on dungeon level
      const monsterIndex = Math.min(
        Math.floor(dungeonLevel / 3),
        rareMonsters.length - 1
      );
      
      return {
        monster: rareMonsters[monsterIndex],
        messages: [
          "床が振動し、壁から光が漏れ出す...",
          "強大なエネルギーを感じる！",
          `${rareMonsters[monsterIndex].name}が現れた！`
        ]
      };
    }
  },
  {
    type: EVENT_TYPES.BLESSING_FOUNTAIN,
    name: "祝福の泉",
    chance: 0.015,
    description: "様々な恩恵を与える神秘的な泉",
    
    // Generate event data
    generateEvent: (dungeonLevel) => {
      return {
        options: [
          {
            id: 'hp',
            name: '体力強化',
            description: '最大HPが増加し、HPが全回復する',
            effect: (character) => {
              const hpBonus = 5 + Math.floor(dungeonLevel / 2);
              return {
                maxHp: character.maxHp + hpBonus,
                hp: character.maxHp + hpBonus,
                hpBonus: hpBonus
              };
            },
            message: (result) => `体力が強化されました！最大HPが${result.hpBonus}増加し、HPが全回復しました。`
          },
          {
            id: 'mp',
            name: '魔力強化',
            description: '最大MPが増加し、MPが全回復する',
            effect: (character) => {
              const mpBonus = 3 + Math.floor(dungeonLevel / 3);
              return {
                maxMp: character.maxMp + mpBonus,
                mp: character.maxMp + mpBonus,
                mpBonus: mpBonus
              };
            },
            message: (result) => `魔力が強化されました！最大MPが${result.mpBonus}増加し、MPが全回復しました。`
          },
          {
            id: 'stat',
            name: '能力強化',
            description: 'すべての能力値が増加する',
            effect: (character) => {
              const statBonus = Math.max(1, Math.floor(dungeonLevel / 5));
              return {
                stats: {
                  ...character.stats,
                  str: character.stats.str + statBonus,
                  dex: character.stats.dex + statBonus,
                  int: character.stats.int + statBonus,
                  mnd: character.stats.mnd + statBonus
                },
                statBonus: statBonus
              };
            },
            message: (result) => `能力が強化されました！すべての能力値が${result.statBonus}増加しました。`
          }
        ],
        messages: ["祝福の泉を見つけました！特別な力を得ることができます。"]
      };
    }
  },
  {
    type: EVENT_TYPES.MYSTERIOUS_MERCHANT,
    name: "謎の商人",
    chance: 0.00,
    description: "ダンジョンの奥で出会う不思議な商人",
    
    // Generate event data
    generateEvent: (dungeonLevel) => {
      // Merchant offerings scale with dungeon level
      return {
        options: [
          {
            id: 'hpPotion',
            name: '秘薬',
            cost: Math.floor(dungeonLevel * 10),
            description: 'HPを大幅に回復する',
            effect: (character) => {
              const healAmount = character.maxHp * 0.5;
              return {
                hp: Math.min(character.maxHp, character.hp + healAmount)
              };
            },
            message: (value) => `秘薬を飲み、HPが大幅に回復した！`
          },
          {
            id: 'mpPotion',
            name: '魔力の雫',
            cost: Math.floor(dungeonLevel * 12),
            description: 'MPを完全に回復する',
            effect: (character) => ({
              mp: character.maxMp
            }),
            message: () => `魔力の雫を飲み、MPが完全に回復した！`
          },
          {
            id: 'skillScroll',
            name: '古代の巻物',
            cost: Math.floor(dungeonLevel * 15),
            description: 'スキルポイントを1獲得する',
            effect: (character) => ({
              skillPoints: character.skillPoints + 1
            }),
            message: () => `古代の巻物から知識を得て、スキルポイントを1獲得した！`
          }
        ],
        currency: {
          name: 'ゴールド',
          amount: dungeonLevel * 5 // Initial gold the player starts with
        },
        messages: ["薄暗い部屋の隅に、謎めいた商人が店を構えています。「何か必要なものはありますか？」"]
      };
    }
  },
  {
    type: EVENT_TYPES.ANCIENT_SHRINE,
    name: "古代の祭壇",
    chance: 0.02,
    description: "選択次第で恩恵か災いをもたらす祭壇",
    
    // Generate event data
    generateEvent: (dungeonLevel) => {
      return {
        options: [
          {
            id: 'worship',
            name: '祈りを捧げる',
            description: '祭壇に祈りを捧げ、祝福を求める',
            effect: (character) => {
              // 70% chance of blessing, 30% chance of curse
              const isBlessed = Math.random() < 0.7;
              
              if (isBlessed) {
                // Choose a random stat to boost
                const stats = ['str', 'dex', 'int', 'mnd'];
                const statToBoost = stats[Math.floor(Math.random() * stats.length)];
                const boost = 1 + Math.floor(dungeonLevel / 5);
                
                return {
                  stats: {
                    ...character.stats,
                    [statToBoost]: character.stats[statToBoost] + boost
                  },
                  blessed: true,
                  boostedStat: statToBoost,
                  boostAmount: boost
                };
              } else {
                // Curse - temporary debuff
                return {
                  hp: Math.max(1, character.hp - Math.floor(character.maxHp * 0.2)),
                  blessed: false
                };
              }
            },
            message: (result) => {
              if (result.blessed) {
                const statNames = {
                  str: '筋力',
                  dex: '敏捷',
                  int: '知力',
                  mnd: '精神'
                };
                return `祭壇から光があなたを包み込む...${statNames[result.boostedStat]}が${result.boostAmount}上昇した！`;
              } else {
                return `祭壇から暗い霧が噴き出し、体力が減少した...`;
              }
            }
          },
          {
            id: 'offering',
            name: '生贄を捧げる',
            description: 'HPを少し犠牲にして、より強力な祝福を求める',
            effect: (character) => {
              // Cost is 20% of current HP
              const hpCost = Math.floor(character.hp * 0.2);
              
              // 85% chance of greater blessing
              const isBlessed = Math.random() < 0.85;
              
              if (isBlessed) {
                // Get a small boost to all stats
                const boost = 1 + Math.floor(dungeonLevel / 10);
                
                return {
                  hp: Math.max(1, character.hp - hpCost),
                  stats: {
                    ...character.stats,
                    str: character.stats.str + boost,
                    dex: character.stats.dex + boost,
                    int: character.stats.int + boost,
                    mnd: character.stats.mnd + boost
                  },
                  blessed: true,
                  boostAmount: boost
                };
              } else {
                // Worse curse
                return {
                  hp: Math.max(1, character.hp - hpCost * 2),
                  blessed: false
                };
              }
            },
            message: (result) => {
              if (result.blessed) {
                return `あなたの犠牲が受け入れられた！すべての能力値が${result.boostAmount}上昇した！`;
              } else {
                return `生贄は拒否され、代わりにあなたの生命力が大きく奪われた...`;
              }
            }
          },
          {
            id: 'ignore',
            name: '無視する',
            description: '祭壇に触れず、先に進む',
            effect: () => ({}),
            message: () => `あなたは祭壇を無視し、先に進んだ。`
          }
        ],
        messages: ["古びた祭壇がある。かすかに脈動するエネルギーを感じる..."]
      };
    }
  }
];

/**
 * Roll for a special event
 * @param {number} dungeonLevel - Current dungeon level
 * @returns {object|null} Event object or null if no event triggered
 */
export const rollForSpecialEvent = (dungeonLevel) => {
  // Increase chance based on dungeon level (slight scaling)
  const levelMultiplier = 1 + (dungeonLevel - 1) * 0.1;
  
  // Try each event
  for (const event of specialEvents) {
    const adjustedChance = event.chance * levelMultiplier;
    
    if (Math.random() < adjustedChance) {
      return {
        type: event.type,
        name: event.name,
        ...event.generateEvent(dungeonLevel)
      };
    }
  }
  
  // No event triggered
  return null;
};

/**
 * Get event details by type
 * @param {string} eventType - Type of event
 * @returns {object|null} Event definition or null if not found
 */
export const getEventByType = (eventType) => {
  return specialEvents.find(event => event.type === eventType) || null;
};
