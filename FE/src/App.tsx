import './App.css'
import ERC20Generator from 'ERC20Generator'
import Header from 'Header'
import Footer from 'Footer'

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