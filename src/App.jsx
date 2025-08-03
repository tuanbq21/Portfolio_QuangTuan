import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import RotatingCursor from './components/ui/RotatingCursor'
import Photos from './pages/Photos/Photos'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer'
import { useScrollToTop } from './hooks/useScrollToTop'

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary-dark">
        <RotatingCursor
          size={30}
          dotSize={12}
          cornerSize={8}
          color="#64ffda"
          rotationSpeed={1.5}
          hoverScale={1.3}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path= "/photos" element={<Photos />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
