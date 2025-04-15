import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRE_IN = process.env.EXPIRE_IN;

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRE_IN });
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

export const decodeToken = (token) => {
    return jwt.decode(token);
};
