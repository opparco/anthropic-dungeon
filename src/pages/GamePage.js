// src/pages/GamePage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import CharacterSheet from '../components/game/CharacterSheet';
import DungeonDisplay from '../components/game/DungeonDisplay';
import ActionButtons from '../components/game/ActionButtons';
import GameLog from '../components/game/GameLog';
import LevelUpMenu from '../components/game/LevelUpMenu';
import SaveLoadMenu from '../components/game/SaveLoadMenu';

const GamePage = () => {
  const { state, addLog } = useGame();
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const navigate = useNavigate();
  
  // Redirect to home if character isn't created yet
  useEffect(() => {
    if (!state.hasCreatedCharacter) {
      navigate('/');
    }
  }, [state.hasCreatedCharacter, navigate]);
  
  // Redirect to game-over page if isGameOver is true
  useEffect(() => {
    if (state.isGameOver) {
      navigate('/game-over');
    }
  }, [state.isGameOver, navigate]);
  
  // Add game start message when first loading the game
  useEffect(() => {
    if (state.gameLog.length === 0) {
      addLog("ゲーム開始！ダンジョンの探索を始めましょう。");
    }
  }, [addLog, state.gameLog.length]);

  // If redirecting, don't render the page content
  if (!state.hasCreatedCharacter) {
    return null;
  }

  return (
    <div className="game-page max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-sky-400">
          ダンジョン階層: <span className="text-white">{state.dungeon.level}</span>
        </h2>
        
        {/* メニューボタン */}
        <button
          onClick={() => setShowSaveMenu(true)}
          className="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          メニュー
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character sheet - left column on desktop */}
        <div className="lg:col-span-1">
          <CharacterSheet />
        </div>
        
        {/* Main game area - center and right columns on desktop */}
        <div className="lg:col-span-2">
          {state.isLevelingUp ? (
            <LevelUpMenu />
          ) : (
            <>
              <DungeonDisplay />
              <ActionButtons />
            </>
          )}
          
          <GameLog />
        </div>
      </div>
      
      {/* セーブ/ロードメニュー */}
      {showSaveMenu && (
        <SaveLoadMenu onClose={() => setShowSaveMenu(false)} />
      )}
    </div>
  );
};

export default GamePage;
