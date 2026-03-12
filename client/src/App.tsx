import FormDemo from './pages/Form'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thanks from './pages/Thanks';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  

  return (
    <Router>
      <Routes>
        {/* נתיב דף הנחיתה */}
        <Route path="/" element={<FormDemo />} />
        
        {/* נתיב דף התודה וסיום ההרשמה */}
        <Route path="/thanks" element={<Thanks />} />

        {/* נתיב ההתחברות לאדמין */}
        <Route path="/login" element={<Login />} />

        {/* נתיב הדשבורד לאדמין */}
        <Route path="/admin/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  )
}

export default App
