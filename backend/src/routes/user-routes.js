import express from "express";
import {
    registerUser,
    loginUser,
    getUserById,
    verifyUser,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUserById);
router.put("/verify/:userId", verifyUser);

export default router;
