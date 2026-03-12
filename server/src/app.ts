import express from "express";
import cors from "cors";
import { router } from "./server/routes.ts";

const app = express();

// הגדרות בסיסיות
app.use(cors()); // מאפשר לריאקט לשלוח בקשות
app.use(express.json()); // מאפשר לשרת לקרוא את הנתונים מהטופס

// חיבור הראוטים
app.use("/", router);

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});