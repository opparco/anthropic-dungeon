// src/pages/GameOverPage.js
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const GameOverPage = () => {
  const { state, resetGame } = useGame();
  const navigate = useNavigate();
  
  // Redirect to home if not game over
  useEffect(() => {
    if (!state.isGameOver) {
      navigate('/');
    }
  }, [state.isGameOver, navigate]);
  
  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8 text-red-500">ゲームオーバー</h1>
      
      <div className="bg-indigo-900 rounded-lg shadow-xl p-8 mb-8">
        <p className="text-xl mb-6">
          あなたは冒険の途中で倒れました...
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-indigo-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-sky-300">統計</h3>
            <ul className="space-y-2">
              <li>到達階層: <span className="text-white font-medium">{state.dungeon.level}</span></li>
              <li>キャラクターレベル: <span className="text-white font-medium">{state.character.level}</span></li>
              <li>クリアした部屋: <span className="text-white font-medium">{state.dungeon.clearedRooms}</span></li>
            </ul>
          </div>
          
          <div className="bg-indigo-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-sky-300">最終ステータス</h3>
            <ul className="space-y-2">
              <li>筋力: <span className="text-white font-medium">{state.character.stats.str}</span></li>
              <li>敏捷: <span className="text-white font-medium">{state.character.stats.dex}</span></li>
              <li>知力: <span className="text-white font-medium">{state.character.stats.int}</span></li>
              <li>精神: <span className="text-white font-medium">{state.character.stats.mnd}</span></li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/game" 
            onClick={resetGame}
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            もう一度挑戦する
          </Link>
          
          <Link 
            to="/" 
            className="block w-full bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            タイトル画面に戻る
          </Link>
        </div>
      </div>
      
      <p className="text-indigo-300">
        次はもっと深くまで探索できるよう、戦略を練り直してみましょう！
      </p>
    </div>
  );
};

export default GameOverPage;
