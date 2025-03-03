// src/context/reducers/uiReducer.js
import { ACTION_TYPES } from '../actions';

// Reducer for managing UI states (game over, level up, etc)
export const uiReducer = (state, action) => {
  switch (action.type) {
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
      
    case ACTION_TYPES.UPDATE_CHARACTER:
      return {
        ...state,
        hasCreatedCharacter: true
      };
      
    default:
      return state;
  }
};

export default uiReducer;
