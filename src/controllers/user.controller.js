import { prisma } from '../db/db';
import { checkExistingUser } from '../utils/checkExistingUser.js';

export const registerUser = async (req, res) => {
    const { username, name, email, password } = req.body;
    const userExist = await checkExistingUser(username, email);
    if (userExist) {
        return res.status(409).json({
            success: false,
            message: 'User already exists with this email or username',
        });
    }
};
