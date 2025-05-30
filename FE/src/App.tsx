import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from 'Header';
import Footer from 'Footer';
import Wizards from './pages/Wizards';
import Tools from './pages/Tools';
import Deployments from './pages/Deployments';
import Guides from './pages/Guides';
import Home from './pages/Home';
import ERC20Generator from 'ERC20Generator';
import SideNavBar from './components/layout/sideNavBar';
import Settings from './pages/Settings';
import NFT from './pages/NFT';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/wizards" element={<Wizards />}>
          <Route path="erc20" element={<ERC20Generator />} />
          <Route path="nft" element={<NFT />} />
        </Route>
        <Route path="/tools" element={<Tools />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* Main content area: sidebar + main */}
        <div className="flex flex-1">
          <SideNavBar />
          <main className="flex-grow pt-20 pb-20">
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;