import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from 'Header';
import Footer from 'Footer';
import Wizards from './pages/Wizards';
import Tools from './pages/Tools';
import Deployments from './pages/Deployments';
import Guides from './pages/Guides';
import Home from './pages/Home';
import ERC20Generator from 'ERC20Generator';
import SideNavBar from './components/layout/sideNavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* Main content area: sidebar + main */}
        <div className="flex flex-1">
          <SideNavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wizards" element={<Wizards><ERC20Generator /></Wizards>} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/deployments" element={<Deployments />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;