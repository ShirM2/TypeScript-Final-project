import { Router } from "express";
import { UserModel } from "../models/user.ts";

export const router = Router();

// POST -טיפול בבקשת ה
router.post("/submit", async (req , res) => {

    try{

        const { firstName, lastName, studyField, email ,phone } = req.body; // נייצא את השדות מהטופס

        console.log("Hello submited");
        
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
