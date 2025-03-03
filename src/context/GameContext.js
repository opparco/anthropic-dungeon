// src/context/GameContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';
import initialGameState from './initialState';
import gameReducer from './reducers';
import { ACTION_TYPES } from './actions';
import createGameUtils from './utils';

// Create game context
const GameContext = createContext();

// Context provider
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  
  // Initialize game log on first render
  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.ADD_LOG,
      payload: { text: "ゲーム開始！ダンジョンの探索を始めましょう。" }
    });
  }, []);
  
  // Create game utility functions
  const gameUtils = createGameUtils(state, dispatch);
  
  return (
    <GameContext.Provider value={{ state, ...gameUtils }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
