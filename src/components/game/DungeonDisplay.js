// src/components/game/DungeonDisplay.js
import { useGame } from '../../context/GameContext';
import { getRandomRoomDescription } from '../../utils/game-data';
import EnemyDisplay from './EnemyDisplay';
import TreasureDisplay from './TreasureDisplay';
import SpecialEventDisplay from './SpecialEventDisplay';

const DungeonDisplay = () => {
  const { state } = useGame();
  const { dungeon } = state;
  
  // Helper function to render the appropriate content
  const renderDungeonContent = () => {
    // If there's a special event, render it using our new component
    if (state.specialEvent) {
      return <SpecialEventDisplay />;
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

export default DungeonDisplay;
