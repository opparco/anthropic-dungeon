// src/context/utils/eventUtils.js
import { ACTION_TYPES } from '../actions';
import { rollForSpecialEvent, EVENT_TYPES } from '../../utils/special-events';

/**
 * Create special event utility functions
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @param {Object} logUtils - Log utility functions
 * @returns {Object} Event utility functions
 */
const createEventUtils = (state, dispatch, logUtils) => {
  const { addLog } = logUtils;

  return {
    /**
     * Check for special events
     * @returns {boolean} True if an event was triggered
     */
    checkSpecialEvent: () => {
      const event = rollForSpecialEvent(state.dungeon.level);
      
      if (event) {
        // Set the special event in state
        dispatch({
          type: ACTION_TYPES.SET_SPECIAL_EVENT,
          payload: event
        });
        
        // Add event messages to the log
        if (event.messages && event.messages.length > 0) {
          event.messages.forEach(message => {
            addLog(message, 'critical');
          });
        }
        
        // If it's a rare monster, spawn it
        if (event.type === EVENT_TYPES.RARE_MONSTER && event.monster) {
          dispatch({
            type: ACTION_TYPES.UPDATE_DUNGEON,
            payload: { 
              enemyPresent: true,
              currentEnemy: event.monster 
            }
          });
        }
        
        return true;
      }
      
      return false;
    },
    
    /**
     * Apply effect from blessing fountain or other events
     * @param {string} optionId - ID of the selected option
     */
    applyEventEffect: (optionId) => {
      const { specialEvent } = state;
      
      if (!specialEvent || !specialEvent.options) {
        return;
      }
      
      // Find the selected option
      const selectedOption = specialEvent.options.find(option => option.id === optionId);
      
      if (!selectedOption) {
        return;
      }
      
      // Apply the effect
      const effectResult = selectedOption.effect(state.character);
      
      // Update character with the effect
      dispatch({
        type: ACTION_TYPES.APPLY_EVENT_EFFECT,
        payload: {
          characterUpdates: effectResult
        }
      });
      
      // Log the message
      if (selectedOption.message) {
        addLog(
          selectedOption.message(effectResult), 
          'success'
        );
      }
      
      // Clear the special event
      dispatch({ type: ACTION_TYPES.CLEAR_SPECIAL_EVENT });
      
      // Mark room as cleared
      dispatch({
        type: ACTION_TYPES.UPDATE_DUNGEON,
        payload: { clearedRooms: state.dungeon.clearedRooms + 1 }
      });
    }
  };
};

export default createEventUtils;
