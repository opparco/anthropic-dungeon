// src/context/reducers/index.js
import { ACTION_TYPES } from '../actions';
import initialGameState from '../initialState';
import characterReducer from './characterReducer';
import dungeonReducer from './dungeonReducer';
import logReducer from './logReducer';
import eventReducer from './eventReducer';
import uiReducer from './uiReducer';

// Root reducer - combines all reducers
export const gameReducer = (state, action) => {
  // Special case: Reset game
  if (action.type === ACTION_TYPES.RESET_GAME) {
    return {
      ...initialGameState,
      hasCreatedCharacter: action.payload.hasCreatedCharacter || false,
      gameLog: [{ text: "ゲーム開始！ダンジョンの探索を始めましょう。", className: '' }]
    };
  }
  
  // Special case: Load saved game
  if (action.type === ACTION_TYPES.LOAD_SAVED_GAME) {
    return {
      ...state,
      character: action.payload.character,
      dungeon: action.payload.dungeon,
      isGameOver: action.payload.isGameOver || false,
      hasCreatedCharacter: action.payload.hasCreatedCharacter || false,
      gameLog: [
        ...state.gameLog,
        { text: "保存したゲームをロードしました。", className: 'success' }
      ]
    };
  }
  
  // Delegate to domain-specific reducers
  const uiState = uiReducer(
    {
      isGameOver: state.isGameOver,
      isLevelingUp: state.isLevelingUp,
      hasCreatedCharacter: state.hasCreatedCharacter
    }, 
    action
  );
  
  return {
    ...state,
    character: characterReducer(state.character, action),
    dungeon: dungeonReducer(state.dungeon, action),
    gameLog: logReducer(state.gameLog, action),
    specialEvent: eventReducer(state.specialEvent, action),
    // UI states
    isGameOver: uiState.isGameOver,
    isLevelingUp: uiState.isLevelingUp,
    hasCreatedCharacter: uiState.hasCreatedCharacter
  };
};

export default gameReducer;
