// src/context/utils/dungeonUtils.js
import { ACTION_TYPES } from '../actions';

/**
 * Create dungeon utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @returns {Object} Dungeon utility functions
 */
const createDungeonUtils = (state, dispatch) => {
  return {
    /**
     * Update dungeon state
     * @param {Object} updates - Dungeon property updates
     */
    updateDungeon: (updates) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: updates
      });
    },
    
    /**
     * Advance to the next dungeon level
     */
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
      
      // Note: This function depends on addLog, which will be injected
      // when combining all utilities in the main index.js
      if (createDungeonUtils.addLog) {
        createDungeonUtils.addLog(`ダンジョン階層${newLevel}に到達しました！`, 'critical');
      }
    },

    /**
     * Create a treasure for the player to find
     */
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
          
          // Note: This function depends on gainXP, which will be injected
          // when combining all utilities in the main index.js
          if (createDungeonUtils.gainXP) {
            createDungeonUtils.gainXP(xpGain);
          }
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
      
      // Note: This function depends on addLog, which will be injected
      // when combining all utilities in the main index.js
      if (createDungeonUtils.addLog) {
        createDungeonUtils.addLog(`${treasure.name}を見つけました！${treasure.effect}`, 'critical');
      }
      
      return treasure;
    }
  };
};

export default createDungeonUtils;
