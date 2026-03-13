import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { AdminModel } from './models/admin.ts';
import { router } from "./server/routes.ts"

const app = express();

app.use(cors()); // מאפשר לריאקט לשלוח בקשות
app.use(express.json()); // מאפשר לשרת לקרוא את הנתונים מהטופס

//  פונקציה ליצירת אוטומטית של משתמש ראשון לאדמין במידה ולא קיים
const createInitialAdmin = async () => {
    const adminExists = await AdminModel.findOne({ username: "admin" });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash("123", 10); // הצפנת הסיסמה 123
        const newAdmin = new AdminModel({
            username: "admin",
            password: hashedPassword
        });
        await newAdmin.save();
        console.log("✅ Initial admin created in DB");
    }
};
createInitialAdmin();

// הגדרת הנתונים להפעלת השרת
const PORT = 3000;
const MONGO_URI = "mongodb://localhost:27017/react_bonus";

// התחברות למסד הנתונים
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// חיבור הראוטים
app.use("/", router);
 
// האזנה לשרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
