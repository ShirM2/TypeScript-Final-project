import FormDemo from './pages/Form'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thanks from './pages/Thanks';
import Login from './pages/Login';
import './App.css';

function App() {
  

  return (
    <Router>
      <Routes>
        {/* נתיב דף הבית - מציג את הטופס */}
        <Route path="/" element={<FormDemo />} />
        
        {/* נתיב דף התודה - כאן תוצג הודעת הסיום */}
        <Route path="/thanks" element={<Thanks />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
