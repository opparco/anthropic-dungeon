// src/components/game/CharacterCreator.js
import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';

const CharacterCreator = () => {
  const { updateCharacter, addLog, resetGame } = useGame();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    background: null,
    physique: null,
    personality: null,
    education: null
  });
  const [characterSummary, setCharacterSummary] = useState('');
  
  // Character creation options with their stat effects
  const creationOptions = {
    background: [
      { id: 'noble', name: '貴族の子', description: '裕福な家庭で育ち、最高の教育を受けた。', 
        effect: { stats: { int: 1, mnd: 1 }, skills: { magic: 1, negotiation: 1 } },
        story: 'あなたは名家の血を引き、幼い頃から最高の教師に学問を教わってきた。しかし、家族の期待とは裏腹に、あなたは冒険に憧れていた。' },
      { id: 'warrior', name: '兵士の家系', description: '代々兵士の家系で、幼い頃から武術を学んだ。', 
        effect: { stats: { str: 1, dex: 1 }, skills: { sword: 1, trap: 1 } },
        story: '剣を持つ前に歩くことを覚えたと言われるほど、あなたは武術と共に育った。家族の誇りと伝統を胸に、今、あなたは自らの強さを証明するため旅立つ。' },
      { id: 'villager', name: '村の出身', description: '小さな村で育ち、自然と共に生きる知恵を学んだ。', 
        effect: { stats: { str: 1, mnd: 1 }, skills: { search: 1, negotiation: 1 } },
        story: '静かな村で質素に暮らしてきたあなたは、村人たちの知恵と自然の摂理を学んだ。噂に聞くダンジョンの財宝で、村を豊かにしたいという夢を抱いている。' },
      { id: 'orphan', name: '孤児', description: '身寄りがなく、自らの力で生き抜いてきた。', 
        effect: { stats: { dex: 1, mnd: 1 }, skills: { trap: 1, search: 1 } },
        story: '誰にも頼らず、街の隅々で生き抜く術を身につけたあなた。他人からの同情よりも、自分の腕一本で運命を切り開く力を信じている。' }
    ],
    physique: [
      { id: 'strong', name: '頑強', description: '鍛え上げられた体格で、重い装備も難なく扱える。', 
        effect: { stats: { str: 2 }, maxHp: 5 },
        story: '長年の肉体労働か厳しい鍛錬か、あなたの体は岩のように堅く、鋼のように強い。困難な試練も、その体一つで乗り越えてきた。' },
      { id: 'agile', name: '俊敏', description: '素早い動きが得意で、危険を察知する能力に優れている。', 
        effect: { stats: { dex: 2 }, skills: { trap: 1 } },
        story: '風のように素早く、猫のように静かに動くあなた。敵の攻撃をかわし、罠を避ける瞬発力は天性のものだ。' },
      { id: 'intelligent', name: '聡明', description: '鋭い知性を持ち、魔法の才能がある。', 
        effect: { stats: { int: 2 }, maxMp: 5 },
        story: '星々の謎を解き明かすような鋭い知性を持つあなた。魔法の原理を直感的に理解し、その力を引き出す才能に溢れている。' },
      { id: 'balanced', name: 'バランス', description: '特筆すべき特徴はないが、全体的にバランスが取れている。', 
        effect: { stats: { str: 1, dex: 1, int: 1, mnd: 1 } },
        story: '一芸に秀でるわけではないが、あらゆる状況に対応できる柔軟性をもつあなた。調和のとれた心身は、長い冒険の強い味方となるだろう。' }
    ],
    personality: [
      { id: 'brave', name: '勇敢', description: '恐れを知らず、困難に立ち向かう勇気がある。', 
        effect: { stats: { str: 1 }, skills: { sword: 1 } },
        story: '恐怖を感じても、それに支配されることなく前に進むあなた。その不屈の精神は、戦場でも冒険でも、あなたを勝利へと導く。' },
      { id: 'cautious', name: '慎重', description: '行動の前に考え、危険を避ける判断力がある。', 
        effect: { stats: { mnd: 1 }, skills: { trap: 1 } },
        story: '一歩進む前に、十の可能性を考えるあなた。その慎重さは時に遅さと見なされるが、致命的な危険から身を守る賢明さでもある。' },
      { id: 'curious', name: '好奇心', description: '新しいことを学ぶのが好きで、探索を楽しむ。', 
        effect: { stats: { int: 1 }, skills: { search: 1 } },
        story: '世界の謎に魅了され、知識を渇望するあなた。その好奇心は時に危険を招くこともあるが、冒険者として最も価値ある資質かもしれない。' },
      { id: 'charismatic', name: '人心掌握', description: '人々を魅了し、説得する才能がある。', 
        effect: { stats: { mnd: 1 }, skills: { negotiation: 1 } },
        story: '言葉一つで人々の心を動かすあなた。その魅力的な人柄は、敵対者さえも味方に変える不思議な力を持っている。' }
    ],
    education: [
      { id: 'combat', name: '戦闘訓練', description: '軍や傭兵団で実戦的な戦い方を学んだ。', 
        effect: { skills: { sword: 2 } },
        story: '血と汗にまみれた訓練場で、戦いの技術を叩き込まれたあなた。その経験は教科書では得られない、生き抜くための実践的な知恵となっている。' },
      { id: 'arcane', name: '魔法学院', description: '魔法の理論と実践を専門的に学んだ。', 
        effect: { skills: { magic: 2 } },
        story: '古代から伝わる魔法の秘密を解き明かすため、多くの時間を魔法書と向き合い過ごしてきた。その知識は今、あなたの力となっている。' },
      { id: 'survival', name: '野外生活', description: '自然の中で生き抜く術を身につけた。', 
        effect: { skills: { search: 1, trap: 1 } },
        story: '荒野の過酷な環境で、自然と共存する術を学んだあなた。食べられる植物を見分け、獲物を追跡し、危険を察知する能力は本能のように鋭い。' },
      { id: 'street', name: '街の知恵', description: '都市の裏社会で処世術を学んだ。', 
        effect: { skills: { negotiation: 1, trap: 1 } },
        story: '都市の喧騒と陰謀の中で育ち、人の心を読み、危険を回避する術を身につけたあなた。その経験は、ダンジョンの暗闇でも役立つだろう。' }
    ]
  };
  
  // Apply selected options to create a character
  const finalizeCharacter = () => {
    // Start with base stats
    const newCharacter = {
      name: characterName || '無名の冒険者',
      hp: 30,
      maxHp: 30,
      mp: 20,
      maxMp: 20,
      stats: {
        str: 3,
        dex: 3,
        int: 3,
        mnd: 3
      },
      skills: {
        sword: 1,
        magic: 1,
        trap: 1,
        search: 1,
        negotiation: 1
      },
      xp: 0,
      level: 1,
      statPoints: 0,
      skillPoints: 0
    };
    
    // Apply effects from each selected option
    Object.values(selectedOptions).forEach(option => {
      if (!option) return;
      
      if (option.effect.stats) {
        Object.entries(option.effect.stats).forEach(([stat, value]) => {
          newCharacter.stats[stat] += value;
        });
      }
      
      if (option.effect.skills) {
        Object.entries(option.effect.skills).forEach(([skill, value]) => {
          newCharacter.skills[skill] += value;
        });
      }
      
      if (option.effect.maxHp) {
        newCharacter.maxHp += option.effect.maxHp;
        newCharacter.hp += option.effect.maxHp;
      }
      
      if (option.effect.maxMp) {
        newCharacter.maxMp += option.effect.maxMp;
        newCharacter.mp += option.effect.maxMp;
      }
    });
    
    // Create character story
    const background = selectedOptions.background;
    const physique = selectedOptions.physique;
    const personality = selectedOptions.personality;
    const education = selectedOptions.education;
    
    const story = `${background.story} ${physique.story} ${personality.story} ${education.story} そして今、伝説となる冒険の第一歩を踏み出そうとしている。`;
    
    setCharacterSummary(story);
    
    // Update character in game context
    updateCharacter(newCharacter);
    
    // Save character name to localStorage
    if (characterName) {
      localStorage.setItem('dungeonHackCharacterName', characterName);
    }
    
    addLog(`${newCharacter.name}が冒険を始めました！`, 'success');
    
    // Move to final step
    setStep(5);
  };
  
  // Handle option selection
  const selectOption = (category, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [category]: option
    });
  };
  
  // Check if can proceed to next step
  const canProceed = () => {
    switch (step) {
      case 0: // Name input (optional)
        return true;
      case 1: // Background
        return selectedOptions.background !== null;
      case 2: // Physique
        return selectedOptions.physique !== null;
      case 3: // Personality
        return selectedOptions.personality !== null;
      case 4: // Education
        return selectedOptions.education !== null;
      default:
        return true;
    }
  };
  
  // Handle next step
  const handleNext = () => {
    if (canProceed()) {
      if (step === 4) {
        finalizeCharacter();
      } else {
        setStep(step + 1);
      }
    }
  };
  
  // Start the game after character creation
  const startGame = () => {
    navigate('/game');
  };
  
  // Render option cards
  const renderOptions = (category) => {
    return creationOptions[category].map(option => (
      <div 
        key={option.id}
        onClick={() => selectOption(category, option)}
        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
          selectedOptions[category] && selectedOptions[category].id === option.id
            ? 'bg-indigo-600 shadow-lg scale-105'
            : 'bg-indigo-800 hover:bg-indigo-700'
        }`}
      >
        <h3 className="font-semibold text-lg mb-2">{option.name}</h3>
        <p className="text-sm mb-3">{option.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          {option.effect.stats && Object.entries(option.effect.stats).map(([stat, value]) => (
            <div key={stat} className="bg-indigo-900/60 rounded px-2 py-1">
              {getStatName(stat)} +{value}
            </div>
          ))}
          
          {option.effect.skills && Object.entries(option.effect.skills).map(([skill, value]) => (
            <div key={skill} className="bg-indigo-900/60 rounded px-2 py-1">
              {getSkillName(skill)} +{value}
            </div>
          ))}
          
          {option.effect.maxHp && (
            <div className="bg-red-900/60 rounded px-2 py-1">
              最大HP +{option.effect.maxHp}
            </div>
          )}
          
          {option.effect.maxMp && (
            <div className="bg-blue-900/60 rounded px-2 py-1">
              最大MP +{option.effect.maxMp}
            </div>
          )}
        </div>
      </div>
    ));
  };
  
  // Helper function to get stat name
  const getStatName = (stat) => {
    const statNames = {
      str: '筋力',
      dex: '敏捷',
      int: '知力',
      mnd: '精神'
    };
    return statNames[stat] || stat;
  };
  
  // Helper function to get skill name
  const getSkillName = (skill) => {
    const skillNames = {
      sword: '剣術',
      magic: '魔法',
      trap: '罠回避',
      search: '探索',
      negotiation: '交渉'
    };
    return skillNames[skill] || skill;
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="bg-indigo-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">冒険者の名前</h2>
            <p className="mb-4">あなたの名前を教えてください。この名前はダンジョンに語り継がれるでしょう。</p>
            
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="名前を入力（省略可能）"
              className="w-full p-2 bg-indigo-800 border border-indigo-600 rounded mb-4 text-white"
            />
            
            <div className="text-sm text-indigo-300 italic mb-4">
              名前を入力しない場合は「無名の冒険者」として冒険を始めます。
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="bg-indigo-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">生い立ち</h2>
            <p className="mb-4">あなたはどのような環境で育ちましたか？</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderOptions('background')}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="bg-indigo-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">体格</h2>
            <p className="mb-4">あなたはどのような身体的特徴を持っていますか？</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderOptions('physique')}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="bg-indigo-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">性格</h2>
            <p className="mb-4">あなたはどのような性格をしていますか？</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderOptions('personality')}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="bg-indigo-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">学び</h2>
            <p className="mb-4">冒険に出る前、あなたはどのようなことを学んできましたか？</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderOptions('education')}
            </div>
          </div>
        );
        
      case 5:
        // Final summary
        return (
          <div className="bg-indigo-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-sky-300">キャラクター完成</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-amber-300">
                {characterName || '無名の冒険者'}
              </h3>
              
              <p className="mb-4 leading-relaxed italic text-indigo-200">
                {characterSummary}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium mb-2 text-sky-200">ステータス</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex justify-between">
                    <span>筋力 (STR)</span>
                    <span className="font-medium">{3 + 
                      (selectedOptions.background?.effect?.stats?.str || 0) + 
                      (selectedOptions.physique?.effect?.stats?.str || 0) + 
                      (selectedOptions.personality?.effect?.stats?.str || 0) + 
                      (selectedOptions.education?.effect?.stats?.str || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>敏捷 (DEX)</span>
                    <span className="font-medium">{3 + 
                      (selectedOptions.background?.effect?.stats?.dex || 0) + 
                      (selectedOptions.physique?.effect?.stats?.dex || 0) + 
                      (selectedOptions.personality?.effect?.stats?.dex || 0) + 
                      (selectedOptions.education?.effect?.stats?.dex || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>知力 (INT)</span>
                    <span className="font-medium">{3 + 
                      (selectedOptions.background?.effect?.stats?.int || 0) + 
                      (selectedOptions.physique?.effect?.stats?.int || 0) + 
                      (selectedOptions.personality?.effect?.stats?.int || 0) + 
                      (selectedOptions.education?.effect?.stats?.int || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>精神 (MND)</span>
                    <span className="font-medium">{3 + 
                      (selectedOptions.background?.effect?.stats?.mnd || 0) + 
                      (selectedOptions.physique?.effect?.stats?.mnd || 0) + 
                      (selectedOptions.personality?.effect?.stats?.mnd || 0) + 
                      (selectedOptions.education?.effect?.stats?.mnd || 0)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-sky-200">特技</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex justify-between">
                    <span>剣術</span>
                    <span className="font-medium">{1 + 
                      (selectedOptions.background?.effect?.skills?.sword || 0) + 
                      (selectedOptions.physique?.effect?.skills?.sword || 0) + 
                      (selectedOptions.personality?.effect?.skills?.sword || 0) + 
                      (selectedOptions.education?.effect?.skills?.sword || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>魔法</span>
                    <span className="font-medium">{1 + 
                      (selectedOptions.background?.effect?.skills?.magic || 0) + 
                      (selectedOptions.physique?.effect?.skills?.magic || 0) + 
                      (selectedOptions.personality?.effect?.skills?.magic || 0) + 
                      (selectedOptions.education?.effect?.skills?.magic || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>罠回避</span>
                    <span className="font-medium">{1 + 
                      (selectedOptions.background?.effect?.skills?.trap || 0) + 
                      (selectedOptions.physique?.effect?.skills?.trap || 0) + 
                      (selectedOptions.personality?.effect?.skills?.trap || 0) + 
                      (selectedOptions.education?.effect?.skills?.trap || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>探索</span>
                    <span className="font-medium">{1 + 
                      (selectedOptions.background?.effect?.skills?.search || 0) + 
                      (selectedOptions.physique?.effect?.skills?.search || 0) + 
                      (selectedOptions.personality?.effect?.skills?.search || 0) + 
                      (selectedOptions.education?.effect?.skills?.search || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>交渉</span>
                    <span className="font-medium">{1 + 
                      (selectedOptions.background?.effect?.skills?.negotiation || 0) + 
                      (selectedOptions.physique?.effect?.skills?.negotiation || 0) + 
                      (selectedOptions.personality?.effect?.skills?.negotiation || 0) + 
                      (selectedOptions.education?.effect?.skills?.negotiation || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={startGame}
                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
              >
                冒険を始める
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Render navigation
  const renderNavigation = () => {
    if (step === 5) return null;
    
    return (
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => step > 0 && setStep(step - 1)}
          disabled={step === 0}
          className={`py-2 px-4 rounded ${
            step === 0
              ? 'bg-indigo-900 text-indigo-700 cursor-not-allowed'
              : 'bg-indigo-700 hover:bg-indigo-600 text-white'
          }`}
        >
          戻る
        </button>
        
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4].map(num => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full ${
                num === step
                  ? 'bg-sky-400'
                  : num < step
                    ? 'bg-indigo-500'
                    : 'bg-indigo-800'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`py-2 px-4 rounded ${
            canProceed()
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
              : 'bg-indigo-900 text-indigo-700 cursor-not-allowed'
          }`}
        >
          {step === 4 ? '完成' : '次へ'}
        </button>
      </div>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-400">キャラクター作成</h1>
      
      {renderStepContent()}
      {renderNavigation()}
    </div>
  );
};

export default CharacterCreator;
