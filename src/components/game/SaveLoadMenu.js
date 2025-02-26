// src/components/game/SaveLoadMenu.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { getSaveDateTime } from '../../utils/SaveLoadSystem';

const SaveLoadMenu = ({ onClose }) => {
  const { saveGame, loadSavedGame, hasSavedGame, deleteSavedGame, resetGame } = useGame();
  const [saveDate, setSaveDate] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // セーブデータの日時を取得
  useEffect(() => {
    const savedAt = getSaveDateTime();
    if (savedAt) {
      const date = new Date(savedAt);
      setSaveDate(date.toLocaleString());
    }
  }, []);

  // セーブ機能
  const handleSave = () => {
    const success = saveGame();
    if (success) {
      setMessage({ text: "ゲームを保存しました！", type: "success" });
      // セーブ日時を更新
      const savedAt = getSaveDateTime();
      if (savedAt) {
        const date = new Date(savedAt);
        setSaveDate(date.toLocaleString());
      }
    } else {
      setMessage({ text: "保存に失敗しました。", type: "error" });
    }
  };

  // ロード機能
  const handleLoad = () => {
    if (hasSavedGame()) {
      const success = loadSavedGame();
      if (success) {
        setMessage({ text: "ゲームをロードしました！", type: "success" });
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setMessage({ text: "ロードに失敗しました。", type: "error" });
      }
    } else {
      setMessage({ text: "セーブデータがありません。", type: "error" });
    }
  };

  // データ削除の確認
  const handleConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  // 削除実行
  const handleDelete = () => {
    deleteSavedGame();
    setSaveDate(null);
    setShowConfirmDelete(false);
    setMessage({ text: "セーブデータを削除しました。", type: "success" });
  };

  // 新規ゲーム開始
  const handleNewGame = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-indigo-900 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-sky-300 text-center">セーブ/ロードメニュー</h2>

        {/* メッセージ表示 */}
        {message && (
          <div 
            className={`mb-4 p-3 rounded ${
              message.type === 'success' ? 'bg-green-800' : 'bg-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* セーブデータ情報 */}
        <div className="mb-6 p-4 bg-indigo-800 rounded">
          <h3 className="text-lg font-semibold mb-2 text-sky-200">セーブデータ</h3>
          {saveDate ? (
            <p>最終保存日時: <span className="text-amber-300">{saveDate}</span></p>
          ) : (
            <p>保存されたデータはありません</p>
          )}
        </div>

        {/* ボタン群 */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition-colors"
          >
            現在の状態を保存
          </button>
          
          <button
            onClick={handleLoad}
            disabled={!saveDate}
            className={`py-2 px-4 font-medium rounded transition-colors ${
              saveDate
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-indigo-900 text-indigo-700 cursor-not-allowed'
            }`}
          >
            保存したゲームをロード
          </button>
          
          <button
            onClick={handleNewGame}
            className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded transition-colors"
          >
            新しいゲームを始める
          </button>
          
          {showConfirmDelete ? (
            <div className="p-3 bg-red-900 rounded">
              <p className="mb-2">本当に削除しますか？</p>
              <div className="flex justify-between">
                <button
                  onClick={handleDelete}
                  className="py-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  削除する
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="py-1 px-3 bg-gray-600 hover:bg-gray-700 text-white rounded"
                >
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleConfirmDelete}
              disabled={!saveDate}
              className={`py-2 px-4 font-medium rounded transition-colors ${
                saveDate
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-indigo-900 text-indigo-700 cursor-not-allowed'
              }`}
            >
              セーブデータを削除
            </button>
          )}
        </div>

        {/* 閉じるボタン */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-indigo-800 hover:bg-indigo-700 text-white rounded transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveLoadMenu;
