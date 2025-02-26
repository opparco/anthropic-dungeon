// src/components/game/GameLog.js
import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';

const GameLog = () => {
  const { state } = useGame();
  const logEndRef = useRef(null);
  
  // Auto-scroll to bottom when log updates
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.gameLog]);
  
  return (
    <div className="bg-indigo-900 rounded-lg shadow-lg overflow-hidden">
      <h3 className="text-lg font-semibold bg-indigo-800 py-2 px-4 text-sky-300">
        ゲームログ
      </h3>
      
      <div className="h-40 overflow-y-auto p-4 bg-indigo-950/50">
        {state.gameLog.map((log, index) => (
          <div 
            key={index} 
            className={`mb-1 pb-1 border-b border-indigo-800 ${log.className}`}
          >
            {log.text}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default GameLog;
