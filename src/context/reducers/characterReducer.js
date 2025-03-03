// src/context/reducers/characterReducer.js
import { ACTION_TYPES } from '../actions';

// Reducer for managing character state
export const characterReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_CHARACTER:
      return {
        ...state,
        ...action.payload
      };
      
    case ACTION_TYPES.INCREASE_STAT:
      if (state.statPoints <= 0) return state;
      
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload]: state.stats[action.payload] + 1
        },
        statPoints: state.statPoints - 1
      };
      
    case ACTION_TYPES.INCREASE_SKILL:
      if (state.skillPoints <= 0) return state;
      
      return {
        ...state,
        skills: {
          ...state.skills,
          [action.payload]: state.skills[action.payload] + 1
        },
        skillPoints: state.skillPoints - 1
      };
      
    case ACTION_TYPES.APPLY_EVENT_EFFECT:
      const characterUpdates = {...action.payload.characterUpdates};
      const metaKeys = ['statBonus', 'hpBonus', 'mpBonus', 'blessed', 'boostedStat', 'boostAmount'];
      metaKeys.forEach(key => {
        if (key in characterUpdates) {
          delete characterUpdates[key];
        }
      });

      return {
        ...state,
        ...characterUpdates
      };
      
    default:
      return state;
  }
};

export default characterReducer;
