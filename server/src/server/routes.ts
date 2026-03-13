import { Router } from "express";
import { submitUser, adminLogin, getAllUsers } from "../controllers/userController.ts"; 


export const router = Router();

// לרישום משתמש POST -טיפול בבקשת ה
router.post("/submit" ,submitUser );

// להתחברות לאדמין POST -טיפול בבקשת ה 
router.post("/admin/login", adminLogin);

// שתחזיר את רשימת המשתמשים שנרשמו Get בקשת 
router.get("/admin/users", getAllUsers);
