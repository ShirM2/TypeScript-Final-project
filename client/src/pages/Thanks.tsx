import React from 'react';
import { useNavigate } from 'react-router-dom';

const Thanks: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans" dir="rtl">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg border border-gray-100">
        {/* אייקון וי ירוק להצלחה */}
        <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✓
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">הרישום בוצע בהצלחה!</h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          תודה רבה שהתעניינת בלימודים אצלנו. הפרטים שלך נשמרו במערכת, ונציג מהמחלקה הרלוונטית יחזור אלייך בקרוב עם כל הפרטים.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="!w-full !bg-blue-600 !hover:bg-blue-700 !text-black !font-bold !py-3 !px-6 !rounded-lg !transition duration-200 !transform hover:scale-105 !shadow-md"
        >
          חזרה לדף הבית
        </button>
      </div>
    </div>
  );
};

export default Thanks;