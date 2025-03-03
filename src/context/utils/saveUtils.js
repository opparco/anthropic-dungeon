// src/context/utils/saveUtils.js
import { ACTION_TYPES } from '../actions';
import { 
  saveGame as saveGameToStorage, 
  loadGame as loadGameFromStorage, 
  hasSavedGame as checkSavedGame, 
  deleteSavedGame as deleteGameFromStorage 
} from '../../utils/SaveLoadSystem';

/**
 * Create save/load utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @param {Object} logUtils - Log utility functions
 * @returns {Object} Save/load utility functions
 */
const createSaveUtils = (state, dispatch, logUtils) => {
  const { addLog } = logUtils;

  return {
    /**
     * Save the current game state
     * @returns {boolean} True if save was successful
     */
    saveGame: () => {
      const success = saveGameToStorage(state);
      if (success) {
        addLog("ゲームを保存しました。", 'success');
      } else {
        addLog("ゲームの保存に失敗しました。", 'failure');
      }
      return success;
    },

    /**
     * Load a saved game
     * @returns {boolean} True if load was successful
     */
    loadSavedGame: () => {
      const savedState = loadGameFromStorage();
      if (savedState) {
        dispatch({
          type: ACTION_TYPES.LOAD_SAVED_GAME,
          payload: savedState
        });
        return true;
      }
      return false;
    },

    /**
     * Check if a saved game exists
     * @returns {boolean} True if a saved game exists
     */
    hasSavedGame: () => {
      return checkSavedGame();
    },

    /**
     * Delete saved game data
     */
    deleteSavedGame: () => {
      deleteGameFromStorage();
      addLog("セーブデータを削除しました。", 'success');
    }
  };
};

export default createSaveUtils;
