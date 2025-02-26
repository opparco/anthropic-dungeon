// src/components/game/CharacterSheet.js
import { useGame } from '../../context/GameContext';
import { calculateXpToNextLevel } from '../../utils/game-data';

const CharacterSheet = () => {
  const { state } = useGame();
  const { character } = state;
  
  // Calculate XP progress percentage
  const xpNeeded = calculateXpToNextLevel(character.level);
  const xpPercentage = Math.min(100, (character.xp / xpNeeded) * 100);
  
  return (
    <div className="bg-indigo-900 rounded-lg shadow-lg overflow-hidden">
      <h3 className="text-lg font-semibold bg-indigo-800 py-2 px-4 text-sky-300">
        キャラクターシート
      </h3>
      
      {/* Character name */}
      <div className="px-4 pt-3">
        <h4 className="text-xl font-bold text-amber-300 mb-3">
          {character.name || '無名の冒険者'}
        </h4>
      </div>
      
      {/* HP and MP bars */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>HP</span>
              <span>{character.hp}/{character.maxHp}</span>
            </div>
            <div className="h-4 bg-indigo-800 rounded overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${(character.hp / character.maxHp) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>MP</span>
              <span>{character.mp}/{character.maxMp}</span>
            </div>
            <div className="h-4 bg-indigo-800 rounded overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${(character.mp / character.maxMp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Level and XP */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>レベル: {character.level}</span>
            <span>経験値: {character.xp}/{xpNeeded}</span>
          </div>
          <div className="h-2 bg-indigo-800 rounded overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-300"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Stats */}
        <div>
          <h4 className="font-medium mb-2 text-sky-200">ステータス</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between">
              <span>筋力 (STR)</span>
              <span className="font-medium">{character.stats.str}</span>
            </div>
            <div className="flex justify-between">
              <span>敏捷 (DEX)</span>
              <span className="font-medium">{character.stats.dex}</span>
            </div>
            <div className="flex justify-between">
              <span>知力 (INT)</span>
              <span className="font-medium">{character.stats.int}</span>
            </div>
            <div className="flex justify-between">
              <span>精神 (MND)</span>
              <span className="font-medium">{character.stats.mnd}</span>
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div>
          <h4 className="font-medium mb-2 text-sky-200">特技</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between">
              <span>剣術</span>
              <span className="font-medium">{character.skills.sword}</span>
            </div>
            <div className="flex justify-between">
              <span>魔法</span>
              <span className="font-medium">{character.skills.magic}</span>
            </div>
            <div className="flex justify-between">
              <span>罠回避</span>
              <span className="font-medium">{character.skills.trap}</span>
            </div>
            <div className="flex justify-between">
              <span>探索</span>
              <span className="font-medium">{character.skills.search}</span>
            </div>
            <div className="flex justify-between">
              <span>交渉</span>
              <span className="font-medium">{character.skills.negotiation}</span>
            </div>
          </div>
        </div>
        
        {/* Points left for level up if any */}
        {(character.statPoints > 0 || character.skillPoints > 0) && (
          <div className="mt-4 p-2 bg-indigo-800 rounded">
            <p className="text-yellow-300 text-sm">
              {character.statPoints > 0 && `ステータスポイント: ${character.statPoints} `}
              {character.skillPoints > 0 && `特技ポイント: ${character.skillPoints}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSheet;
