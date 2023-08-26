import { UnAuthenticatedError } from "../errors/CustomErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnAuthenticatedError("authentication failed");
  next();
};
