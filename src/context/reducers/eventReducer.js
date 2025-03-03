// src/context/reducers/eventReducer.js
import { ACTION_TYPES } from '../actions';

// Reducer for managing special events
export const eventReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SPECIAL_EVENT:
      return action.payload;
      
    case ACTION_TYPES.CLEAR_SPECIAL_EVENT:
      return null;
      
    default:
      return state;
  }
};

export default eventReducer;
