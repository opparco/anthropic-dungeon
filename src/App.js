// src/App.js
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import GameOverPage from './pages/GameOverPage';
import AboutPage from './pages/AboutPage';

// Create the router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'game',
        element: <GamePage />
      },
      {
        path: 'game-over',
        element: <GameOverPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

function App() {
  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  );
}

export default App;
