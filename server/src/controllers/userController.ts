import { UserModel } from "../models/user.ts";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { AdminModel } from "../models/admin.ts";
import express from "express";
type Request = express.Request;
type Response = express.Response;



// לוגיקה לרישום משתמש
export const submitUser = async (req: Request, res: Response) => {
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
};

// לוגיקה להתחברות אדמין
export const adminLogin = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    try {
        // חיפוש האדמין במבנה הנתונים
        const admin = await AdminModel.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
        }

        // בדיקת הסיסמא שהתקבל אל מול הסיסמא המקורית
        const isMatch = await bcrypt.compare(password, admin.password);

        if (isMatch) {
            // ניתן טוקן לשעה
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "", { expiresIn: "1h" });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
        }
    } catch (error) {
        return res.status(500).json({ message: "שגיאה בשרת" });
    }
};

// לוגיקה לשליפת משתמשים
export const getAllUsers = async (req: Request, res: Response) => {

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
            jwt.verify(token, process.env.JWT_SECRET || "");
    
            // אם האימות הצליח - שולפים את המשתמשים
            const users = await UserModel.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: "טוקן לא תקין או פג תוקף" });
        }
};