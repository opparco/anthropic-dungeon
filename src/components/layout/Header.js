// src/components/layout/Header.js
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-indigo-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-sky-400 tracking-wide">
            <Link to="/" className="hover:text-sky-300 transition-colors">
              ダンジョンハック
            </Link>
          </h1>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`${location.pathname === '/' ? 'text-sky-400' : 'text-indigo-200'} hover:text-sky-300 transition-colors`}
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link 
                  to="/game" 
                  className={`${location.pathname === '/game' ? 'text-sky-400' : 'text-indigo-200'} hover:text-sky-300 transition-colors`}
                >
                  ゲーム
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`${location.pathname === '/about' ? 'text-sky-400' : 'text-indigo-200'} hover:text-sky-300 transition-colors`}
                >
                  ゲーム説明
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
