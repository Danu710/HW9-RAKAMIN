import { User } from "../models/UserModel.js";
import db from "../config/Database.js";

export const getUsers = async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  try {
    await db.authenticate();
    const response = await User.findAll({
      limit: limit,
      offset: offset,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  const { id, title, genres, year } = req.body;
  try {
    const user = await User.create({ id, title, genres, year });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
};

export const editUser = async (req, res) => {
  const { title, genres, year } = req.body;
  const { id } = req.params;
  try {
    const user = await User.update({ title, genres, year }, { where: { id } });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (user) {
      await user.destroy();
      return res
        .status(200)
        .json({ message: `User dengan id ${id} berhasil dihapus` });
    } else {
      return res.status(404).json({ message: `User tidak ditemukan` });
    }
  } catch (error) {
    console.log(error.message);
  }
};
