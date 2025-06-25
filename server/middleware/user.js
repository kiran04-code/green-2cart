import { validUser } from "../auth/jwt.js";
export const checkAuth = (cookieName) => {
  return (req, res, next) => {
    const token = req.cookies[cookieName]; // ✅ correct way to read cookies

    if (!token) {
      return next(); // No token — continue without user
    }

    try {
      const payload = validUser(token) // ✅ verify token
      req.user = payload;
    } catch (err) {
      console.error("Invalid token:", err.message);
      req.user = null;
    }

    next(); // ✅ always call next
  };
};
