import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserService = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
        email: userData.email,
        name: userData.name,
        passwordHash: hashedPassword,
        role: userData.role,
        status: userData.role === "clubAdmin" ? "pending" : "active",
    });
    return await user.save();
};

export const loginUserService = async (loginData) => {
    const user = await User.findOne({ email: loginData.email });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!isPasswordValid) throw new Error("Invalid password");
    
    const result = {
        "id": user._id.toString(),
        "token": jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" }),
        "role": user.role
    }
    return result;
};

export const getUserByIdService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
};

export const verifyUserService = async (userId, status) => {
    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) throw new Error("User not found");
    return user;
};