// src/context/utils/progressionUtils.js
import { ACTION_TYPES } from '../actions';

/**
 * Create progression utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @param {Object} logUtils - Log utility functions
 * @returns {Object} Progression utility functions
 */
const createProgressionUtils = (state, dispatch, logUtils) => {
  const { addLog } = logUtils;

  return {
    /**
     * Handle gaining XP and level up
     * @param {number} amount - Amount of XP gained
     */
    gainXP: (amount) => {
      const newXP = state.character.xp + amount;
      const xpNeeded = state.character.level * 20;
      
      addLog(`${amount}の経験値を獲得しました！`, 'success');
      
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
        
        addLog(`レベルアップ！レベル${updatedCharacter.level}になりました！`, 'critical');
        dispatch({ type: ACTION_TYPES.START_LEVEL_UP });
      } else {
        // Just update XP
        dispatch({
          type: ACTION_TYPES.UPDATE_CHARACTER,
          payload: { xp: newXP }
        });
      }
    },
    
    /**
     * Finish level up process
     */
    finishLevelUp: () => {
      dispatch({ type: ACTION_TYPES.FINISH_LEVEL_UP });
      addLog("レベルアップが完了しました！探索を続けましょう。");
    }
  };
};

export default createProgressionUtils;
