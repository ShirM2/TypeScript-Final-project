import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper
} from '@tanstack/react-table';

// הגדרת טיפוס הנתונים לנרשם
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studyField: string;
    createdAt: string;
}
// כלי שעוזר להגדיר את העמודות בצורה יותר נוחה
const columnHelper = createColumnHelper<User>();

const Dashboard: React.FC = () => {
    // לרשימת הנרשמים State נגדיר
    const [users, setUsers] = useState<User[]>([]);

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

    // פונקציה שמסדרת את התאריך והשעה לזמן ישראל ובפורמט מסודר
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // CSV פונקציה להורדת נתוני הנרשמים לקובץ
    const downloadCSV = () => {

        // נבדוק את האורך של הרשימה
        if (users.length === 0) {
            alert("אין נתונים להורדה");
            return;
        }

        // נגדיר את הכותרות של הקובץ אקסל
        const headers = ["שם פרטי", "שם משפחה", "אימייל", "טלפון", "תחום לימודים", "תאריך רישום"];
        
        // נהפוך את הנתונים לשורות טקסט
        const csvRows = users.map(user => [
            user.firstName,
            user.lastName,
            user.email,
            user.phone,
            user.studyField,
            new Date(user.createdAt).toLocaleString('he-IL')
        ].join(','));

        // חיבור הכותרות עם השורות והוספת סימן מיוחד (BOM) כדי שהאקסל יזהה עברית
        const csvContent = "\uFEFF" + [headers.join(','), ...csvRows].join('\n');
        
        // יצירת קובץ להורדה בדפדפן

        // Binary Large Object -> blob
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        // אנחנו יוצרים כתובת זמנית להורדה שתכיל את הבלוב
        const url = URL.createObjectURL(blob);
        // ניצור את הקישור מהכתובת
        const link = document.createElement("a");
        //נגדיר את היעד ואת ההורדה
        link.setAttribute("href", url);
        link.setAttribute("download", "נרשמים_למערכת.csv");
        // נגדיר את הלחיצה ללינק
        link.click();
    };

    // TanStack Table הגדרת עמודות הטבלה עבור 
    const columns = [
        columnHelper.accessor('firstName', { header: 'שם פרטי' }),
        columnHelper.accessor('lastName', { header: 'שם משפחה' }),
        columnHelper.accessor('email', { header: 'אימייל' }),
        columnHelper.accessor('phone', { header: 'טלפון' }),
        columnHelper.accessor('studyField', { header: 'תחום לימודים' }),
        columnHelper.accessor('createdAt', { 
            header: 'תאריך רישום',
            cell: info => formatDate(info.getValue()) // שימוש בפונקציה לעיצוב התאריך
        }),
    ];

    // יצירת אובייקט הטבלה
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Tailwind - משתני עיצוב ל
    const containerClasses = "p-8 bg-gray-100 min-h-screen font-sans";
    const tableContainerClasses = "bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200";
    const headerClasses = "bg-gray-800 text-white text-right";
    const thClasses = "px-6 py-4 font-bold uppercase text-sm text-right";
    const tdClasses = "px-6 py-4 border-b border-gray-200 text-sm text-gray-700 text-right";
    const rowClasses = "hover:bg-blue-50 transition-colors duration-200";

    return (
        <div className={containerClasses} dir="rtl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold mb-8 text-gray-900 border-b-4 border-blue-600 inline-block pb-2">
                ניהול נרשמים למערכת
                </h1>
                {/* כפתור הורדה */}
                <button 
                    onClick={downloadCSV}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow transition duration-150"
                >
                    הורדה ל-CSV (Excel)
                </button>
            </div>
            


            <div className={tableContainerClasses}>
                {/* נגדיר טבלה */}
                <table className="min-w-full leading-normal">
                    <thead>
                        {/* לולאה ראשונה על "קבוצות" של כותרות בטבלה (תומך בכותרות כפולות) */}
                        {table.getHeaderGroups().map(headerGroup => (
                            
                            <tr key={headerGroup.id} className={headerClasses}>
                                {/* לולאה שנייה שרצה על העמודות עצמם ושמה את הכותרות בטבלה */}
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className={thClasses}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        
                        {table.getRowModel().rows.length > 0 ? (
                            // נרוץ על השורות בטבלה 
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className={rowClasses}>

                                    {/* נרוץ על התאים של השורות ונשים אותם בטבלה */}
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className={tdClasses}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            // במידה ואין משתמשים נחזיר את זה
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500 italic">
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