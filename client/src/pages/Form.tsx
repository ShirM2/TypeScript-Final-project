//import * as React from "react";
import { Form } from "radix-ui";
import SelectDemo from "../components/Select";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const FormDemo = () => {

    // הגדרת משתנה הניווט בתוך הקומפוננטה
    const navigate = useNavigate();

    // פונקציה לניהול הקריאה לשרת וטיפול בתגובות/שגיאות
    const doApi = async (data: Record<string, FormDataEntryValue>) => {
        try {
            //  לשרת המקומי POST ביצוע בקשת
            const response = await axios.post("http://localhost:3000/submit", data);
            console.log("תגובת השרת:", response.data);
            navigate("/thanks"); // ניווט לדף התודה

        } catch (error: any) {

            console.log("שגיאה:", error);
            const errorMessage = error.response?.data?.message || "קרתה שגיאה לא צפויה";
            alert(errorMessage);
        }
    }

    // ניהול אירוע שליחת הטופס (Submit)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(); // פקודה שתפסיק את הרענון של העמוד אחרי שליחת הטופס

        const formData = new FormData(event.currentTarget); // נסרוק את הטופס ונאסוף את המידע

        const data = Object.fromEntries(formData); // נמיר את המידע לאובייקט רגיל
        
        // קריאה לפונקציית ה-API
        doApi(data);
    };

    // Tailwind - משתני עיצוב מעודכנים
    const inputClasses = "inline-flex h-[40px] w-full items-center justify-center rounded-[6px] px-[12px] text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px_#cbd5e1] bg-white hover:shadow-[0_0_0_1px_#94a3b8] focus:shadow-[0_0_0_2px_#2563eb] focus:outline-none transition-all text-right";
    const labelClasses = "text-[14px] font-bold leading-[35px] text-slate-700 text-right";
    const messageClasses = "text-[12px] text-red-500 font-medium text-right";
    const fieldClasses = "mb-[15px] grid gap-1";
    const flexBetween = "flex items-baseline justify-between flex-row-reverse";

    return (
        <div className="relative min-h-screen py-12 px-4 overflow-hidden flex items-center justify-center">
            
            {/* שכבת הרקע המטושטשת */}
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

            {/* הטופס המעוצב */}
            <Form.Root className="relative z-10 w-full max-w-[400px] mx-auto bg-white/95 p-8 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm" onSubmit={handleSubmit}>
                
                {/* כותרת מעוצבת למסלול באריאל */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-extrabold text-blue-900">הרשמה למסלול לימודים</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">אוניברסיטת אריאל בשומרון</p>
                    <div className="h-1 w-16 bg-orange-500 mx-auto mt-2 rounded-full"></div>
                </div>

                {/* שם */}
                <Form.Field className={fieldClasses} name="firstName">
                    <div className={flexBetween}>
                        <Form.Label className={labelClasses}>שם</Form.Label>
                        <Form.Message className={messageClasses} match="valueMissing">תכניס את השם שלך</Form.Message>
                        <Form.Message className={messageClasses} match="tooShort">השם חייב להכיל לפחות 2 אותיות</Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className={inputClasses} type="text" required minLength={2} placeholder="שם פרטי" />
                    </Form.Control>
                </Form.Field>

                {/* שם משפחה */}
                <Form.Field className={fieldClasses} name="lastName">
                    <div className={flexBetween}>
                        <Form.Label className={labelClasses}>שם משפחה</Form.Label>
                        <Form.Message className={messageClasses} match="valueMissing">תכניס את שם המשפחה שלך</Form.Message>
                        <Form.Message className={messageClasses} match="tooShort">שם המשפחה חייב להכיל לפחות 2 אותיות</Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className={inputClasses} type="text" required minLength={2} placeholder="שם משפחה" />
                    </Form.Control>
                </Form.Field>

                {/* תחום */}
                <Form.Field className={fieldClasses} name="studyField">
                    <div className={flexBetween}>
                        <Form.Label className={labelClasses}>מסלול מבוקש</Form.Label>
                    </div>
                    <div className="relative">
                        <SelectDemo />
                    </div>
                </Form.Field>
            
                {/* אימייל */}
                <Form.Field className={fieldClasses} name="email">
                    <div className={flexBetween}>
                        <Form.Label className={labelClasses}>אימייל</Form.Label>
                        <Form.Message className={messageClasses} match="valueMissing">תכניס את האימייל שלך</Form.Message>
                        <Form.Message className={messageClasses} match="typeMismatch">תכניס כתובת אימייל תקינה</Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className={inputClasses} type="email" required placeholder="example@email.com" />
                    </Form.Control>
                </Form.Field>

                {/* טלפון */}
                <Form.Field className={fieldClasses} name="phone">
                    <div className={flexBetween}>
                        <Form.Label className={labelClasses}> טלפון </Form.Label>
                        <Form.Message className={messageClasses} match="valueMissing">תכניס את הטלפון שלך</Form.Message>
                        <Form.Message className={messageClasses} match="patternMismatch">נא להזין מספר טלפון תקין (ספרות בלבד)</Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input 
                            className={inputClasses} 
                            type="tel" 
                            required 
                            pattern="[0-9]{9,10}" 
                            placeholder="05XXXXXXXX"
                        />
                    </Form.Control>
                </Form.Field>

                <Form.Submit asChild>
                    <button className="mt-6 w-full py-3 bg-blue-900 text-white font-bold rounded-lg shadow-lg hover:bg-blue-800 transition-all active:scale-[0.98]">
                        שליחה
                    </button>
                </Form.Submit>

                <p className="text-[10px] text-slate-400 text-center mt-6 uppercase tracking-widest">
                    Ariel University • Academic Registration
                </p>
            </Form.Root>
        </div>
    );
}
export default FormDemo;