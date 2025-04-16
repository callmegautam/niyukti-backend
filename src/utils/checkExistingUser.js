import { prisma } from '../db/db.js';

export const checkExistingUser = async (username, email) => {
    return await prisma.student.findUnique({
        where: {
            OR: [{ username: username }, { email: email }],
        },
    });
};
