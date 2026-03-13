import { Router } from "express";
import { UserModel } from "../models/user.ts";
import jwt from 'jsonwebtoken';

export const router = Router();

// לרישום משתמש POST -טיפול בבקשת ה
router.post("/submit", async (req , res) => {

    try{

        const { firstName, lastName, studyField, email ,phone } = req.body; // נייצא את השדות מהטופס
        
        if (!firstName || !lastName || !studyField || !email || !phone) { // נבדוק שאין שדות ריקים
            return res.status(400).json({
            message: "כל השדות רישום הם חובה",
            });
        }

        // ניצור אובייקט שמבוסס על הסכמה ונשמור לתוכו את השדות מהטופס
        const newUser = new UserModel({
            firstName,
            lastName,
            studyField,
            email,
            phone
        });

        await newUser.save(); // MongoDB - נשמור את האובייקט לתוך ה

        console.log("✅ Data successfully saved to DB:", newUser); // נרשום בקונסול שהמידע נשמר בהצלחה

        return res.status(200).json({ message: "הנתונים נשמרו בהצלחה במסד הנתונים!" }); // נחזיר סטטוס הצלחה עם הודעה

  } catch (error : any) { // נתפוס שגיאה

        console.error("❌ Error saving info:", error);

        return res.status(500).json({ message: "שגיאה פנימית בשרת בעת השמירה" });

  }

});

const SECRET_KEY = "my_super_secret_key"; // מפתח סודי להצפנה

// להתחברות לאדמין POST -טיפול בבקשת ה 
router.post("/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "123") {

        // יצירת טוקן שתוקפו יפוג בעוד שעה
        const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });

       // מחזירים את הטוקן ללקוח
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
    }
});

// שתחזיר את רשימת המשתמשים שנרשמו Get בקשת 
router.get("/admin/users", async (req, res) => {

    // Headers-נשלוף את הטוקן מה
    const authHeader = req.headers["authorization"];

    // אנחנו מקבלים את הטוקן בצורה הבאה:
    // Bearer <TOKEN>
    // ונשמור את הטוקן Bearer-לכן אנחנו נעשה נחתוך את ה 
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "חסר טוקן אבטחה" });
    }

    try {
        // אימות הטוקן
        jwt.verify(token, SECRET_KEY);

        // אם האימות הצליח - שולפים את המשתמשים
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "טוקן לא תקין או פג תוקף" });
    }
});
