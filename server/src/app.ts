import express from "express";
import cors from "cors";
import { router } from "./server/routes.ts";
import mongoose from "mongoose";

const app = express();

app.use(cors()); // מאפשר לריאקט לשלוח בקשות
app.use(express.json()); // מאפשר לשרת לקרוא את הנתונים מהטופס


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
