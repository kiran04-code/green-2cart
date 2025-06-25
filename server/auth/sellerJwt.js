import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // important!

const secretKey = process.env.JWT_TOKEN;
export const createTokenforSeller = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: "7d", // optional: token will expire in 7 days
  });

  return token;

  
};
export const validUser = (token)=>{
    const payload = jwt.verify(token,secretKey)
    return payload
}