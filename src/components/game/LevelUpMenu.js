// src/components/game/LevelUpMenu.js
import { useGame } from '../../context/GameContext';
import { statDescriptions, skillDescriptions } from '../../utils/game-data';

const LevelUpMenu = () => {
  const { state, increaseStat, increaseSkill, finishLevelUp } = useGame();
  const { character } = state;
  
  return (
    <div className="bg-indigo-900 rounded-lg shadow-lg overflow-hidden mb-6">
      <h3 className="text-2xl font-bold bg-yellow-800 py-3 px-4 text-yellow-300 text-center">
        レベルアップ
      </h3>
      
      <div className="p-4">
        {/* Stat points allocation */}
        {character.statPoints > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3 text-sky-300">
              ステータスポイント: {character.statPoints}
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(statDescriptions).map(([key, stat]) => (
                <button
                  key={key}
                  onClick={() => increaseStat(key)}
                  className="flex flex-col items-center bg-indigo-800 hover:bg-indigo-700 p-3 rounded-lg transition-colors"
                >
                  <span className="font-bold text-yellow-300">{stat.name} +</span>
                  <span className="text-sm">現在: {character.stats[key]}</span>
                  <span className="text-xs mt-1 text-center text-indigo-200">{stat.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Skill points allocation */}
        {character.skillPoints > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3 text-sky-300">
              特技ポイント: {character.skillPoints}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(skillDescriptions).map(([key, skill]) => (
                <button
                  key={key}
                  onClick={() => increaseSkill(key)}
                  className="flex flex-col items-center bg-indigo-800 hover:bg-indigo-700 p-3 rounded-lg transition-colors"
                >
                  <span className="font-bold text-yellow-300">{skill.name} +</span>
                  <span className="text-sm">現在: {character.skills[key]}</span>
                  <span className="text-xs mt-1 text-center text-indigo-200">{skill.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Complete button */}
        <div className="text-center mt-4">
          <button
            onClick={finishLevelUp}
            className={`py-2 px-6 rounded-lg font-medium text-white ${
              character.statPoints === 0 && character.skillPoints === 0
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-yellow-600 hover:bg-yellow-700'
            } transition-colors`}
          >
            {character.statPoints === 0 && character.skillPoints === 0
              ? '完了'
              : 'スキップ (残りポイントは失われます)'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelUpMenu;
