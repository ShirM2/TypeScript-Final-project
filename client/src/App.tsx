import './App.css'
import FormDemo from './pages/Form'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thanks from './pages/Thanks';

function App() {
  

  return (
    <Router>
      <Routes>
        {/* נתיב דף הבית - מציג את הטופס */}
        <Route path="/" element={<FormDemo />} />
        
        {/* נתיב דף התודה - כאן תוצג הודעת הסיום */}
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </Router>
  )
}

export default App
