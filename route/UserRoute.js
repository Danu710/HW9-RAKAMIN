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

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

router.get("/register", getRegister);
router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
