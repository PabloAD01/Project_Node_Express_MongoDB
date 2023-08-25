import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnAuthenticatedError } from "../errors/CustomErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValid =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValid) throw new UnAuthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  res.json({ token });
};

export const getUsers = async (req, res) => {
  const user = await User.find(req.body);
  res.status(StatusCodes.ACCEPTED).json({ user });
};
