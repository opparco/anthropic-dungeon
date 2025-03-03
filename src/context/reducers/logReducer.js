// src/context/reducers/logReducer.js
import { ACTION_TYPES } from '../actions';

// Reducer for managing game log
export const logReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_LOG:
      return [
        ...state, 
        { 
          text: action.payload.text, 
          className: action.payload.className || '' 
        }
      ];
      
    default:
      return state;
  }
};

export default logReducer;
