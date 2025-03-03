// src/context/utils/index.js
/**
 * Main entry point for game utilities
 * Combines all utility modules
 */
import createLogUtils from './logUtils';
import createCharacterUtils from './characterUtils';
import createDungeonUtils from './dungeonUtils';
import createEnemyUtils from './enemyUtils';
import createProgressionUtils from './progressionUtils';
import createEventUtils from './eventUtils';
import createSaveUtils from './saveUtils';

/**
 * Create game utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @returns {Object} Combined game utilities
 */
const createGameUtils = (state, dispatch) => {
  // Common utilities
  const commonUtils = {
    // Roll dice function
    rollDice: (sides = 10) => {
      return Math.floor(Math.random() * sides) + 1;
    },
    
    // Skill check function
    checkRoll: (stat, skill, difficulty) => {
      const roll = commonUtils.rollDice();
      const total = stat + skill + roll;
      return {
        success: total >= difficulty,
        critical: roll === 10,
        fumble: roll === 1,
        roll,
        total
      };
    },
  };

  // Create modules in dependency order
  const logUtils = createLogUtils(state, dispatch);
  const characterUtils = createCharacterUtils(state, dispatch);
  
  // Create progression utils (needs logUtils)
  const progressionUtils = createProgressionUtils(state, dispatch, logUtils);
  
  // Create dungeon utils with dependencies injected
  const dungeonUtils = createDungeonUtils(state, dispatch);
  dungeonUtils.addLog = logUtils.addLog;
  dungeonUtils.gainXP = progressionUtils.gainXP;
  
  // Create enemy utils with dependencies injected
  const enemyUtils = createEnemyUtils(state, dispatch, logUtils);
  enemyUtils.gainXP = progressionUtils.gainXP;
  
  // Create event utils (needs logUtils)
  const eventUtils = createEventUtils(state, dispatch, logUtils);
  
  // Create save utils (needs logUtils)
  const saveUtils = createSaveUtils(state, dispatch, logUtils);

  // Combine all utilities into one object
  return {
    ...commonUtils,
    ...logUtils,
    ...characterUtils,
    ...dungeonUtils,
    ...enemyUtils,
    ...progressionUtils,
    ...eventUtils,
    ...saveUtils
  };
};

export default createGameUtils;
