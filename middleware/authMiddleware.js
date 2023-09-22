import {
  UnAuthenticatedError,
  UnAuthorizedError,
  BadRequestError
} from "../errors/CustomErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnAuthenticatedError("authentication failed");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '650cfbaf67678dcb35aed08e'
    req.user = { userId, role, testUser };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("authentication failed");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorizedError("Unauthorized to access this route");
    }

    next();
  };
};


export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User, Read Only Access");
  } else {
    next();
  }
}