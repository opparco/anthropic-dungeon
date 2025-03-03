// src/context/reducers/dungeonReducer.js
import { ACTION_TYPES } from '../actions';

// Reducer for managing dungeon state
export const dungeonReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DUNGEON:
      return {
        ...state,
        ...action.payload
      };
      
    default:
      return state;
  }
};

export default dungeonReducer;
