// src/components/game/DungeonDisplay.js
import { useGame } from '../../context/GameContext';
import { getRandomRoomDescription } from '../../utils/game-data';
import EnemyDisplay from './EnemyDisplay';
import TreasureDisplay from './TreasureDisplay';

const DungeonDisplay = () => {
  const { state, specialEvent } = useGame();
  const { dungeon } = state;
  
  // Helper function to render the appropriate content
  const renderDungeonContent = () => {
    // If there's a special event, render it
    if (state.specialEvent) {
      if (state.specialEvent.type === 'rareMonster') {
        if (dungeon.currentEnemy) {
          return <EnemyDisplay enemy={dungeon.currentEnemy} isRare={true} />;
        } else {
          return (
            <div className="text-center py-6">
              <p className="mb-4 text-yellow-300">特殊なモンスターが現れたようだが、姿が見えない...</p>
              <p>先に進もう。</p>
            </div>
          );
        }
      } else if (state.specialEvent.type === 'blessingFountain') {
        return <BlessingFountain />;
      }
    }
    
    // Otherwise render normal room content
    if (dungeon.enemyPresent && dungeon.currentEnemy) {
      return <EnemyDisplay enemy={dungeon.currentEnemy} />;
    } else if (dungeon.treasurePresent) {
      return <TreasureDisplay />;
    } else {
      return <EmptyRoom />;
    }
  };
  
  return (
    <div className="bg-indigo-900 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold bg-indigo-800 py-2 px-4 text-sky-300">
        ダンジョン
      </h3>
      
      <div className="p-4 min-h-40">
        {renderDungeonContent()}
      </div>
      
      {/* Room progress indicator */}
      <div className="px-4 pb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>クリア済み部屋: {dungeon.clearedRooms}</span>
          <span>次の階層まで: {dungeon.roomsToNextLevel}</span>
        </div>
        <div className="h-1 bg-indigo-800 rounded overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ 
              width: `${Math.min(100, (dungeon.clearedRooms / dungeon.roomsToNextLevel) * 100)}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Empty room component
const EmptyRoom = () => {
  return (
    <div className="text-center py-6">
      <p className="mb-4">{getRandomRoomDescription()}</p>
      <p>先に進むか、休むか選択してください。</p>
    </div>
  );
};

// Blessing fountain component
const BlessingFountain = () => {
  const { applyFountainEffect } = useGame();
  
  return (
    <div className="bg-amber-900/40 rounded-lg p-4 text-center">
      <h3 className="text-xl font-bold text-amber-300 mb-2">祝福の泉を見つけた！</h3>
      <p className="mb-4">神秘的な力があなたを包み込む...</p>
      
      <div className="flex flex-wrap justify-center gap-2">
        <button 
          onClick={() => applyFountainEffect('hp')}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded shadow"
        >
          体力強化
        </button>
        <button 
          onClick={() => applyFountainEffect('mp')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow"
        >
          魔力強化
        </button>
        <button 
          onClick={() => applyFountainEffect('stat')}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded shadow"
        >
          能力強化
        </button>
      </div>
    </div>
  );
};

export default DungeonDisplay;
