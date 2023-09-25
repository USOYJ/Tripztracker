import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;