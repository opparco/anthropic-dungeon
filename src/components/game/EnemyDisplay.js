// src/components/game/EnemyDisplay.js
import React from 'react';

const EnemyDisplay = ({ enemy, isRare = false }) => {
  const healthPercentage = (enemy.hp / enemy.maxHp) * 100;
  
  return (
    <div className={`rounded-lg p-4 ${isRare ? 'bg-purple-900/40' : 'bg-red-900/30'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${isRare ? 'text-yellow-300' : 'text-red-400'}`}>
          {enemy.name}
        </h3>
        {isRare && (
          <span className="bg-yellow-600 text-yellow-100 text-xs px-2 py-1 rounded">
            レア
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm">攻撃力:</span>
          <span className="ml-2 font-medium">{enemy.attack}</span>
        </div>
        <div>
          <span className="text-sm">防御力:</span>
          <span className="ml-2 font-medium">{enemy.defense}</span>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm">
          <span>HP</span>
          <span>{enemy.hp}/{enemy.maxHp}</span>
        </div>
        <div className="h-3 bg-indigo-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isRare ? 'bg-yellow-500' : 'bg-red-500'} transition-all duration-300`}
            style={{ width: `${healthPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p>どうする？</p>
      </div>
    </div>
  );
};

export default EnemyDisplay;
