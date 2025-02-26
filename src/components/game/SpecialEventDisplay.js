// src/components/game/SpecialEventDisplay.js
import React from 'react';
import { useGame } from '../../context/GameContext';
import { EVENT_TYPES } from '../../utils/special-events';
import EnemyDisplay from './EnemyDisplay';

const SpecialEventDisplay = () => {
  const { state, applyEventEffect } = useGame();
  const { specialEvent } = state;
  
  if (!specialEvent) return null;
  
  // Render different content based on event type
  switch (specialEvent.type) {
    case EVENT_TYPES.BLESSING_FOUNTAIN:
      return <BlessingFountain />;
      
    case EVENT_TYPES.RARE_MONSTER:
      if (state.dungeon.currentEnemy) {
        return <EnemyDisplay enemy={state.dungeon.currentEnemy} isRare={true} />;
      }
      return <EmptySpecialEvent />;
      
    case EVENT_TYPES.MYSTERIOUS_MERCHANT:
      return <MysteriousMerchant />;
      
    case EVENT_TYPES.ANCIENT_SHRINE:
      return <AncientShrine />;
      
    default:
      return <EmptySpecialEvent />;
  }
};

// Empty placeholder for special events
const EmptySpecialEvent = () => {
  const { state } = useGame();
  
  return (
    <div className="text-center py-6">
      <p className="mb-4 text-yellow-300">不思議な気配を感じるが、何も見えない...</p>
      <p>先に進もう。</p>
    </div>
  );
};

// Blessing Fountain Component
const BlessingFountain = () => {
  const { applyEventEffect, state } = useGame();
  const { specialEvent } = state;
  
  if (!specialEvent || !specialEvent.options) {
    return null;
  }
  
  return (
    <div className="bg-amber-900/40 rounded-lg p-4 text-center">
      <h3 className="text-xl font-bold text-amber-300 mb-2">祝福の泉を見つけた！</h3>
      <p className="mb-4">神秘的な力があなたを包み込む...</p>
      
      <div className="flex flex-wrap justify-center gap-2">
        {specialEvent.options.map(option => (
          <button 
            key={option.id}
            onClick={() => applyEventEffect(option.id)}
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded shadow transition-colors"
          >
            <span className="font-semibold">{option.name}</span>
            {option.description && (
              <span className="block text-xs text-amber-200 mt-1">
                {option.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Mysterious Merchant Component
const MysteriousMerchant = () => {
  const { applyEventEffect, state } = useGame();
  const { specialEvent } = state;
  
  if (!specialEvent || !specialEvent.options) {
    return null;
  }
  
  return (
    <div className="bg-purple-900/40 rounded-lg p-4 text-center">
      <h3 className="text-xl font-bold text-purple-300 mb-2">謎の商人</h3>
      <p className="mb-4">「良い品を揃えておりますぞ、冒険者よ...」</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {specialEvent.options.map(option => (
          <button 
            key={option.id}
            onClick={() => applyEventEffect(option.id)}
            className="bg-purple-800 hover:bg-purple-700 text-white p-3 rounded shadow flex flex-col items-center justify-between transition-colors"
          >
            <span className="font-semibold text-lg">{option.name}</span>
            {option.cost && (
              <span className="text-amber-300 font-medium">
                {option.cost} {specialEvent.currency?.name || 'G'}
              </span>
            )}
            {option.description && (
              <span className="text-xs text-purple-200 mt-1">
                {option.description}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <p className="text-sm text-purple-200">
        所持{specialEvent.currency?.name || 'ゴールド'}: 
        <span className="text-amber-300 ml-1 font-medium">
          {specialEvent.currency?.amount || 0}
        </span>
      </p>
    </div>
  );
};

// Ancient Shrine Component
const AncientShrine = () => {
  const { applyEventEffect, state } = useGame();
  const { specialEvent } = state;
  
  if (!specialEvent || !specialEvent.options) {
    return null;
  }
  
  return (
    <div className="bg-indigo-900/40 rounded-lg p-4 text-center">
      <h3 className="text-xl font-bold text-indigo-300 mb-2">古代の祭壇</h3>
      <p className="mb-4">古の力が宿る神秘的な祭壇がある。どうする？</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {specialEvent.options.map(option => (
          <button 
            key={option.id}
            onClick={() => applyEventEffect(option.id)}
            className={`p-3 rounded shadow transition-colors ${
              option.id === 'ignore' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : option.id === 'worship'
                  ? 'bg-blue-700 hover:bg-blue-600 text-white'
                  : 'bg-red-700 hover:bg-red-600 text-white'
            }`}
          >
            <span className="font-semibold">{option.name}</span>
            {option.description && (
              <span className="block text-xs mt-1 opacity-80">
                {option.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialEventDisplay;
