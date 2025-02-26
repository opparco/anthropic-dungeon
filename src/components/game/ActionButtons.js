// src/components/game/ActionButtons.js
import { useState } from 'react';
import { useGame } from '../../context/GameContext';

const ActionButtons = () => {
  const { 
    state, 
    spawnEnemy, 
    addLog, 
    checkRoll, 
    gainXP, 
    updateCharacter, 
    updateDungeon,
    defeatEnemy,
    negotiateSuccess,
    gameOver,
    checkSpecialEvent,
    nextDungeonLevel
  } = useGame();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const { dungeon, character } = state;
  
  // Helper to determine button disabled states
  const canExplore = !dungeon.enemyPresent && !dungeon.treasurePresent && !isLoading;
  const canRest = !dungeon.enemyPresent && !dungeon.treasurePresent && !isLoading;
  const canAttack = dungeon.enemyPresent && !isLoading;
  const canUseMagic = dungeon.enemyPresent && character.mp >= 5 && !isLoading;
  const canNegotiate = dungeon.enemyPresent && !isLoading;
  const canGoNextLevel = dungeon.clearedRooms >= dungeon.roomsToNextLevel && !dungeon.enemyPresent && !dungeon.treasurePresent && !isLoading;
  
  // Handle exploration
  const handleExplore = () => {
    setIsLoading(true);
    
    // Add a delay to simulate action
    setTimeout(() => {
      // Check for special events first
      if (checkSpecialEvent()) {
        setIsLoading(false);
        return;
      }
      
      // Check for traps
      const trapCheck = Math.random() < 0.2;
      if (trapCheck) {
        handleTrapEncounter();
      } else {
        // No trap, determine room contents
        handleRoomContents();
      }
      
      setIsLoading(false);
    }, 500);
  };
  
  // Handle trap encounter
  const handleTrapEncounter = () => {
    const trapIndex = Math.floor(Math.random() * 3);
    const trapTypes = [
      { name: "落とし穴", difficulty: 8 + dungeon.level, damage: 3 + dungeon.level },
      { name: "毒矢の罠", difficulty: 10 + dungeon.level, damage: 5 + dungeon.level },
      { name: "爆発の魔法陣", difficulty: 12 + dungeon.level, damage: 8 + dungeon.level }
    ];
    
    const trap = trapTypes[trapIndex];
    addLog(`${trap.name}を発見しました！罠回避の判定が必要です。`);
    
    const result = checkRoll(
      character.stats.dex,
      character.skills.trap,
      trap.difficulty
    );
    
    if (result.success) {
      addLog(`罠回避判定成功！罠を回避しました。(${result.roll}を出して合計${result.total})`, 'success');
    } else {
      const damage = trap.damage;
      const newHp = Math.max(0, character.hp - damage);
      
      updateCharacter({ hp: newHp });
      
      addLog(`罠回避判定失敗！${damage}ダメージを受けました。(${result.roll}を出して合計${result.total})`, 'failure');
      
      // Check for game over
      if (newHp <= 0) {
        gameOver();
        return;
      }
    }
    
    // After trap, continue to room contents
    handleRoomContents();
  };
  
  // Handle room contents discovery
  const handleRoomContents = () => {
    const roomType = Math.random();
    
    if (roomType < 0.6) {  // 60% chance for enemy
      // Spawn enemy and show it
      const monster = spawnEnemy();
      addLog(`${monster.name}が現れた！`);
    } else if (roomType < 0.9) {  // 30% chance for treasure
      // Show treasure
      updateDungeon({ treasurePresent: true });
    } else {  // 10% chance for empty room
      addLog("何もない部屋だった。");
      updateDungeon({ 
        clearedRooms: dungeon.clearedRooms + 1 
      });
    }
  };
  
  // Handle rest
  const handleRest = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const hpRecover = Math.floor(character.maxHp * 0.2);
      const mpRecover = Math.floor(character.maxMp * 0.2);
      
      const newHp = Math.min(character.hp + hpRecover, character.maxHp);
      const newMp = Math.min(character.mp + mpRecover, character.maxMp);
      
      updateCharacter({
        hp: newHp,
        mp: newMp
      });
      
      addLog(`休憩しました。HPが${hpRecover}、MPが${mpRecover}回復しました。`, 'success');
      
      // Chance of being ambushed while resting
      if (Math.random() < 0.3) {
        const monster = spawnEnemy();
        addLog(`休憩中に${monster.name}に襲われた！`, 'failure');
      }
      
      setIsLoading(false);
    }, 500);
  };
  
  // Handle attack
  const handleAttack = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (!dungeon.enemyPresent || !dungeon.currentEnemy) {
        setIsLoading(false);
        return;
      }
      
      const enemy = dungeon.currentEnemy;
      
      // Player's attack
      const attackResult = checkRoll(
        character.stats.str,
        character.skills.sword,
        10
      );
      
      let enemyHp = enemy.hp;
      
      if (attackResult.critical) {
        const damage = character.stats.str * 2 + character.skills.sword * 2 - enemy.defense;
        enemyHp = Math.max(0, enemyHp - damage);
        addLog(`クリティカルヒット！${enemy.name}に${damage}ダメージ！`, 'critical');
      } else if (attackResult.success) {
        const damage = Math.max(1, character.stats.str + character.skills.sword - enemy.defense);
        enemyHp = Math.max(0, enemyHp - damage);
        addLog(`攻撃成功！${enemy.name}に${damage}ダメージ！`, 'success');
      } else if (attackResult.fumble) {
        addLog(`ファンブル！攻撃が大きく外れた！`, 'failure');
      } else {
        addLog(`攻撃が外れた！`, 'failure');
      }
      
      // Update enemy HP
      updateDungeon({ 
        currentEnemy: { 
          ...enemy, 
          hp: enemyHp 
        } 
      });
      
      // Enemy defeated?
      if (enemyHp <= 0) {
        defeatEnemy();
        setIsLoading(false);
        return;
      }
      
      // Enemy's counterattack
      const defenseResult = checkRoll(
        character.stats.dex,
        character.skills.sword,
        10
      );
      
      if (defenseResult.success) {
        addLog(`${enemy.name}の攻撃を回避した！`, 'success');
      } else {
        const damage = Math.max(1, enemy.attack - Math.floor(character.stats.str / 2));
        const newHp = Math.max(0, character.hp - damage);
        
        updateCharacter({ hp: newHp });
        
        addLog(`${enemy.name}の攻撃で${damage}ダメージを受けた！`, 'failure');
        
        if (newHp <= 0) {
          gameOver();
          setIsLoading(false);
          return;
        }
      }
      
      setIsLoading(false);
    }, 500);
  };
  
  // Handle magic
  const handleMagic = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (!dungeon.enemyPresent || !dungeon.currentEnemy || character.mp < 5) {
        setIsLoading(false);
        return;
      }
      
      const mpCost = 5;
      updateCharacter({ mp: character.mp - mpCost });
      
      const enemy = dungeon.currentEnemy;
      
      // Magic attack
      const magicResult = checkRoll(
        character.stats.int,
        character.skills.magic,
        10
      );
      
      let enemyHp = enemy.hp;
      
      if (magicResult.critical) {
        const damage = character.stats.int * 2 + character.skills.magic * 2;
        enemyHp = Math.max(0, enemyHp - damage);
        addLog(`クリティカル魔法！${enemy.name}に${damage}ダメージ！`, 'critical');
      } else if (magicResult.success) {
        const damage = character.stats.int + character.skills.magic;
        enemyHp = Math.max(0, enemyHp - damage);
        addLog(`魔法攻撃が命中！${enemy.name}に${damage}ダメージ！`, 'success');
      } else if (magicResult.fumble) {
        const damage = Math.floor(character.stats.int / 2);
        const newHp = Math.max(0, character.hp - damage);
        
        updateCharacter({ hp: newHp });
        
        addLog(`ファンブル！魔法が暴走して自分に${damage}ダメージ！`, 'failure');
        
        if (newHp <= 0) {
          gameOver();
          setIsLoading(false);
          return;
        }
      } else {
        addLog(`魔法が失敗した！`, 'failure');
      }
      
      // Update enemy HP
      updateDungeon({ 
        currentEnemy: { 
          ...enemy, 
          hp: enemyHp 
        } 
      });
      
      // Enemy defeated?
      if (enemyHp <= 0) {
        defeatEnemy();
        setIsLoading(false);
        return;
      }
      
      // Enemy's counterattack
      const defenseResult = checkRoll(
        character.stats.dex,
        character.skills.trap,
        10
      );
      
      if (defenseResult.success) {
        addLog(`${enemy.name}の攻撃を回避した！`, 'success');
      } else {
        const damage = Math.max(1, enemy.attack - Math.floor(character.stats.int / 3));
        const newHp = Math.max(0, character.hp - damage);
        
        updateCharacter({ hp: newHp });
        
        addLog(`${enemy.name}の攻撃で${damage}ダメージを受けた！`, 'failure');
        
        if (newHp <= 0) {
          gameOver();
          setIsLoading(false);
          return;
        }
      }
      
      setIsLoading(false);
    }, 500);
  };
  
  // Handle negotiation
  const handleNegotiate = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (!dungeon.enemyPresent || !dungeon.currentEnemy) {
        setIsLoading(false);
        return;
      }
      
      const enemy = dungeon.currentEnemy;
      
      // Negotiation check
      const negotiationResult = checkRoll(
        character.stats.mnd,
        character.skills.negotiation,
        10 + Math.floor(enemy.attack / 2)
      );
      
      if (negotiationResult.critical) {
        // Critical success
        addLog(`クリティカル交渉！${enemy.name}が味方になった！`, 'critical');
        
        negotiateSuccess(2);
      } else if (negotiationResult.success) {
        // Success
        addLog(`交渉成功！${enemy.name}は去っていった。`, 'success');
        
        negotiateSuccess(4);
      } else {
        // Failure - enemy attacks
        addLog(`交渉失敗！${enemy.name}は怒っている！`, 'failure');
        
        const damage = Math.max(1, enemy.attack - Math.floor(character.stats.mnd / 3));
        const newHp = Math.max(0, character.hp - damage);
        
        updateCharacter({ hp: newHp });
        
        addLog(`${enemy.name}の攻撃で${damage}ダメージを受けた！`, 'failure');
        
        if (newHp <= 0) {
          gameOver();
          setIsLoading(false);
          return;
        }
      }
      
      setIsLoading(false);
    }, 500);
  };
  
  // Handle next dungeon level
  const handleNextLevel = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      nextDungeonLevel();
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
      <button
        onClick={handleExplore}
        disabled={!canExplore}
        className={`py-2 px-4 rounded font-medium ${
          canExplore 
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
            : 'bg-indigo-900 text-indigo-400 cursor-not-allowed'
        } transition-colors`}
      >
        探索する
      </button>
      
      <button
        onClick={handleRest}
        disabled={!canRest}
        className={`py-2 px-4 rounded font-medium ${
          canRest 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-indigo-900 text-indigo-400 cursor-not-allowed'
        } transition-colors`}
      >
        休憩する
      </button>
      
      <button
        onClick={handleAttack}
        disabled={!canAttack}
        className={`py-2 px-4 rounded font-medium ${
          canAttack 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-indigo-900 text-indigo-400 cursor-not-allowed'
        } transition-colors`}
      >
        攻撃
      </button>
      
      <button
        onClick={handleMagic}
        disabled={!canUseMagic}
        className={`py-2 px-4 rounded font-medium ${
          canUseMagic 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-indigo-900 text-indigo-400 cursor-not-allowed'
        } transition-colors`}
      >
        魔法
      </button>
      
      <button
        onClick={handleNegotiate}
        disabled={!canNegotiate}
        className={`py-2 px-4 rounded font-medium ${
          canNegotiate 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'bg-indigo-900 text-indigo-400 cursor-not-allowed'
        } transition-colors`}
      >
        交渉
      </button>
      
      <button
        onClick={handleNextLevel}
        disabled={!canGoNextLevel}
        className={`py-2 px-4 rounded font-medium ${
          canGoNextLevel 
            ? 'bg-amber-600 hover:bg-amber-700 text-white' 
            : 'bg-indigo-900 text-indigo-400 cursor-not-allowed'
        } transition-colors`}
      >
        次の階層へ
      </button>
    </div>
  );
};

export default ActionButtons;
