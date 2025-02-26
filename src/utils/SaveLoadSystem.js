// src/utils/SaveLoadSystem.js
/**
 * ゲームのセーブ/ロードの機能を提供するユーティリティ
 */

const SAVE_KEY = 'dungeonHackSaveData';

/**
 * ゲームの状態を保存する
 * @param {Object} gameState - 保存するゲームの状態オブジェクト
 */
export const saveGame = (gameState) => {
  try {
    // 保存不要な一部の状態を除外
    const stateToSave = {
      character: gameState.character,
      dungeon: gameState.dungeon,
      isGameOver: gameState.isGameOver,
      hasCreatedCharacter: gameState.hasCreatedCharacter
      // gameLogは保存しない
      // isLevelingUpは保存しない
      // specialEventは保存しない
    };
    
    // 現在の日時を追加
    stateToSave.savedAt = new Date().toISOString();
    
    // JSONに変換して保存
    const saveData = JSON.stringify(stateToSave);
    localStorage.setItem(SAVE_KEY, saveData);
    
    return true;
  } catch (error) {
    console.error('ゲームの保存に失敗しました:', error);
    return false;
  }
};

/**
 * 保存されたゲームの状態を読み込む
 * @returns {Object|null} 保存されていたゲームの状態、または保存がなければnull
 */
export const loadGame = () => {
  try {
    const saveData = localStorage.getItem(SAVE_KEY);
    
    if (!saveData) {
      return null;
    }
    
    return JSON.parse(saveData);
  } catch (error) {
    console.error('ゲームのロードに失敗しました:', error);
    return null;
  }
};

/**
 * 保存されたゲームデータが存在するか確認
 * @returns {boolean} 保存データが存在すればtrue
 */
export const hasSavedGame = () => {
  return localStorage.getItem(SAVE_KEY) !== null;
};

/**
 * 保存されたゲームデータを削除
 */
export const deleteSavedGame = () => {
  localStorage.removeItem(SAVE_KEY);
};

/**
 * 最後にゲームが保存された日時を取得
 * @returns {string|null} 保存日時、または保存がなければnull
 */
export const getSaveDateTime = () => {
  try {
    const saveData = localStorage.getItem(SAVE_KEY);
    
    if (!saveData) {
      return null;
    }
    
    const parsedData = JSON.parse(saveData);
    return parsedData.savedAt;
  } catch (error) {
    console.error('セーブデータの読み込みに失敗しました:', error);
    return null;
  }
};
