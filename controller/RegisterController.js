import bcrypt from "bcryptjs";
import { UserRegister } from "../models/UserModel.js";
import db from "../config/Database.js";

export const getRegister = async (req, res) => {
  const limit = req.query.limit || 10; // default limit to 10 if not provided
  const offset = req.query.offset || 0;
  try {
    await db.authenticate();
    const response = await UserRegister.findAll({
      limit: limit,
      offset: offset,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { id, email, gender, password, role } = req.body;

    // Check if the email is already registered
    const userExists = await UserRegister.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).send({ error: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await UserRegister.create({
      id,
      email,
      gender,
      password: hashedPassword,
      role,
    });

    // Return the created user
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
};
