import './App.css'
import ERC20Generator from './components/erc20Generator/ERC20Generator.tsx'
import Header from './components/layout/Header.tsx'
import Footer from './components/layout/Footer.tsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ERC20Generator />
      </main>
      <Footer />
    </div>
  )
}

export default App