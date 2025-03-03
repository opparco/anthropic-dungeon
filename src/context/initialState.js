// src/context/initialState.js
// Define the initial game state

export const initialGameState = {
  character: {
    name: localStorage.getItem('dungeonHackCharacterName') || '無名の冒険者',
    hp: 30,
    maxHp: 30,
    mp: 20,
    maxMp: 20,
    stats: {
      str: 3,
      dex: 3,
      int: 3,
      mnd: 3
    },
    skills: {
      sword: 1,
      magic: 1,
      trap: 1,
      search: 1,
      negotiation: 1
    },
    xp: 0,
    level: 1,
    statPoints: 0,
    skillPoints: 0
  },
  dungeon: {
    level: 1,
    enemyPresent: false,
    treasurePresent: false,
    currentEnemy: null,
    clearedRooms: 0,
    roomsToNextLevel: 5
  },
  gameLog: [],
  isGameOver: false,
  isLevelingUp: false,
  specialEvent: null,
  hasCreatedCharacter: false
};

export default initialGameState;
