import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const SECRET_KEY = env.SECRET_KEY;
const EXPIRE_IN = env.EXPIRE_IN;

/**
 * Generate a signed JWT token
 * @param {object} payload - Data to encode in token
 * @param {string} [expiresIn=EXPIRE_IN] - Optional overrides
 * @returns {string} signed JWT token
 */
export const generateToken = (payload, expiresIn = EXPIRE_IN) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

/**
 * Verifies a JWT token and returns the decoded payload
 * @param {string} token - JWT token to verify
 * @returns {object} decoded payload
 * @throws {Error} if token is invalid or expired
 */
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

/**
 * Decodes a token without verifying it (for read-only purposes)
 * @param {string} token - JWT token to decode
 * @returns {null|object}
 */
export const decodeToken = (token) => {
    return jwt.decode(token);
};
