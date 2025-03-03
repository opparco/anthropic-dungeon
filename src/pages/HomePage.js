// src/pages/HomePage.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import CharacterCreator from '../components/game/CharacterCreator';
import { getSaveDateTime } from '../utils/SaveLoadSystem';

const HomePage = () => {
  const { resetGame, hasSavedGame, loadSavedGame } = useGame();
  const [showCharacterCreator, setShowCharacterCreator] = useState(false);
  const [saveExists, setSaveExists] = useState(false);
  const [saveDate, setSaveDate] = useState(null);
  const navigate = useNavigate();

  // セーブデータの存在を確認
  useEffect(() => {
    const exists = hasSavedGame();
    setSaveExists(exists);
    
    if (exists) {
      const savedAt = getSaveDateTime();
      if (savedAt) {
        const date = new Date(savedAt);
        setSaveDate(date.toLocaleString());
      }
    }
  }, [hasSavedGame]);

  // Reset game state when starting from homepage
  const handleStartGame = () => {
    resetGame();
    setShowCharacterCreator(true);
  };
  
  // 続きからゲームを始める
  const handleContinueGame = () => {
    if (loadSavedGame()) {
      navigate('/game');
    }
  };

  // If showing character creator, render it
  if (showCharacterCreator) {
    return <CharacterCreator />;
  }

  return (
    <div className="max-w-3xl mx-auto text-center py-10">
      <h1 className="text-5xl font-bold mb-8 text-sky-400 tracking-wider">
        ダンジョンハック
      </h1>
      
      <div className="bg-indigo-900 rounded-lg shadow-lg p-8 mb-8">
        <p className="text-xl mb-6">
          古代の迷宮に挑む冒険者になって、富と名声を手に入れよう！
        </p>
        <p className="mb-8">
          モンスターを倒し、罠を回避し、宝物を見つけながらダンジョンの奥へと進みましょう。あなたの冒険がここから始まります。
        </p>
        
        <div className="space-y-4">
          {saveExists && (
            <div className="mb-6">
              <div className="p-4 bg-indigo-800 rounded mb-3 text-left">
                <h3 className="font-semibold mb-1">セーブデータが見つかりました</h3>
                <p className="text-sm mb-1">最終保存日時: <span className="text-amber-300">{saveDate}</span></p>
              </div>
              
              <button 
                onClick={handleContinueGame}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg shadow-md mb-2"
              >
                冒険を続ける
              </button>
            </div>
          )}
          
          <button 
            onClick={handleStartGame}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg shadow-md"
          >
            新しい冒険を始める
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-sky-300">ゲーム特徴</h2>
          <ul className="text-left space-y-2">
            <li>• ターン制バトルシステム</li>
            <li>• キャラクター成長とレベルアップ</li>
            <li>• 多種多様なモンスターと宝物</li>
            <li>• ランダム生成ダンジョン</li>
            <li>• シンプルながら奥深い戦略性</li>
          </ul>
        </div>
        
        <div className="bg-indigo-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-sky-300">操作方法</h2>
          <ul className="text-left space-y-2">
            <li>• 「探索」ボタンで新しい部屋へ</li>
            <li>• 「攻撃」「魔法」「交渉」でモンスターと戦う</li>
            <li>• 「休憩」でHP・MPを回復</li>
            <li>• レベルアップでステータスと特技を強化</li>
            <li>• どこまで潜れるかに挑戦しよう！</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
