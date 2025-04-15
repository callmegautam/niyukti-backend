import { prisma } from '../db/db';
import { checkExistingUser } from '../utils/checkExistingUser';

export const registerUser = async (req, res) => {
    // TODO -> use zod validation
    // TODO -> upload avatar to cloudinary

    const { username, name, email, password } = req.body;

    console.log(
        `(REGISTER) -> User details: ${username}, ${name}, ${email}, ${password}`
    );

    const userExist = await checkExistingUser(username, email);
    if (userExist) {
        return res.status(409).json({
            success: false,
            message: 'User already exists with this email or username',
        });
    }
};
