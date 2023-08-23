import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  res.send("login");
};

export const getUsers = async (req, res) => {
  const user = await User.find(req.body);
  res.status(StatusCodes.ACCEPTED).json({ user });
};
