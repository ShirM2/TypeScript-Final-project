import { Router } from "express";

export const router = Router();

router.post("/submit", async (req , res) => {

  const { firstName, lastName, studyField, email } = req.body;
  console.log("Hello register")
  /**
   * Input validation (VERY IMPORTANT)
   * Never assume the client sends correct data
   */
  if (!firstName || !lastName || !studyField || !email) {
    return res.status(400).json({
      message: "כל השדות רישום הם חובה",
    });
  }

  console.log("נתונים שהתקבלו:", { firstName, lastName, studyField, email });

  // בינתיים מחזירים תשובה שהכל תקין, בהמשך נשמור ב-MongoDB
  return res.status(200).json({ message: "הנתונים התקבלו בהצלחה!" });
});