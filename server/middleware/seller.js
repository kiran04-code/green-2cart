import { validUser } from "../auth/sellerJwt.js";
export const checksellerAuth = (cookieName) => {
  return (req, res, next) => {
    const token = req.cookies[cookieName]; // ✅ correct way to read cookies

    if (!token) {
      return next(); // No token — continue without user
    }

    try {
      const payload = validUser(token) // ✅ verify token
      req.seller = payload;
    } catch (err) {
      console.error("Invalid token:", err.message);
      req.seller = null;
    }

    next(); // ✅ always call next
  };
};
