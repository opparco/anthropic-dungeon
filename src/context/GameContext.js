// src/context/GameContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';
import { monsterTemplates, eventTemplates } from '../utils/game-data';
import { saveGame, loadGame, hasSavedGame, deleteSavedGame } from '../utils/SaveLoadSystem';

// Initial game state
const initialGameState = {
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

// Action types
const ACTION_TYPES = {
  ADD_LOG: 'ADD_LOG',
  UPDATE_CHARACTER: 'UPDATE_CHARACTER',
  UPDATE_DUNGEON: 'UPDATE_DUNGEON',
  RESET_GAME: 'RESET_GAME',
  GAME_OVER: 'GAME_OVER',
  START_LEVEL_UP: 'START_LEVEL_UP',
  FINISH_LEVEL_UP: 'FINISH_LEVEL_UP',
  INCREASE_STAT: 'INCREASE_STAT',
  INCREASE_SKILL: 'INCREASE_SKILL',
  SET_SPECIAL_EVENT: 'SET_SPECIAL_EVENT',
  CLEAR_SPECIAL_EVENT: 'CLEAR_SPECIAL_EVENT',
  LOAD_SAVED_GAME: 'LOAD_SAVED_GAME'
};

// Reducer function
function gameReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_LOG:
      return {
        ...state,
        gameLog: [...state.gameLog, { text: action.payload.text, className: action.payload.className || '' }]
      };
      
    case ACTION_TYPES.UPDATE_CHARACTER:
      return {
        ...state,
        character: {
          ...state.character,
          ...action.payload
        },
        hasCreatedCharacter: true
      };
      
    case ACTION_TYPES.UPDATE_DUNGEON:
      return {
        ...state,
        dungeon: {
          ...state.dungeon,
          ...action.payload
        }
      };
      
    case ACTION_TYPES.GAME_OVER:
      return {
        ...state,
        isGameOver: true
      };
      
    case ACTION_TYPES.START_LEVEL_UP:
      return {
        ...state,
        isLevelingUp: true
      };
      
    case ACTION_TYPES.FINISH_LEVEL_UP:
      return {
        ...state,
        isLevelingUp: false
      };
      
    case ACTION_TYPES.INCREASE_STAT:
      if (state.character.statPoints <= 0) return state;
      
      return {
        ...state,
        character: {
          ...state.character,
          stats: {
            ...state.character.stats,
            [action.payload]: state.character.stats[action.payload] + 1
          },
          statPoints: state.character.statPoints - 1
        }
      };
      
    case ACTION_TYPES.INCREASE_SKILL:
      if (state.character.skillPoints <= 0) return state;
      
      return {
        ...state,
        character: {
          ...state.character,
          skills: {
            ...state.character.skills,
            [action.payload]: state.character.skills[action.payload] + 1
          },
          skillPoints: state.character.skillPoints - 1
        }
      };
      
    case ACTION_TYPES.SET_SPECIAL_EVENT:
      return {
        ...state,
        specialEvent: action.payload
      };
      
    case ACTION_TYPES.CLEAR_SPECIAL_EVENT:
      return {
        ...state,
        specialEvent: null
      };
      
    case ACTION_TYPES.RESET_GAME:
      return {
        ...initialGameState,
        hasCreatedCharacter: action.payload?.hasCreatedCharacter ?? false,
        gameLog: [{ text: "ゲーム開始！ダンジョンの探索を始めましょう。", className: '' }]
      };
      
    case ACTION_TYPES.LOAD_SAVED_GAME:
      return {
        ...state,
        character: action.payload.character,
        dungeon: action.payload.dungeon,
        isGameOver: action.payload.isGameOver || false,
        hasCreatedCharacter: action.payload.hasCreatedCharacter || false,
        gameLog: [
          ...state.gameLog,
          { text: "保存したゲームをロードしました。", className: 'success' }
        ]
      };
    
    default:
      return state;
  }
}

// Create context
const GameContext = createContext();

// Context provider
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  
  // Initialize game log on first render
  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.ADD_LOG,
      payload: { text: "ゲーム開始！ダンジョンの探索を始めましょう。" }
    });
  }, []);
  
  // Game utilities
  const gameUtils = {
    // Add a log entry
    addLog: (text, className = '') => {
      dispatch({
        type: ACTION_TYPES.ADD_LOG,
        payload: { text, className }
      });
    },
    
    // Dice roll function
    rollDice: (sides = 10) => {
      return Math.floor(Math.random() * sides) + 1;
    },
    
    // Skill check function
    checkRoll: (stat, skill, difficulty) => {
      const roll = gameUtils.rollDice();
      const total = stat + skill + roll;
      return {
        success: total >= difficulty,
        critical: roll === 10,
        fumble: roll === 1,
        roll,
        total
      };
    },
    
    // Generate a monster based on dungeon level
    generateMonster: () => {
      const level = state.dungeon.level;
      const template = monsterTemplates[Math.floor(Math.random() * monsterTemplates.length)];
      
      return {
        name: template.name,
        hp: template.hp + (level - 1) * 5,
        maxHp: template.hp + (level - 1) * 5,
        attack: template.attack + Math.floor((level - 1) / 2),
        defense: template.defense + Math.floor((level - 1) / 3),
        xp: template.xp + (level - 1) * 3
      };
    },
    
    // Update character stats
    updateCharacter: (updates) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_CHARACTER,
        payload: updates
      });
    },
    
    // Update dungeon state
    updateDungeon: (updates) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: updates
      });
    },
    
    // Process enemy encounter
    spawnEnemy: () => {
      const monster = gameUtils.generateMonster();
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: { 
          enemyPresent: true, 
          currentEnemy: monster 
        }
      });
      gameUtils.addLog(`${monster.name}が現れた！`);
      return monster;
    },
    
    // Handle character death
    gameOver: () => {
      dispatch({ type: ACTION_TYPES.GAME_OVER });
      gameUtils.addLog("ゲームオーバー...", 'failure');
    },
    
    // Reset the game
    resetGame: () => {
      localStorage.removeItem('dungeonHackCharacterName');
      dispatch({ 
        type: ACTION_TYPES.RESET_GAME,
        payload: { hasCreatedCharacter: false }
      });
    },
    
    // Handle gaining XP
    gainXP: (amount) => {
      const newXP = state.character.xp + amount;
      const xpNeeded = state.character.level * 20;
      
      gameUtils.addLog(`${amount}の経験値を獲得しました！`, 'success');
      
      if (newXP >= xpNeeded) {
        // Level up
        const updatedCharacter = {
          ...state.character,
          xp: newXP - xpNeeded,
          level: state.character.level + 1,
          maxHp: state.character.maxHp + 5,
          hp: state.character.maxHp + 5,  // Full heal on level up
          maxMp: state.character.maxMp + 3,
          mp: state.character.maxMp + 3,  // Full MP restore on level up
          statPoints: state.character.statPoints + 1,
          skillPoints: state.character.skillPoints + 2
        };
        
        dispatch({
          type: ACTION_TYPES.UPDATE_CHARACTER,
          payload: updatedCharacter
        });
        
        gameUtils.addLog(`レベルアップ！レベル${updatedCharacter.level}になりました！`, 'critical');
        dispatch({ type: ACTION_TYPES.START_LEVEL_UP });
      } else {
        // Just update XP
        dispatch({
          type: ACTION_TYPES.UPDATE_CHARACTER,
          payload: { xp: newXP }
        });
      }
    },
    
    // Increase a stat during level up
    increaseStat: (statName) => {
      dispatch({
        type: ACTION_TYPES.INCREASE_STAT,
        payload: statName
      });
    },
    
    // Increase a skill during level up
    increaseSkill: (skillName) => {
      dispatch({
        type: ACTION_TYPES.INCREASE_SKILL,
        payload: skillName
      });
    },
    
    // Finish level up process
    finishLevelUp: () => {
      dispatch({ type: ACTION_TYPES.FINISH_LEVEL_UP });
      gameUtils.addLog("レベルアップが完了しました！探索を続けましょう。");
    },
    
    // Create a treasure
    createTreasure: () => {
      const treasureIndex = Math.floor(Math.random() * 3);
      let treasure;
      
      switch (treasureIndex) {
        case 0:
          treasure = { name: "回復薬", effect: "HPが10回復した！" };
          dispatch({
            type: ACTION_TYPES.UPDATE_CHARACTER,
            payload: { 
              hp: Math.min(state.character.hp + 10, state.character.maxHp) 
            }
          });
          break;
        case 1:
          treasure = { name: "魔力の結晶", effect: "MPが10回復した！" };
          dispatch({
            type: ACTION_TYPES.UPDATE_CHARACTER,
            payload: { 
              mp: Math.min(state.character.mp + 10, state.character.maxMp) 
            }
          });
          break;
        case 2:
          const xpGain = 5 + state.dungeon.level * 2;
          treasure = { name: "古代の遺物", effect: `${xpGain}の経験値を獲得した！` };
          gameUtils.gainXP(xpGain);
          break;
        default:
          treasure = { name: "謎の宝箱", effect: "特に効果はなかった..." };
      }
      
      // Mark as found and increment cleared rooms
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: { 
          treasurePresent: false,
          clearedRooms: state.dungeon.clearedRooms + 1 
        }
      });
      
      gameUtils.addLog(`${treasure.name}を見つけました！${treasure.effect}`, 'critical');
      return treasure;
    },
    
    // Check for special events
    checkSpecialEvent: () => {
      if (Math.random() < 0.05) {
        const eventType = Math.random() < 0.5 ? 'rareMonster' : 'blessingFountain';
        
        if (eventType === 'rareMonster') {
          const rareMonster = {
            name: "古代のガーディアン",
            hp: 100 + state.dungeon.level * 10,
            maxHp: 100 + state.dungeon.level * 10,
            attack: 15 + state.dungeon.level,
            defense: 8 + Math.floor(state.dungeon.level / 2),
            xp: 50 + state.dungeon.level * 5
          };
          
          dispatch({
            type: ACTION_TYPES.UPDATE_DUNGEON,
            payload: { 
              enemyPresent: true,
              currentEnemy: rareMonster 
            }
          });
          
          gameUtils.addLog("床が振動し、壁から光が漏れ出す...", 'critical');
          gameUtils.addLog("強大なエネルギーを感じる！", 'critical');
          gameUtils.addLog(`${rareMonster.name}が現れた！`, 'critical');
          
          dispatch({
            type: ACTION_TYPES.SET_SPECIAL_EVENT,
            payload: { type: 'rareMonster', data: rareMonster }
          });
          
          return true;
        } else {
          dispatch({
            type: ACTION_TYPES.SET_SPECIAL_EVENT,
            payload: { type: 'blessingFountain' }
          });
          
          gameUtils.addLog("祝福の泉を見つけました！特別な力を得ることができます。", 'critical');
          return true;
        }
      }
      
      return false;
    },
    
    // Apply blessing fountain effect
    applyFountainEffect: (effect) => {
      switch (effect) {
        case 'hp':
          dispatch({
            type: ACTION_TYPES.UPDATE_CHARACTER,
            payload: { 
              maxHp: state.character.maxHp + 10,
              hp: state.character.maxHp + 10
            }
          });
          gameUtils.addLog("体力が強化されました！最大HPが10増加し、HPが全回復しました。", 'success');
          break;
        case 'mp':
          dispatch({
            type: ACTION_TYPES.UPDATE_CHARACTER,
            payload: { 
              maxMp: state.character.maxMp + 8,
              mp: state.character.maxMp + 8
            }
          });
          gameUtils.addLog("魔力が強化されました！最大MPが8増加し、MPが全回復しました。", 'success');
          break;
        case 'stat':
          dispatch({
            type: ACTION_TYPES.UPDATE_CHARACTER,
            payload: { 
              stats: {
                ...state.character.stats,
                str: state.character.stats.str + 1,
                dex: state.character.stats.dex + 1,
                int: state.character.stats.int + 1,
                mnd: state.character.stats.mnd + 1
              }
            }
          });
          gameUtils.addLog("能力が強化されました！すべての能力値が1増加しました。", 'success');
          break;
      }
      
      dispatch({ type: ACTION_TYPES.CLEAR_SPECIAL_EVENT });
      
      // Mark room as cleared
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: { clearedRooms: state.dungeon.clearedRooms + 1 }
      });
    },
    
    // Process enemy defeat
    defeatEnemy: () => {
      const enemy = state.dungeon.currentEnemy;
      
      if (!enemy) return;
      
      gameUtils.addLog(`${enemy.name}を倒した！`, 'critical');
      gameUtils.gainXP(enemy.xp);
      
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: {
          enemyPresent: false,
          currentEnemy: null,
          clearedRooms: state.dungeon.clearedRooms + 1
        }
      });
      
      // Clear any special event if this was a rare monster
      if (state.specialEvent && state.specialEvent.type === 'rareMonster') {
        dispatch({ type: ACTION_TYPES.CLEAR_SPECIAL_EVENT });
      }
    },
    
    // Advance to the next dungeon level
    nextDungeonLevel: () => {
      const newLevel = state.dungeon.level + 1;
      
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: {
          level: newLevel,
          clearedRooms: 0,
          roomsToNextLevel: 5 + newLevel,
          enemyPresent: false,
          treasurePresent: false,
          currentEnemy: null
        }
      });
      
      gameUtils.addLog(`ダンジョン階層${newLevel}に到達しました！`, 'critical');
    },

    saveGame: () => {
      const success = saveGame(state);
      if (success) {
        gameUtils.addLog("ゲームを保存しました。", 'success');
      } else {
        gameUtils.addLog("ゲームの保存に失敗しました。", 'failure');
      }
      return success;
    },

    loadSavedGame: () => {
      const savedState = loadGame();
      if (savedState) {
        dispatch({
          type: ACTION_TYPES.LOAD_SAVED_GAME,
          payload: savedState
        });
        return true;
      }
      return false;
    },

    hasSavedGame: () => {
      return hasSavedGame();
    },

    deleteSavedGame: () => {
      deleteSavedGame();
      gameUtils.addLog("セーブデータを削除しました。", 'success');
    }
  };
  
  return (
    <GameContext.Provider value={{ state, ...gameUtils }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
