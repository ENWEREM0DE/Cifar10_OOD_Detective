import './App.css'
import Navbar from './components/Navbar'
import CaseFiles from './components/CaseFiles'
import UsualSuspects from './components/UsualSuspects'
import InterrogateImage from './components/InterrogateImage'

function App() {
  return (
    <div className="position: relative bg-[#F5F5DC]" style={{ width: '100%', margin: 0, padding: 0 }}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <CaseFiles />
        <UsualSuspects />
        <InterrogateImage />
      </main>
    </div>
  )
}

export default App
