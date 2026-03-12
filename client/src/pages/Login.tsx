import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {
        // נשלח את הנתונים לשרת (נבנה את הנתיב הזה בשרת מיד אחרי)
        const resp = await axios.post("http://localhost:3000/admin/login", { username, password });
        
        if (resp.status === 200) {
            // שומרים אישור זמני שהתחברנו בהצלחה
            localStorage.setItem("adminAuth", "true");
            // מעבר לדף הניהול (שניצור בהמשך)
            navigate("/admin/dashboard");
        }

        } catch (err: any) {
        alert("שם משתמש או סיסמה שגויים");
        console.error(err);
        }
    };

    // Tailwind -משתני עיצוב ל
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white text-gray-900 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";
    const labelClasses = "block text-sm font-medium text-gray-700";
    const buttonClasses = "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150";

    return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">כניסת מנהל מערכת</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClasses}>שם משתמש</label>
            <input
                type="text" 
                required
                className={inputClasses}
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                />
          </div>

          <div>
            <label className={labelClasses}>סיסמה</label>
            <input
              type="password"
              required
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={buttonClasses}
          >
            התחברות
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;