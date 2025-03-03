// src/context/actions.js
// Action type definitions
export const ACTION_TYPES = {
  ADD_LOG: 'ADD_LOG',
  UPDATE_CHARACTER: 'UPDATE_CHARACTER',
  UPDATE_DUNGEON: 'UPDATE_DUNGEON',
  RESET_GAME: 'RESET_GAME',
  GAME_OVER: 'GAME_OVER',
  START_LEVEL_UP: 'START_LEVEL_UP',
  FINISH_LEVEL_UP: 'FINISH_LEVEL_UP',
  INCREASE_STAT: 'INCREASE_STAT',
  INCREASE_SKILL: 'INCREASE_SKILL',
  SET_SPECIAL_EVENT: 'SET_SPECIAL_EVENT',
  CLEAR_SPECIAL_EVENT: 'CLEAR_SPECIAL_EVENT',
  APPLY_EVENT_EFFECT: 'APPLY_EVENT_EFFECT',
  LOAD_SAVED_GAME: 'LOAD_SAVED_GAME'
};

// Action creators (as needed)
export const addLog = (text, className = '') => ({
  type: ACTION_TYPES.ADD_LOG,
  payload: { text, className }
});

export const updateCharacter = (updates) => ({
  type: ACTION_TYPES.UPDATE_CHARACTER,
  payload: updates
});

export const updateDungeon = (updates) => ({
  type: ACTION_TYPES.UPDATE_DUNGEON,
  payload: updates
});

export const gameOver = () => ({
  type: ACTION_TYPES.GAME_OVER
});

export const resetGame = (options = {}) => ({
  type: ACTION_TYPES.RESET_GAME,
  payload: options
});

export const startLevelUp = () => ({
  type: ACTION_TYPES.START_LEVEL_UP
});

export const finishLevelUp = () => ({
  type: ACTION_TYPES.FINISH_LEVEL_UP
});

export const increaseStat = (statName) => ({
  type: ACTION_TYPES.INCREASE_STAT,
  payload: statName
});

export const increaseSkill = (skillName) => ({
  type: ACTION_TYPES.INCREASE_SKILL,
  payload: skillName
});

export const setSpecialEvent = (event) => ({
  type: ACTION_TYPES.SET_SPECIAL_EVENT,
  payload: event
});

export const clearSpecialEvent = () => ({
  type: ACTION_TYPES.CLEAR_SPECIAL_EVENT
});

export const applyEventEffect = (characterUpdates) => ({
  type: ACTION_TYPES.APPLY_EVENT_EFFECT,
  payload: { characterUpdates }
});

export const loadSavedGame = (savedState) => ({
  type: ACTION_TYPES.LOAD_SAVED_GAME,
  payload: savedState
});
