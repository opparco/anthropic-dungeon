// src/context/utils/enemyUtils.js
import { ACTION_TYPES } from '../actions';
import { monsterTemplates } from '../../utils/game-data';

/**
 * Create enemy utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @param {Object} logUtils - Log utility functions
 * @returns {Object} Enemy utility functions
 */
const createEnemyUtils = (state, dispatch, logUtils) => {
  const { addLog } = logUtils;

  return {
    /**
     * Generate a monster based on dungeon level
     * @returns {Object} Generated monster object
     */
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
    
    /**
     * Create and spawn an enemy in the dungeon
     * @returns {Object} The spawned monster
     */
    spawnEnemy: () => {
      const monster = createEnemyUtils(state, dispatch, logUtils).generateMonster();
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: { 
          enemyPresent: true, 
          currentEnemy: monster 
        }
      });
      addLog(`${monster.name}が現れた！`);
      return monster;
    },
    
    /**
     * Process enemy defeat
     */
    defeatEnemy: () => {
      const enemy = state.dungeon.currentEnemy;
      
      if (!enemy) return;
      
      addLog(`${enemy.name}を倒した！`, 'critical');
      
      // Note: This function depends on gainXP, which will be injected
      // when combining all utilities in the main index.js
      if (createEnemyUtils.gainXP) {
        createEnemyUtils.gainXP(enemy.xp);
      }
      
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

    /**
     * Handle successful negotiation with an enemy
     * @param {number} divisor - XP divisor for negotiation reward
     */
    negotiateSuccess: (divisor = 4) => {
      const enemy = state.dungeon.currentEnemy;
      
      if (!enemy) return;
      
      const xpGain = Math.floor(enemy.xp / divisor);
      
      // Note: This function depends on gainXP, which will be injected
      // when combining all utilities in the main index.js
      if (createEnemyUtils.gainXP) {
        createEnemyUtils.gainXP(xpGain);
      }
      
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
    }
  };
};

export default createEnemyUtils;
