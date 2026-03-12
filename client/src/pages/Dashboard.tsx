import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
    // לרשימת הנרשמים State נגדיר
    const [users, setUsers] = useState<any[]>([]);

    // פונקציה למשיכת הנתונים מהשרת
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // נקרא לנתיב
                const resp = await axios.get("http://localhost:3000/admin/users");
                setUsers(resp.data); // נשמור את המידע ברשימה
            } catch (err) {
                console.error("שגיאה במשיכת נתונים:", err);
            }
        };
        fetchUsers();
    }, []);

    // Tailwind -משתני עיצוב ל
    const containerClasses = "p-8 bg-gray-100 min-h-screen font-sans";
    const tableContainerClasses = "bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200";
    const headerClasses = "bg-gray-800 text-white text-right";
    const thClasses = "px-6 py-4 font-bold uppercase text-sm";
    const tdClasses = "px-6 py-4 border-b border-gray-200 text-sm text-gray-700";
    const rowClasses = "hover:bg-blue-50 transition-colors duration-200";

    return (
        <div className={containerClasses} dir="rtl">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900 border-b-4 border-blue-600 inline-block pb-2">
                ניהול נרשמים למערכת
            </h1>

            <div className={tableContainerClasses}>
                {/* נגדיר טבלה */}
                <table className="min-w-full leading-normal">
                    <thead>
                        {/* עמודות הטבלה */}
                        <tr className={headerClasses}>
                            <th className={thClasses}>שם פרטי</th>
                            <th className={thClasses}>שם משפחה</th>
                            <th className={thClasses}>אימייל</th>
                            <th className={thClasses}>טלפון</th>
                            <th className={thClasses}>תחום לימודים</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* נשלוף את המידע מהמשתמשים ששמרנו */}
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className={rowClasses}>
                                    <td className={tdClasses}>{user.firstName}</td>
                                    <td className={tdClasses}>{user.lastName}</td>
                                    <td className={tdClasses}>{user.email}</td>
                                    <td className={tdClasses}>{user.phone}</td>
                                    <td className={tdClasses}>{user.studyField}</td>
                                </tr>
                            ))
                        ) : (
                            // במידה ואין משתמשים נחזיר את זה
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                                    אין כרגע נרשמים להצגה...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;