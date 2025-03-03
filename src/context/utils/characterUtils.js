// src/context/utils/characterUtils.js
import { ACTION_TYPES } from '../actions';

/**
 * Create character utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @returns {Object} Character utility functions
 */
const createCharacterUtils = (state, dispatch) => {
  return {
    /**
     * Update character stats
     * @param {Object} updates - Character property updates
     */
    updateCharacter: (updates) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_CHARACTER,
        payload: updates
      });
    },

    /**
     * Increase a stat during level up
     * @param {string} statName - Name of the stat to increase
     */
    increaseStat: (statName) => {
      dispatch({
        type: ACTION_TYPES.INCREASE_STAT,
        payload: statName
      });
    },
    
    /**
     * Increase a skill during level up
     * @param {string} skillName - Name of the skill to increase
     */
    increaseSkill: (skillName) => {
      dispatch({
        type: ACTION_TYPES.INCREASE_SKILL,
        payload: skillName
      });
    },

    /**
     * Handle character death and game over
     */
    gameOver: () => {
      dispatch({ type: ACTION_TYPES.GAME_OVER });
    },
    
    /**
     * Reset the game to initial state
     * @param {Object} options - Reset options
     */
    resetGame: (options = {}) => {
      localStorage.removeItem('dungeonHackCharacterName');
      dispatch({ 
        type: ACTION_TYPES.RESET_GAME,
        payload: { hasCreatedCharacter: false, ...options }
      });
    }
  };
};

export default createCharacterUtils;
