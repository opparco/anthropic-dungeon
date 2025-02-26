// src/components/game/TreasureDisplay.js
import { useEffect } from 'react';
import { useGame } from '../../context/GameContext';

const TreasureDisplay = () => {
  const { state, createTreasure } = useGame();
  
  // Generate treasure when component mounts
  useEffect(() => {
    createTreasure();
  }, [createTreasure]);
  
  return (
    <div className="bg-amber-900/40 rounded-lg p-4 text-center py-8">
      <h3 className="text-xl font-bold text-amber-300 mb-4">
        宝物を見つけた！
      </h3>
      <p className="text-amber-100">
        奥に進むか、休むか選択してください。
      </p>
    </div>
  );
};

export default TreasureDisplay;
