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
            
            const token = resp.data.token;
            
            // שמירת הטוקן בזיכרון של הדפדפן
            localStorage.setItem("adminToken", token);

            // מעבר לדף הניהול (שניצור בהמשך)
            navigate("/admin/dashboard");
        }

        } catch (err: any) {
        alert("שם משתמש או סיסמה שגויים");
        console.error(err);
        }
    };

    // Tailwind - משתני עיצוב מעודכנים שמתאימים לשפה של הטופס הקודם
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white/90 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right";
    const labelClasses = "block text-sm font-bold text-slate-700 text-right";
    const buttonClasses = "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 transition-all active:scale-[0.98]";

    return (
        <div className="relative min-h-screen py-12 px-4 overflow-hidden flex items-center justify-center font-sans" dir="rtl">
            
            {/* שכבת הרקע המטושטשת - אותה תמונה ואותם אפקטים */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: "url('https://www.ariel.ac.il/wp/wp-content/uploads/2025/08/%D7%90%D7%95%D7%A0%D7%99%D7%91%D7%A8%D7%A1%D7%99%D7%98%D7%AA-%D7%90%D7%A8%D7%99%D7%90%D7%9C-%D7%AA%D7%9E%D7%95%D7%A0%D7%AA-%D7%A8%D7%97%D7%A3--768x576.jpg')", 
                    filter: "blur(5px) brightness(0.7)", 
                    transform: "scale(1.1)" 
                }}
            ></div>

            {/* שכבת כיסוי כהה עדינה */}
            <div className="absolute inset-0 w-full h-full bg-black/20"></div>

            {/* כרטיס ההתחברות */}
            <div className="relative z-10 max-w-md w-full bg-white/95 rounded-xl shadow-2xl p-8 border border-white/20 backdrop-blur-sm">
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-extrabold text-blue-900">כניסת מנהל מערכת</h2>
                    <div className="h-1 w-12 bg-orange-500 mx-auto mt-2 rounded-full"></div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={labelClasses}>שם משתמש</label>
                        <input
                            type="text" 
                            required
                            className={inputClasses}
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="הזן שם משתמש"
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
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className={buttonClasses}
                    >
                        התחברות למערכת
                    </button>
                </form>

                <p className="text-[10px] text-slate-400 text-center mt-8 uppercase tracking-widest">
                    Secure Admin Access • Ariel University
                </p>
            </div>
        </div>
    );
};

export default Login;