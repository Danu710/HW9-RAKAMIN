import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../controller/UserController.js";
import { getRegister, registerUser } from "../controller/RegisterController.js";
import { loginUser } from "../controller/LoginController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import morgan from "morgan";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", verifyToken, createUser);
router.put("/users/:id", verifyToken, editUser);
router.delete("/users/:id", verifyToken, deleteUser);

router.get("/register", getRegister);
router.post("/register", registerUser);

router.use(morgan("common"));

router.post("/login", loginUser);

router.get("/login", (req, res) => {
  // Log request
  console.log(`Received request at ${new Date()}`);
  // ... code to handle the request
});

export default router;
