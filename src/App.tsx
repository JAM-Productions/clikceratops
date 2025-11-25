
import { GameProvider } from './context/GameContext';
import { Layout } from './components/Layout/Layout';
import { DinoClicker } from './components/Clicker/DinoClicker';
import { UpgradesPanel } from './components/Upgrades/UpgradesPanel';
import { useGameLoop } from './hooks/useGameLoop';

const GameContent = () => {
  useGameLoop();
  return (
    <Layout>
      <DinoClicker />
      <UpgradesPanel />
    </Layout>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
