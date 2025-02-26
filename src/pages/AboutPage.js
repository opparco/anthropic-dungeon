// src/pages/AboutPage.js
import { Link } from 'react-router-dom';
import { statDescriptions, skillDescriptions } from '../utils/game-data';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-sky-400">ゲーム説明</h1>
      
      <div className="bg-indigo-900 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-300">ゲームの目的</h2>
        <p className="mb-4">
          ダンジョンハックはターン制のローグライク・ダンジョン探索RPGです。プレイヤーはダンジョンを探索し、
          モンスターと戦い、宝物を集めながら、できるだけ深い階層まで到達することを目指します。
        </p>
        <p>
          キャラクターは冒険を続けるとレベルアップし、ステータスや特技を強化することができます。
          しかし、HPが0になるとゲームオーバーとなり、最初からやり直しになります。
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-sky-300">ステータス説明</h2>
          <ul className="space-y-3">
            {Object.entries(statDescriptions).map(([key, stat]) => (
              <li key={key} className="border-b border-indigo-700 pb-2">
                <div className="font-medium text-sky-200">{stat.name} ({stat.shortName})</div>
                <div className="text-sm">{stat.description}</div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-indigo-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-sky-300">特技説明</h2>
          <ul className="space-y-3">
            {Object.entries(skillDescriptions).map(([key, skill]) => (
              <li key={key} className="border-b border-indigo-700 pb-2">
                <div className="font-medium text-sky-200">{skill.name}</div>
                <div className="text-sm">{skill.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-indigo-900 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-300">ゲームの流れ</h2>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          <li>ダンジョンの部屋を「探索」して新たな部屋に進みます。</li>
          <li>モンスターが現れたら「攻撃」「魔法」「交渉」のいずれかを選びます。</li>
          <li>宝物を見つけたら、自動的に効果が適用されます。</li>
          <li>「休憩」でHPとMPを回復することができます（敵に襲われる可能性あり）。</li>
          <li>一定数の部屋を攻略すると次の階層へ進むことができます。</li>
          <li>レベルアップすると、ステータスと特技を強化することができます。</li>
        </ol>
        
        <h3 className="text-xl font-semibold mb-3 text-sky-300">特殊イベント</h3>
        <p className="mb-2">探索中にまれに以下の特殊イベントが発生することがあります：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>レアモンスター：強力だが、倒すと多くの経験値を得られます。</li>
          <li>祝福の泉：ステータスが永続的に強化されます。</li>
        </ul>
      </div>
      
      <div className="text-center">
        <Link 
          to="/game" 
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
        >
          ゲームを始める
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
