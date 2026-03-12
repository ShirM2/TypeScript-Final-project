import mongoose from "mongoose";

// הגדרת הסכמה למשתמש
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    studyField: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model("User", UserSchema);