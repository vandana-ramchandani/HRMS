import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ERROR_MESSAGES } from "../../constants/errorMessage";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET=process.env.REFRESH_SECRET;

if (!JWT_SECRET) {
  throw new Error(ERROR_MESSAGES.JWT_NOT_DEFINED);
}
if(!REFRESH_SECRET){
    throw new Error(ERROR_MESSAGES.REFRESH_NOT_DEFINED);
}

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken=(payload: object):string =>{
    return jwt.sign(payload, REFRESH_SECRET,{expiresIn:"7d"});
}

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
export const verifyRefreshToken = (token: string): any => {
   return jwt.verify(token, REFRESH_SECRET);
}
export const generateResetToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); 
};

export const verifyResetToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET); 
};
