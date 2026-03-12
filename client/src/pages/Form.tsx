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

    // מחלקות עיצוב קבועות לכיווץ הקוד
    const inputClasses = "inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)] bg-black/20 hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] focus:outline-none selection:bg-black/40 selection:text-white text-right";
    const labelClasses = "text-[15px] font-medium leading-[35px] text-black text-right";
    const messageClasses = "text-[13px] text-white opacity-80 text-right";
    const fieldClasses = "mb-[10px] grid";
    const flexBetween = "flex items-baseline justify-between flex-row-reverse";

    return(
        // handleSubmit ברגע שהטופס יישלח נקרא לפונקציה
        // טופס
        <Form.Root className="w-[260px] mx-auto mt-[100px]" onSubmit={handleSubmit}>

            {/* שם */}
            <Form.Field className={fieldClasses} name="firstName">
                <div className={flexBetween}>
                    <Form.Label className={labelClasses}>שם</Form.Label>
                    <Form.Message className={messageClasses} match="valueMissing">
                        תכניס את השם שלך
                    </Form.Message>
                    <Form.Message className={messageClasses} match="typeMismatch">
                        תכניס שם תקין בבקשה
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className={inputClasses} type="text" required />
                </Form.Control>

            </Form.Field>

            {/* שם משפחה */}
            <Form.Field className={fieldClasses} name="lastName">
                <div className={flexBetween}>
                    <Form.Label className={labelClasses}>שם משפחה</Form.Label>
                    <Form.Message className={messageClasses} match="valueMissing">
                        תכניס את שם המשפחה שלך
                    </Form.Message>
                    <Form.Message className={messageClasses} match="typeMismatch">
                        תכניס שם משפחה תקין בבקשה
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className={inputClasses} type="text" required />
                </Form.Control>

            </Form.Field>

            {/* תחום */}
            <Form.Field className={fieldClasses} name="studyField">
                <div className={flexBetween}>
                        <SelectDemo />
                </div>

            </Form.Field>
        
            {/* אימייל */}
            <Form.Field className={fieldClasses} name="email">
                <div className={flexBetween}>
                    <Form.Label className={labelClasses}>אימייל</Form.Label>
                    <Form.Message className={messageClasses} match="valueMissing">
                        תכניס את האימייל שלך
                    </Form.Message>
                    <Form.Message className={messageClasses} match="typeMismatch">
                        תכניס כתובת אימייל תקינה
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className={inputClasses} type="email" required />
                </Form.Control>

            </Form.Field>

            {/* טלפון */}
            <Form.Field className={fieldClasses} name="phone">
                <div className={flexBetween}>
                    <Form.Label className={labelClasses}> טלפון </Form.Label>
                    <Form.Message className={messageClasses} match="valueMissing">
                        תכניס את הטלפון שלך
                    </Form.Message>
                    <Form.Message className={messageClasses} match="typeMismatch">
                        תכניס מספר טלפון תקין בבקשה
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className={inputClasses} type="tel" required />
                </Form.Control>

            </Form.Field>

            <Form.Submit asChild>
                <button className="mt-[10px] inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white px-[15px] text-[15px] font-medium leading-none text-violet-600 shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:bg-gray-100 focus:shadow-[0_0_0_2px_black] focus:outline-none">
                    שליחה
                </button>
            </Form.Submit>
        </Form.Root>
    );
}
export default FormDemo;