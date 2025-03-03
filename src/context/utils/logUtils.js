// src/context/utils/logUtils.js
import { ACTION_TYPES } from '../actions';

/**
 * Create log utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @returns {Object} Log utility functions
 */
const createLogUtils = (state, dispatch) => {
  return {
    /**
     * Add a new entry to the game log
     * @param {string} text - Log message text
     * @param {string} className - Optional CSS class for styling the log entry
     */
    addLog: (text, className = '') => {
      dispatch({
        type: ACTION_TYPES.ADD_LOG,
        payload: { text, className }
      });
    }
  };
};

export default createLogUtils;
